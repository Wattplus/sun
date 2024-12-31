import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";
import { PrepaidBalance } from "@/components/installer/dashboard/PrepaidBalance";
import { PrepaidStats } from "@/components/installer/dashboard/prepaid/PrepaidStats";
import { PrepaidAdvantages } from "@/components/installer/dashboard/prepaid/PrepaidAdvantages";
import { useInstallerBalance } from "@/hooks/installer/useInstallerBalance";
import { motion } from "framer-motion";
import { ChartLine, Euro, ArrowRight, HelpCircle } from "lucide-react";
import PerformanceChart from "@/components/admin/PerformanceChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Comment fonctionne le compte prépayé ?",
    answer: "Le compte prépayé vous permet de recharger votre solde à l'avance pour acheter des leads. Vous bénéficiez de tarifs préférentiels et d'un accès prioritaire aux nouveaux leads.",
  },
  {
    question: "Quels sont les avantages du compte prépayé ?",
    answer: "Les avantages incluent : des réductions sur le prix des leads, un accès prioritaire aux nouveaux contacts, pas de frais de transaction supplémentaires, et une gestion simplifiée de vos achats.",
  },
  {
    question: "Comment recharger mon compte ?",
    answer: "Vous pouvez recharger votre compte en quelques clics via la section 'Options de rechargement'. Nous acceptons les cartes bancaires et les virements. Les fonds sont disponibles immédiatement après le paiement.",
  },
  {
    question: "Y a-t-il un montant minimum de recharge ?",
    answer: "Le montant minimum de recharge est de 50€. Nous proposons différentes options de recharge adaptées à vos besoins, avec des bonus sur les montants plus élevés.",
  },
  {
    question: "Les crédits ont-ils une date d'expiration ?",
    answer: "Non, vos crédits n'expirent pas. Vous pouvez les utiliser quand vous le souhaitez pour acheter des leads.",
  },
  {
    question: "Comment suivre mes dépenses ?",
    answer: "Vous pouvez suivre toutes vos transactions dans la section 'Performance' qui affiche un historique détaillé de vos rechargements et achats de leads.",
  },
];

export const PrepaidAccountPage = () => {
  const { balance, isLoading } = useInstallerBalance();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background-light to-background">
      <div className="max-w-[1600px] mx-auto p-4 md:p-6 space-y-8 md:space-y-12">
        <InstallerBreadcrumb />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 md:space-y-12"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-glass-gradient p-6 md:p-8 rounded-2xl backdrop-blur-lg border border-primary/20">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent">
                Mon compte prépayé
              </h1>
              <p className="text-white/80 text-base md:text-lg max-w-xl">
                Gérez votre solde, rechargez votre compte et accédez aux meilleurs leads en priorité
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-primary/20 backdrop-blur-sm w-full md:w-auto"
            >
              <div className="p-3 rounded-lg bg-primary/20">
                <Euro className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/60">Performance du mois</p>
                <p className="text-2xl font-bold text-white">+15%</p>
              </div>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8">
            {/* Balance Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-glass-gradient rounded-2xl backdrop-blur-lg border border-primary/20 p-6 md:p-8"
            >
              <PrepaidBalance balance={balance} />
            </motion.div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-glass-gradient rounded-2xl backdrop-blur-lg border border-primary/20 p-6 md:p-8"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent flex items-center gap-2">
                  <ChartLine className="h-6 w-6" />
                  Performance
                </h2>
                <div className="h-[400px]">
                  <PerformanceChart />
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <PrepaidStats />
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-glass-gradient rounded-2xl backdrop-blur-lg border border-primary/20 p-6 md:p-8"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-8">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-white">
                    Questions fréquentes
                  </h2>
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-6"
                    >
                      <AccordionTrigger className="text-lg font-semibold text-white hover:text-primary transition-colors py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/80 text-base leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center py-12 md:py-16 bg-glass-gradient rounded-2xl backdrop-blur-lg border border-primary/20"
            >
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent mb-6">
                Prêt à accéder aux meilleurs leads ?
              </h2>
              <p className="text-white/80 mb-8 text-base md:text-lg max-w-2xl mx-auto">
                Rechargez votre compte et commencez à développer votre activité dès aujourd'hui
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="glass-button group"
                  onClick={() => document.getElementById('recharge-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text-white text-lg">Recharger mon compte</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <p className="mt-4 text-white/60 text-sm">
                Sans engagement • Paiement sécurisé • Support 24/7
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};