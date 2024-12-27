import { InstallerLayout } from "@/components/installer/navigation/InstallerLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSection } from "./ProfileSection";
import { PaymentMethodsSection } from "./PaymentMethodsSection";
import { PrepaidSection } from "./PrepaidSection";
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";

export const AccountPage = () => {
  return (
    <InstallerLayout>
      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
        <InstallerBreadcrumb />
        <div className="max-w-[1600px] mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-white">Mon Compte</h1>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-white/10 border-primary/20">
              <TabsTrigger value="profile" className="text-white data-[state=active]:bg-primary">
                Profil
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-white data-[state=active]:bg-primary">
                Moyens de paiement
              </TabsTrigger>
              <TabsTrigger value="prepaid" className="text-white data-[state=active]:bg-primary">
                Compte prépayé
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileSection />
            </TabsContent>

            <TabsContent value="payment">
              <PaymentMethodsSection />
            </TabsContent>

            <TabsContent value="prepaid">
              <PrepaidSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </InstallerLayout>
  );
};