import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoSection } from "@/components/installer/profile/sections/PersonalInfoSection";
import { CertificationsSection } from "@/components/installer/profile/sections/CertificationsSection";
import { InterventionZonesSection } from "@/components/installer/account/sections/InterventionZonesSection";
import { PortfolioSection } from "@/components/installer/profile/sections/PortfolioSection";
import { SecuritySection } from "@/components/installer/profile/sections/SecuritySection";
import { StatsSection } from "@/components/installer/profile/sections/StatsSection";
import { Shield, Award, MapPin, Image, User, ChartBar } from "lucide-react";

export const NewProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/login");
          return;
        }

        const { data: installer, error } = await supabase
          .from("installers")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (error) throw error;
        setProfileData(installer);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Profil Professionnel</h1>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Informations
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Certifications
          </TabsTrigger>
          <TabsTrigger value="zones" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Zones
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            Statistiques
          </TabsTrigger>
        </TabsList>

        <Card className="p-6">
          <TabsContent value="personal">
            <PersonalInfoSection data={profileData} />
          </TabsContent>

          <TabsContent value="certifications">
            <CertificationsSection data={profileData} />
          </TabsContent>

          <TabsContent value="zones">
            <InterventionZonesSection
              selectedZones={profileData?.service_area || []}
              onZonesChange={(zones) => {
                // Handle zones change
              }}
            />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioSection data={profileData} />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySection />
          </TabsContent>

          <TabsContent value="stats">
            <StatsSection data={profileData} />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};