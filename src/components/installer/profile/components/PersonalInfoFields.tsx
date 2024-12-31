import { FormField } from "@/components/form/FormField";

interface PersonalInfoFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    website: string;
    description: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoFields = ({ formData, handleChange }: PersonalInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Prénom"
        id="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="John"
        required
        lightMode
        error={!formData.firstName ? "Le prénom est obligatoire" : ""}
      />

      <FormField
        label="Nom"
        id="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Doe"
        required
        lightMode
        error={!formData.lastName ? "Le nom est obligatoire" : ""}
      />

      <FormField
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john.doe@example.com"
        required
        lightMode
        error={!formData.email ? "L'email est obligatoire" : ""}
      />

      <FormField
        label="Téléphone"
        id="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+33 6 12 34 56 78"
        required
        lightMode
      />

      <FormField
        label="Site web"
        id="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="www.monentreprise.fr"
        lightMode
      />

      <FormField
        label="Description"
        id="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Décrivez votre entreprise en quelques mots"
        lightMode
      />
    </div>
  );
};