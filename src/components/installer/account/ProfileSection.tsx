import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"
import { useNavigate } from "react-router-dom"
import { ProfileForm } from "./sections/ProfileForm"
import { InterventionZonesSection } from "./sections/InterventionZonesSection"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, User, MapPin, Building2, Phone, Mail, Globe } from "lucide-react"
import { motion } from "framer-motion"

export const ProfileSection = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    siret: "",
    website: "",
    description: "",
    service_area: [] as string[]
  })

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error fetching session:", error)
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour accéder à cette page",
          variant: "destructive",
        })
        navigate("/login")
        return
      }
      if (!session) {
        navigate("/login")
        return
      }
      setFormData(prev => ({ ...prev, email: session.user.email || "" }))

      // Fetch existing profile data
      const { data: installer, error: fetchError } = await supabase
        .from('installers')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      if (fetchError) {
        console.error("Error fetching installer profile:", fetchError)
      } else if (installer) {
        setFormData(prev => ({
          ...prev,
          firstName: installer.contact_name.split(' ')[0] || prev.firstName,
          lastName: installer.contact_name.split(' ')[1] || prev.lastName,
          phone: installer.phone || prev.phone,
          company: installer.company_name || prev.company,
          siret: installer.siret || prev.siret,
          website: installer.website || prev.website,
          description: installer.description || prev.description,
          service_area: installer.service_area || []
        }))
      }
    }

    getSession()
  }, [navigate, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleZonesChange = (zones: string[]) => {
    setFormData(prev => ({
      ...prev,
      service_area: zones
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        throw new Error("Vous devez être connecté pour créer votre profil")
      }

      const { error } = await supabase
        .from('installers')
        .upsert([
          {
            user_id: session.user.id,
            company_name: formData.company,
            contact_name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            address: "99 Rue du Moulin des Landes",
            postal_code: "44980",
            city: "Sainte-Luce-sur-Loire",
            service_area: formData.service_area,
            website: formData.website,
            siret: formData.siret,
            description: formData.description,
          }
        ], {
          onConflict: 'user_id'
        })

      if (error) {
        throw error
      }

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès",
      })
      
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la mise à jour de votre profil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Card with Profile Overview */}
      <Card className="p-8 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-lg border-primary/20">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary/10">
                {formData.firstName && formData.lastName 
                  ? `${formData.firstName[0]}${formData.lastName[0]}`
                  : "IN"}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-0 right-0 bg-background/80 hover:bg-background border-primary/20"
              onClick={() => {
                toast({
                  title: "Fonctionnalité à venir",
                  description: "Le changement d'avatar sera bientôt disponible",
                })
              }}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-gradient">{formData.company || "Votre entreprise"}</h2>
            <p className="text-muted-foreground">{formData.description || "Ajoutez une description de votre entreprise"}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4 text-primary" />
                <span>{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Sainte-Luce-sur-Loire, 44980</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 text-primary" />
                <span>{formData.siret || "SIRET non renseigné"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>{formData.phone || "Téléphone non renseigné"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>{formData.email}</span>
              </div>
              {formData.website && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>{formData.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileForm 
            formData={formData} 
            handleChange={handleChange}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InterventionZonesSection 
            selectedZones={formData.service_area}
            onZonesChange={handleZonesChange}
          />
        </motion.div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="w-full md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </div>
  )
}