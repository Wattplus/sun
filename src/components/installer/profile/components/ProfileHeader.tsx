import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ProfileFormData } from "../hooks/useProfileForm"

interface ProfileHeaderProps {
  formData: ProfileFormData
}

export const ProfileHeader = ({ formData }: ProfileHeaderProps) => {
  const { toast } = useToast()

  const handleAvatarUpload = () => {
    toast({
      title: "Upload de photo",
      description: "Fonctionnalité à venir",
    })
  }

  return (
    <Card className="p-6 bg-secondary/80 backdrop-blur-sm border-primary/20">
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{formData.company.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="outline"
            className="absolute bottom-0 right-0 bg-secondary hover:bg-secondary-dark"
            onClick={handleAvatarUpload}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{formData.company}</h2>
          <p className="text-white/60">{formData.description}</p>
        </div>
      </div>
    </Card>
  )
}