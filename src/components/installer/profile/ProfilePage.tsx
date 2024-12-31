import { ProfileSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { SubscriptionPlans } from "@/components/installer/subscription/SubscriptionPlans"
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb"
import { motion } from "framer-motion"

export const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      
      <div className="max-w-[1600px] mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Mon Profil Professionnel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileStats />
            <ProfileSection />
            <SolarSpecificSection />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SubscriptionPlans />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage