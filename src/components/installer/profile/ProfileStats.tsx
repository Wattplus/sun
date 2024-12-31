import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BarChart3, Users, Star, Eye, MessageSquare, Award } from "lucide-react"

export const ProfileStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
    >
      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-white/60">Vues du profil</p>
            <p className="text-2xl font-bold text-white">1,247</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-white/60">Messages reçus</p>
            <p className="text-2xl font-bold text-white">89</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Star className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-white/60">Note moyenne</p>
            <p className="text-2xl font-bold text-white">4.8</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-white/60">Clients satisfaits</p>
            <p className="text-2xl font-bold text-white">156</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-white/60">Certifications</p>
            <p className="text-2xl font-bold text-white">3</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-white/60">Taux de conversion</p>
            <p className="text-2xl font-bold text-white">12.4%</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}