import { PrepaidBalance } from "@/components/installer/dashboard/PrepaidBalance";
import { Card } from "@/components/ui/card";

export const PrepaidSection = () => {
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
      <PrepaidBalance balance={150} />
    </Card>
  );
};