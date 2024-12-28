import { ProfileSection } from "@/pages/installer/account/ProfileSection"
import { SubscriptionPlans } from "@/components/installer/subscription/SubscriptionPlans"
import { Card } from "@/components/ui/card"
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb"
import { motion } from "framer-motion"
import { Users, Star } from "lucide-react"

export const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      
      <div className="max-w-[1600px] mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Mon Profil Professionnel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileSection />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Annuaire des Installateurs</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Rejoignez notre annuaire d'installateurs certifiés pour augmenter votre visibilité et recevoir plus de leads qualifiés.
                </p>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Apparaissez en premier dans les recherches</span>
                </div>
              </Card>
            </motion.div>

            <SubscriptionPlans />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage