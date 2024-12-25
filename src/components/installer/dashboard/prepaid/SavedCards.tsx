import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface SavedCard {
  id: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
}

interface SavedCardsProps {
  cards: SavedCard[];
  onDeleteCard: (cardId: string) => void;
  onAddCard: () => void;
}

export const SavedCards = ({ cards, onDeleteCard, onAddCard }: SavedCardsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-white/80">Cartes enregistrées</h4>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onAddCard}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter une carte
        </Button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-6 text-white/60">
          <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Aucune carte enregistrée</p>
          <p className="text-sm">Ajoutez une carte pour faciliter vos rechargements</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 rounded-lg p-3 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-white/90">
                    {card.brand} •••• {card.last4}
                  </p>
                  <p className="text-xs text-white/60">
                    Expire {card.expMonth.toString().padStart(2, '0')}/{card.expYear}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteCard(card.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};