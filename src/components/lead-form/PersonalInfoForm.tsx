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
        <Label htmlFor="firstName" className="text-white">Prénom</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => onFieldChange("firstName", e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white"
          placeholder="Votre prénom"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-white">Nom</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => onFieldChange("lastName", e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white"
          placeholder="Votre nom"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onFieldChange("email", e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white"
          placeholder="votre@email.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white">Téléphone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => onFieldChange("phone", e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white"
          placeholder="06 12 34 56 78"
        />
      </div>
    </div>
  );
};