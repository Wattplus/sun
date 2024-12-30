import { Card } from "@/components/ui/card";

interface CompanyInfoCardProps {
  installerInfo: {
    companyName: string;
    address: string;
    postalCode: string;
  };
}

export const CompanyInfoCard = ({ installerInfo }: CompanyInfoCardProps) => {
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
      <h3 className="text-lg font-semibold mb-4">Informations de facturation</h3>
      <div className="space-y-2">
        <p className="text-white/80">{installerInfo.companyName}</p>
        <p className="text-white/60">{installerInfo.address}</p>
        <p className="text-white/60">{installerInfo.postalCode}</p>
      </div>
    </Card>
  );
};