import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onFieldChange: (field: string, value: string) => void;
}

export const PersonalInfoForm = ({
  firstName,
  lastName,
  email,
  phone,
  onFieldChange,
}: PersonalInfoFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">Prénom</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => onFieldChange("firstName", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Nom</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => onFieldChange("lastName", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onFieldChange("email", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onFieldChange("phone", e.target.value)}
          required
        />
      </div>
    </div>
  );
};