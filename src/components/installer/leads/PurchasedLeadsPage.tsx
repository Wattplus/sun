import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";

export function PurchasedLeadsPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <InstallerBreadcrumb />
      <div className="container mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Leads achetés</h1>
        <div className="grid gap-4">
          <div className="bg-card rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Lead #12345</h2>
            <p className="text-muted-foreground">Client: John Doe</p>
            <p className="text-muted-foreground">Date d'achat: 12/03/2024</p>
            <p className="text-muted-foreground">Statut: En cours</p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Lead #12346</h2>
            <p className="text-muted-foreground">Client: Jane Smith</p>
            <p className="text-muted-foreground">Date d'achat: 11/03/2024</p>
            <p className="text-muted-foreground">Statut: Contacté</p>
          </div>
          <div className="bg-card rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Lead #12347</h2>
            <p className="text-muted-foreground">Client: Robert Johnson</p>
            <p className="text-muted-foreground">Date d'achat: 10/03/2024</p>
            <p className="text-muted-foreground">Statut: En attente</p>
          </div>
        </div>
      </div>
    </div>
  );
}