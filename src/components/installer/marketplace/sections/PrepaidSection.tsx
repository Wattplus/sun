import { Card } from "@/components/ui/card";
import { PrepaidBalance } from "../../dashboard/PrepaidBalance";

export const PrepaidSection = () => {
  return (
    <Card className="bg-gradient-to-br from-background via-background/95 to-background border-primary/20">
      <PrepaidBalance balance={150} />
    </Card>
  );
};