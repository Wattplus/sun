import { FormField } from "@/components/form/FormField"

interface InstallerFormFieldsProps {
  formData: {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    companyName: string
    phone: string
    siret: string
    address: string
    postalCode: string
    city: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InstallerFormFields = ({ formData, handleChange }: InstallerFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Prénom"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          lightMode
        />
        <FormField
          label="Nom"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          lightMode
        />
      </div>

      <FormField
        label="Email professionnel"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        lightMode
      />

      <FormField
        label="Mot de passe"
        id="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        lightMode
      />

      <FormField
        label="Confirmer le mot de passe"
        id="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        lightMode
      />

      <FormField
        label="Nom de l'entreprise"
        id="companyName"
        value={formData.companyName}
        onChange={handleChange}
        required
        lightMode
      />

      <FormField
        label="Téléphone"
        id="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        lightMode
      />

      <FormField
        label="SIRET"
        id="siret"
        value={formData.siret}
        onChange={handleChange}
        required
        lightMode
        placeholder="123 456 789 00012"
      />

      <FormField
        label="Adresse"
        id="address"
        value={formData.address}
        onChange={handleChange}
        required
        lightMode
        placeholder="123 rue du Soleil"
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Code postal"
          id="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
          lightMode
          placeholder="75001"
        />
        <FormField
          label="Ville"
          id="city"
          value={formData.city}
          onChange={handleChange}
          required
          lightMode
          placeholder="Paris"
        />
      </div>
    </>
  )
}