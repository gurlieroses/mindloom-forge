import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const { type, prompt, imageData } = await req.json();
    
    if (!prompt || !type) {
      throw new Error("Missing required fields");
    }

    if (type === "image-to-video" && !imageData) {
      throw new Error("Missing image data for image-to-video");
    }

    // Check user credits
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("credits")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile) {
      throw new Error("Profile not found");
    }

    // Define credit costs
    const creditCosts: Record<string, number> = {
      "text-to-image": 1,
      "text-to-video": 3,
      "image-to-video": 2,
      "text-to-text": 1,
    };

    const creditsNeeded = creditCosts[type] || 1;

    if (profile.credits < creditsNeeded) {
      return new Response(
        JSON.stringify({ error: "Insufficient credits" }),
        {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    let result: any = {};

    // Generate content based on type
    if (type === "text-to-image" || type === "image-to-video") {
      let messages: any[] = [];
      
      if (type === "image-to-video") {
        messages = [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: imageData } }
            ]
          }
        ];
      } else {
        messages = [
          {
            role: "user",
            content: prompt,
          }
        ];
      }

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages,
          modalities: ["image", "text"],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI gateway error:", response.status, errorText);
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      if (!imageUrl) {
        throw new Error("No image generated");
      }

      if (type === "image-to-video") {
        result = { videoUrl: imageUrl, message: "Video generation coming soon! Here is a preview image." };
      } else {
        result = { imageUrl };
      }
    } else if (type === "text-to-text") {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: "You are a creative AI assistant. Generate engaging and creative content based on user prompts.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("AI gateway error:", response.status, errorText);
        throw new Error("Failed to generate text");
      }

      const data = await response.json();
      const generatedText = data.choices?.[0]?.message?.content;

      if (!generatedText) {
        throw new Error("No text generated");
      }

      result = { text: generatedText };
    } else if (type === "text-to-video") {
      // Placeholder for video generation
      result = { message: "Video generation coming soon!" };
    }

    // Deduct credits
    const { error: updateError } = await supabaseClient
      .from("profiles")
      .update({ credits: profile.credits - creditsNeeded })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Failed to update credits:", updateError);
    }

    // Save generation to database
    await supabaseClient.from("generations").insert({
      user_id: user.id,
      type,
      prompt,
      result_url: result.imageUrl || result.videoUrl || null,
      result_text: result.text || null,
      credits_used: creditsNeeded,
    });

    return new Response(
      JSON.stringify({ ...result, creditsUsed: creditsNeeded }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in generate-content function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});