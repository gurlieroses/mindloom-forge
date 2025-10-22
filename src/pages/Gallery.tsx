import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Wand2 } from "lucide-react";
import { GalleryModal } from "@/components/GalleryModal";
import example1 from "@/assets/example-1.jpg";
import example2 from "@/assets/example-2.jpg";
import example3 from "@/assets/example-3.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const creations = [
    {
      image: example1,
      title: "Cyberpunk Portrait",
      prompt: "Futuristic cyberpunk portrait with neon lighting",
      likes: 234,
      creator: "Anonymous",
    },
    {
      image: example2,
      title: "Alien Dreamscape",
      prompt: "Surreal floating islands in a purple alien world",
      likes: 189,
      creator: "Anonymous",
    },
    {
      image: example3,
      title: "Neon Metropolis",
      prompt: "Neon-lit futuristic cityscape at night",
      likes: 312,
      creator: "Anonymous",
    },
    {
      image: example1,
      title: "Digital Dreams",
      prompt: "Abstract digital art with vibrant colors",
      likes: 156,
      creator: "Anonymous",
    },
    {
      image: example2,
      title: "Cosmic Voyage",
      prompt: "Space exploration with nebula background",
      likes: 278,
      creator: "Anonymous",
    },
    {
      image: example3,
      title: "Future Vision",
      prompt: "Holographic interface in a modern city",
      likes: 201,
      creator: "Anonymous",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Community <span className="text-gradient">Gallery</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover amazing creations from our community
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creations.map((creation, index) => (
                <Card 
                  key={index} 
                  className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm cursor-pointer"
                  onClick={() => setSelectedImage(creation)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={creation.image}
                      alt={creation.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Overlay Actions */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="w-full bg-primary/90 hover:bg-primary backdrop-blur-sm">
                        <Wand2 className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{creation.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {creation.prompt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{creation.creator}</span>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{creation.likes}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {selectedImage && (
        <GalleryModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          image={selectedImage.image}
          prompt={selectedImage.prompt}
          user={selectedImage.creator}
        />
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
