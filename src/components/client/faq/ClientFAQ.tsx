import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const clientFaqs = [
  {
    question: "Comment suivre l'avancement de mon projet ?",
    answer: "Vous pouvez suivre l'avancement de votre projet dans la section 'Tableau de bord'. Vous y trouverez les différentes étapes, de l'étude initiale jusqu'à l'installation finale, ainsi que les dates importantes."
  },
  {
    question: "Où puis-je trouver mes documents ?",
    answer: "Tous vos documents (devis, factures, études techniques, etc.) sont disponibles dans l'onglet 'Documents'. Vous pouvez les consulter et les télécharger à tout moment."
  },
  {
    question: "Comment contacter mon installateur ?",
    answer: "Vous pouvez contacter votre installateur via l'onglet 'Messages' de votre espace client. Vous pouvez également nous joindre par téléphone au 09 77 77 41 64 ou par email à mikael@wattplus.org."
  },
  {
    question: "Comment sont calculées mes économies estimées ?",
    answer: "Les économies sont calculées sur une période de 20 ans en prenant en compte votre facture d'électricité actuelle, la production estimée de vos panneaux solaires, et l'évolution prévisionnelle du prix de l'électricité."
  },
  {
    question: "Que faire en cas de problème technique ?",
    answer: "En cas de problème technique, contactez-nous immédiatement via l'onglet 'Messages' ou appelez notre service technique au 09 77 77 41 64. Nous interviendrons dans les plus brefs délais."
  }
]

export function ClientFAQ() {
  return (
    <div className="glass-panel p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Questions fréquentes</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {clientFaqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`faq-${index}`}
            className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
          >
            <AccordionTrigger className="px-4 hover:text-primary text-white">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}