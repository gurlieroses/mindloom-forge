import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  prompt: string;
  user: string;
}

export function GalleryModal({ isOpen, onClose, image, prompt, user }: GalleryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-card/95 backdrop-blur-xl border-border">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <img 
            src={image} 
            alt={prompt} 
            className="w-full h-auto rounded-t-lg"
          />
          
          <div className="p-6 space-y-3">
            <div>
              <h3 className="font-semibold text-lg mb-1">Prompt</h3>
              <p className="text-sm text-muted-foreground">{prompt}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm mb-1">Created by</h3>
              <p className="text-sm text-muted-foreground">{user}</p>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 glow-primary"
              onClick={() => {
                onClose();
                window.location.href = `/studio?prompt=${encodeURIComponent(prompt)}`;
              }}
            >
              Generate Similar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}