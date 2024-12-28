import { Card } from "@/components/ui/card";
import { PrepaidBalance } from "./PrepaidBalance";
import { StatsCards } from "./StatsCards";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronRight, HelpCircle } from "lucide-react";
import { mockAvailableLeads } from "./mockAvailableLeads";
import { mockPurchasedLeads } from "./mockPurchasedLeads";
import { LeadsOverview } from "./leads/LeadsOverview";
import { AllPurchasedLeads } from "./leads/AllPurchasedLeads";
import { AllAvailableLeads } from "./leads/AllAvailableLeads";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Comment fonctionne le tableau de bord ?",
    answer: "Le tableau de bord vous permet de suivre vos statistiques clés, gérer votre solde prépayé et accéder rapidement aux leads disponibles et achetés."
  },
  {
    question: "Comment acheter des leads ?",
    answer: "Vous pouvez acheter des leads directement depuis la section 'Leads disponibles'. Assurez-vous d'avoir un solde suffisant dans votre compte prépayé."
  },
  {
    question: "Comment recharger mon compte ?",
    answer: "Utilisez la section 'Solde prépayé' pour ajouter des fonds à votre compte. Plusieurs options de paiement sont disponibles."
  }
];

export function DashboardTabs() {
  const [showAllAvailable, setShowAllAvailable] = useState(false);
  const [showAllPurchased, setShowAllPurchased] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  return (
    <div className="space-y-8 sm:space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatsCards />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6 glass-panel border-2 border-primary/20 hover:border-primary/30 transition-all duration-300">
          <PrepaidBalance />
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Leads disponibles
          </h2>
          <Button
            variant="ghost"
            onClick={() => setShowAllAvailable(!showAllAvailable)}
            className="gap-2 hover:bg-primary/10"
          >
            {showAllAvailable ? "Voir moins" : "Voir tout"}
            <ChevronRight className={`h-4 w-4 transition-transform ${showAllAvailable ? "rotate-90" : ""}`} />
          </Button>
        </div>
        {showAllAvailable ? (
          <AllAvailableLeads 
            leads={mockAvailableLeads} 
            onClose={() => setShowAllAvailable(false)}
          />
        ) : (
          <LeadsOverview 
            availableLeads={mockAvailableLeads.slice(0, 4)}
            purchasedLeads={mockPurchasedLeads.slice(0, 4)}
            onShowAllAvailable={() => setShowAllAvailable(true)}
            onShowAllPurchased={() => setShowAllPurchased(true)}
          />
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Leads achetés
          </h2>
          <Button
            variant="ghost"
            onClick={() => setShowAllPurchased(!showAllPurchased)}
            className="gap-2 hover:bg-primary/10"
          >
            {showAllPurchased ? "Voir moins" : "Voir tout"}
            <ChevronRight className={`h-4 w-4 transition-transform ${showAllPurchased ? "rotate-90" : ""}`} />
          </Button>
        </div>
        {showAllPurchased ? (
          <AllPurchasedLeads 
            leads={mockPurchasedLeads} 
            onClose={() => setShowAllPurchased(false)}
          />
        ) : (
          <LeadsOverview 
            availableLeads={mockAvailableLeads.slice(0, 4)}
            purchasedLeads={mockPurchasedLeads.slice(0, 4)}
            onShowAllAvailable={() => setShowAllAvailable(true)}
            onShowAllPurchased={() => setShowAllPurchased(true)}
          />
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent flex items-center gap-2">
            <HelpCircle className="h-6 w-6" />
            Aide et FAQ
          </h2>
          <Button
            variant="ghost"
            onClick={() => setShowFaq(!showFaq)}
            className="gap-2 hover:bg-primary/10"
          >
            {showFaq ? "Masquer" : "Afficher"}
            <ChevronRight className={`h-4 w-4 transition-transform ${showFaq ? "rotate-90" : ""}`} />
          </Button>
        </div>
        
        {showFaq && (
          <Card className="p-6 glass-panel border-2 border-primary/20">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border-b border-primary/10 last:border-0"
                >
                  <AccordionTrigger className="text-lg hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        )}
      </motion.div>
    </div>
  );
}