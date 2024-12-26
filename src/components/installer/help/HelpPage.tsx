import { Card } from "@/components/ui/card";
import { ClientFAQ } from "@/components/client/faq/ClientFAQ";

export const HelpPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Aide</h1>
      <Card className="p-6">
        <ClientFAQ />
      </Card>
    </div>
  );
};