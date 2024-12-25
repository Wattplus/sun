import { FormField } from "@/components/form/FormField";

interface AddressFieldsProps {
  address: string;
  postalCode: string;
  city: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    address?: string;
    postalCode?: string;
    city?: string;
  };
}

export const AddressFields = ({ address, postalCode, city, onChange, errors }: AddressFieldsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        label="Adresse"
        id="address"
        value={address}
        onChange={onChange}
        placeholder="123 rue de la République"
        error={errors.address}
        lightMode
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Code postal"
          id="postalCode"
          value={postalCode}
          onChange={onChange}
          placeholder="75001"
          error={errors.postalCode}
          lightMode
        />
        <FormField
          label="Ville"
          id="city"
          value={city}
          onChange={onChange}
          placeholder="Paris"
          error={errors.city}
          lightMode
        />
      </div>
    </div>
  );
};