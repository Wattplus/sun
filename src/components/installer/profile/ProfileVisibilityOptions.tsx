import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Eye, Star, MessageSquare, MapPin } from "lucide-react"

interface ProfileVisibilityOptionsProps {
  options: {
    showPhoneNumber: boolean;
    highlightProfile: boolean;
    acceptDirectMessages: boolean;
    showCertifications: boolean;
  };
  onToggle: (field: string, value: boolean) => void;
}

export const ProfileVisibilityOptions = ({ options, onToggle }: ProfileVisibilityOptionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
        <h3 className="text-lg font-semibold text-white mb-4">Options de visibilité</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Label className="text-white">Afficher le numéro</Label>
                <p className="text-sm text-white/60">Permettre aux clients de vous appeler directement</p>
              </div>
            </div>
            <Switch
              checked={options.showPhoneNumber}
              onCheckedChange={(checked) => onToggle('showPhoneNumber', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Label className="text-white">Profil mis en avant</Label>
                <p className="text-sm text-white/60">Apparaître en premier dans les recherches</p>
              </div>
            </div>
            <Switch
              checked={options.highlightProfile}
              onCheckedChange={(checked) => onToggle('highlightProfile', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Label className="text-white">Messages directs</Label>
                <p className="text-sm text-white/60">Recevoir des messages des clients</p>
              </div>
            </div>
            <Switch
              checked={options.acceptDirectMessages}
              onCheckedChange={(checked) => onToggle('acceptDirectMessages', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Label className="text-white">Afficher certifications</Label>
                <p className="text-sm text-white/60">Mettre en avant vos qualifications</p>
              </div>
            </div>
            <Switch
              checked={options.showCertifications}
              onCheckedChange={(checked) => onToggle('showCertifications', checked)}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}