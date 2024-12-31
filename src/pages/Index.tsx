import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, Sun, Shield, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50">
      <Helmet>
        <title>Solar Pro - Plateforme de mise en relation installateurs solaires</title>
        <meta 
          name="description" 
          content="Connectez-vous avec des installateurs qualifiés pour vos projets d'installation solaire. Trouvez les meilleurs professionnels près de chez vous." 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center space-y-8 mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent"
          >
            Développez votre activité solaire
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Rejoignez le réseau leader des installateurs photovoltaïques en France
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/devenir-installateur">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 group flex items-center gap-2 w-full sm:w-auto"
              >
                Devenir installateur
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/connexion-installateur">
              <Button 
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/5"
              >
                Déjà inscrit ? Se connecter
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Sun className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Leads Qualifiés</h3>
                <p className="text-muted-foreground">
                  Accédez à des prospects qualifiés et prêts à installer des panneaux solaires
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Certification Qualité</h3>
                <p className="text-muted-foreground">
                  Valorisez vos certifications RGE et vos compétences auprès des clients
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Réseau National</h3>
                <p className="text-muted-foreground">
                  Intégrez un réseau d'installateurs qualifiés partout en France
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}