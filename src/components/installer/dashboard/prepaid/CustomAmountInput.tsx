import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Montant personnalisé"
        className="flex-1"
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