import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-primary-light to-primary opacity-75 rounded-lg blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full bg-background hover:bg-background/90 text-white font-semibold py-6 text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 rounded-lg border border-primary/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Faire une étude gratuite
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>
    </div>
  );
};