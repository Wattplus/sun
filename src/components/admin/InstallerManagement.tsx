import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { mockInstallers } from "./InstallerManagement";
import { DatabaseInstallerData } from "@/types/installer";

export const InstallerManagement = () => {
  const [installers, setInstallers] = useState<DatabaseInstallerData[]>(mockInstallers);

  useEffect(() => {
    // Fetch installers from the database or API
    const fetchInstallers = async () => {
      // Simulate fetching data
      const fetchedInstallers = await new Promise<DatabaseInstallerData[]>((resolve) => {
        setTimeout(() => {
          resolve(mockInstallers);
        }, 1000);
      });
      setInstallers(fetchedInstallers);
    };

    fetchInstallers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Gestion des Installateurs
        </h1>
        <Card className="overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
          <div className="p-6 space-y-6">
            {installers.map((installer) => (
              <div key={installer.id} className="border-b border-primary/10 pb-4">
                <h2 className="text-xl font-semibold">{installer.company_name}</h2>
                <p>{installer.contact_name}</p>
                <p>{installer.email}</p>
                <p>{installer.phone}</p>
                <p>{installer.address}, {installer.postal_code} {installer.city}</p>
                <p>Expérience: {installer.experience_years} ans</p>
                <p>Certifications: {Object.keys(installer.certifications).filter(key => installer.certifications[key]).join(", ")}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InstallerManagement;
