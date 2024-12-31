import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  company: string;
  description?: string;
}

export const ProfileHeader = ({ company, description }: ProfileHeaderProps) => {
  const { toast } = useToast();

  const handleAvatarUpload = () => {
    toast({
      title: "Upload de photo",
      description: "Fonctionnalité à venir",
    });
  };

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{company.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="outline"
            className="absolute bottom-0 right-0 bg-background hover:bg-secondary"
            onClick={handleAvatarUpload}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{company}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
    </Card>
  );
};