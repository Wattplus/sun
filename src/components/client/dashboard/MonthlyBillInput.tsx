import { FormField } from "@/components/form/FormField";

interface MonthlyBillInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const MonthlyBillInput = ({ value, onChange, error }: MonthlyBillInputProps) => {
  const calculateAnnualBill = () => {
    const monthlyBill = parseFloat(value);
    if (!isNaN(monthlyBill)) {
      return (monthlyBill * 12).toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      });
    }
    return "0 €";
  };

  return (
    <div className="space-y-2">
      <FormField
        label="Facture mensuelle (€)"
        id="monthlyBillEuros"
        type="number"
        value={value}
        onChange={onChange}
        placeholder="Ex: 150"
        error={error}
        lightMode
      />
      {value && !error && (
        <div className="text-sm text-green-400 mt-1">
          Facture annuelle estimée : {calculateAnnualBill()}
        </div>
      )}
    </div>
  );
};