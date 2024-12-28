import { Card } from "@/components/ui/card";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

export function SettingsSection({ userInfo }: { userInfo: UserInfo }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Paramètres du compte</h2>
      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nom</label>
          <p className="p-2 bg-muted rounded-md">{userInfo.name}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <p className="p-2 bg-muted rounded-md">{userInfo.email}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Téléphone</label>
          <p className="p-2 bg-muted rounded-md">{userInfo.phone}</p>
        </div>
      </div>
    </Card>
  );
}