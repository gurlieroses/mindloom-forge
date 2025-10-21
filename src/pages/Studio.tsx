import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video, FileText, Wand2, Download } from "lucide-react";
import { toast } from "sonner";

const Studio = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("text-to-image");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Generation complete!");
    }, 3000);
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

                    {/* Example result card */}
                    <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border hidden">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium">Generated Image</p>
                          <p className="text-xs text-muted-foreground">Cost: 1 credit</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        Generated with Mindloom
                      </p>
                    </div>
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
