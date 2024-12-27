import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { PrepaidSection } from "./PrepaidSection";

export const AccountSection = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">Mon compte</h2>
          <p className="text-sm text-muted-foreground">
            Gérez votre solde et vos achats de leads
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-primary/20 hover:bg-primary/5"
        >
          <Info className="h-3 w-3 mr-1" />
          Aide
        </Button>
      </div>
      
      <PrepaidSection />
    </div>
  );
};