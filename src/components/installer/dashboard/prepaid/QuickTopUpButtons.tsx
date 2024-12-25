import { Button } from "@/components/ui/button";
import { Euro } from "lucide-react";

interface QuickTopUpButtonsProps {
  onTopUp: (amount: number) => void;
  isLoading: boolean;
}

export const QuickTopUpButtons = ({ onTopUp, isLoading }: QuickTopUpButtonsProps) => {
  return (
    <>
      {[50, 100, 200].map((amount) => (
        <Button
          key={amount}
          variant="outline"
          onClick={() => onTopUp(amount)}
          disabled={isLoading}
        >
          <Euro className="h-4 w-4 mr-2" />
          {amount}€
        </Button>
      ))}
    </>
  );
};