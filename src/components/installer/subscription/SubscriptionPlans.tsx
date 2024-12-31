import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles, Star } from "lucide-react"
import { subscriptionPlans } from "@/types/subscription"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export const SubscriptionPlans = () => {
  const { toast } = useToast()

  const handleSubscribe = async (priceId: string) => {
    if (!priceId) {
      toast({
        title: "Plan gratuit",
        description: "Vous utilisez déjà le plan gratuit.",
      })
      return
    }

    try {
      const response = await fetch("https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ priceId }),
      })

      if (!response.ok) throw new Error()

      const { url } = await response.json()
      if (url) window.location.href = url
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la souscription.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Plans d'abonnement</h2>
        <p className="text-muted-foreground mt-2">
          Choisissez le plan qui correspond le mieux à vos besoins
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {subscriptionPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col relative transform transition-all duration-200 hover:scale-105 ${
              plan.tier === 'premium' 
                ? 'border-primary shadow-lg shadow-primary/20 scale-105' 
                : ''
            }`}
          >
            {plan.tier === 'premium' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Sparkles className="h-4 w-4" />
                  Recommandé
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                {plan.name}
                <span className="text-3xl font-bold">{plan.price}€<span className="text-sm font-normal text-muted-foreground">/mois</span></span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${
                      plan.tier === 'premium' ? 'text-primary' : 'text-green-500'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${
                  plan.tier === 'premium' 
                    ? 'bg-primary hover:bg-primary/90' 
                    : plan.tier === 'free' 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-900' 
                    : 'border-2 border-primary/50'
                }`}
                variant={plan.tier === 'premium' ? 'default' : 'outline'}
                onClick={() => handleSubscribe(plan.priceId)}
              >
                {plan.tier === 'free' ? 'Plan actuel' : 'Souscrire'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}