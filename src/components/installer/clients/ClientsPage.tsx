import { Card } from "@/components/ui/card";

export const ClientsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Mes Clients</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Liste des clients à venir...</p>
      </Card>
    </div>
  );
};