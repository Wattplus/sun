import { Card } from "@/components/ui/card";

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
      </div>

      <Card className="p-6">
        <p>Paramètres du compte</p>
      </Card>
    </div>
  );
};

export default SettingsPage;