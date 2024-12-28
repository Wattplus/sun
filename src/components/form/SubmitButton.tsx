import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <div className="relative group mt-8">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
      <Button 
        type="submit" 
        className="relative w-full bg-green-500 hover:bg-green-600 text-xl h-16 gap-3 rounded-full font-semibold"
        disabled={isSubmitting}
      >
        <Send className="w-6 h-6" />
        {isSubmitting ? "Ajout en cours..." : "Ajouter la carte"}
      </Button>
    </div>
  );
};