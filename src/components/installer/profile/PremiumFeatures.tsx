import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Crown, Rocket, Target, Trophy, Zap, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export const PremiumFeatures = () => {
  const { toast } = useToast()

  const handleUpgrade = () => {
    toast({
      title: "Mise à niveau Premium",
      description: "Redirection vers les options d'abonnement...",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-white">Profil Premium Pro</h3>
          </div>

          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Rocket className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-white">Boost de visibilité x3</h4>
                <p className="text-sm text-white/60">Apparaissez en tête des résultats</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-white">Leads ciblés premium</h4>
                <p className="text-sm text-white/60">Accès prioritaire aux meilleurs projets</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-white">Badge "Pro Certifié"</h4>
                <p className="text-sm text-white/60">Distinguez-vous de la concurrence</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-white">Avis clients mis en avant</h4>
                <p className="text-sm text-white/60">Valorisez votre réputation</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-white">Support prioritaire 24/7</h4>
                <p className="text-sm text-white/60">Une équipe dédiée à votre service</p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleUpgrade}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold"
          >
            <Crown className="w-5 h-5 mr-2" />
            Passer au Premium Pro
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}