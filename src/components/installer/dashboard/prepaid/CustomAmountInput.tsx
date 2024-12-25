import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { Euro } from "lucide-react";

interface CustomAmountInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CustomAmountInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading 
}: CustomAmountInputProps) => {
  return (
    <div className="flex gap-2">
      <FormField
        id="customAmount"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Montant libre"
        label=""
        lightMode
      />
      <Button
        variant="outline"
        onClick={onSubmit}
        disabled={isLoading}
        className="whitespace-nowrap"
      >
        <Euro className="h-4 w-4 mr-2" />
        Recharger
      </Button>
    </div>
  );
};