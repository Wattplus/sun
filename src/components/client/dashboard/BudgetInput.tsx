import { FormField } from "@/components/form/FormField";

interface BudgetInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const BudgetInput = ({ value, onChange, error }: BudgetInputProps) => {
  return (
    <FormField
      label="Budget (€)"
      id="budget"
      type="number"
      value={value}
      onChange={onChange}
      placeholder="Ex: 15000"
      error={error}
      lightMode
    />
  );
};