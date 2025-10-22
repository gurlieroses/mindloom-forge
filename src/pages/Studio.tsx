import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video, FileText, Wand2, Download, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Studio = () => {
  const navigate = useNavigate();
  const { user, credits, refreshCredits } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("text-to-image");
  const [result, setResult] = useState<{ type: string; data: any } | null>(null);
  const [showLowCreditsAlert, setShowLowCreditsAlert] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    setShowLowCreditsAlert(credits < 3);
  }, [credits]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!user) {
      toast.error("Please sign in to generate content");
      navigate("/auth");
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { type: activeTab, prompt },
      });

      if (error) {
        if (error.message.includes("Insufficient credits")) {
          toast.error("You don't have enough credits!");
          setShowLowCreditsAlert(true);
        } else {
          toast.error(error.message || "Failed to generate content");
        }
        return;
      }

      if (data.imageUrl) {
        setResult({ type: "image", data: data.imageUrl });
      } else if (data.text) {
        setResult({ type: "text", data: data.text });
      } else if (data.message) {
        setResult({ type: "message", data: data.message });
      }

      await refreshCredits();
      toast.success("Generation complete!");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error("An error occurred during generation");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    if (result.type === "image") {
      const link = document.createElement("a");
      link.href = result.data;
      link.download = `mindloom-${Date.now()}.png`;
      link.click();
      toast.success("Image downloaded!");
    } else if (result.type === "text") {
      const blob = new Blob([result.data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `mindloom-${Date.now()}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Text downloaded!");
    }
  };

  const tools = [
    { id: "text-to-image", label: "Text → Image", icon: Image },
    { id: "text-to-video", label: "Text → Video", icon: Video },
    { id: "text-to-text", label: "Text → Text", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-gradient">Studio</span>
              </h1>
              <p className="text-muted-foreground">
                Transform your ideas into reality with AI
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <Card className="lg:col-span-1 h-fit bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Creation Tools</h3>
                  <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
                    <TabsList className="flex flex-col h-auto w-full gap-2 bg-transparent">
                      {tools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <TabsTrigger
                            key={tool.id}
                            value={tool.id}
                            className="w-full justify-start gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            <Icon className="h-4 w-4" />
                            {tool.label}
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Main Area */}
              <div className="lg:col-span-3 space-y-6">
                {/* Low Credits Alert */}
                {showLowCreditsAlert && (
                  <Alert className="bg-destructive/10 border-destructive/50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You're running low on credits! Visit the{" "}
                      <a href="/pricing" className="underline font-medium">
                        Pricing page
                      </a>{" "}
                      to get more.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Input Area */}
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Describe what you want to create
                        </label>
                        <Textarea
                          placeholder="e.g., A futuristic cityscape with neon lights and flying cars..."
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="min-h-32 resize-none bg-background/50"
                        />
                      </div>

                      <Button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full bg-primary hover:bg-primary/90 glow-primary"
                        size="lg"
                      >
                        {isGenerating ? (
                          <>
                            <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Results Area */}
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Results</h3>
                    
                    {isGenerating ? (
                      <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Wand2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                          <p className="text-muted-foreground">Creating your masterpiece...</p>
                        </div>
                      </div>
                    ) : result ? (
                      <div className="space-y-4">
                        {result.type === "image" && (
                          <div className="relative group">
                            <img 
                              src={result.data} 
                              alt="Generated" 
                              className="w-full rounded-lg"
                            />
                            {credits === 10 && (
                              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                                Generated with Mindloom
                              </div>
                            )}
                          </div>
                        )}
                        
                        {result.type === "text" && (
                          <div className="p-4 bg-background/50 rounded-lg border border-border">
                            <p className="text-sm whitespace-pre-wrap">{result.data}</p>
                          </div>
                        )}

                        {result.type === "message" && (
                          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm text-center">{result.data}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                          <div>
                            <p className="text-sm font-medium">
                              {result.type === "image" ? "Generated Image" : "Generated Text"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Prompt: {prompt.slice(0, 50)}...
                            </p>
                          </div>
                          {(result.type === "image" || result.type === "text") && (
                            <Button size="sm" variant="outline" onClick={handleDownload}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                        <div className="text-center">
                          <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            Your generated content will appear here
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Studio;
