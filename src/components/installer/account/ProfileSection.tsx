import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"
import { useNavigate } from "react-router-dom"
import { ProfileHeader } from "./sections/ProfileHeader"
import { ProfileForm } from "./sections/ProfileForm"
import { InterventionZonesSection } from "./sections/InterventionZonesSection"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

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
    console.log("Updating zones:", zones)
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
    <div className="space-y-6">
      {/* En-tête du profil avec avatar */}
      <Card className="p-6 bg-secondary/80 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {formData.firstName && formData.lastName 
                  ? `${formData.firstName[0]}${formData.lastName[0]}`
                  : "IN"}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-0 right-0 bg-secondary hover:bg-secondary-dark"
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
          <div>
            <h2 className="text-2xl font-bold text-white">{formData.company || "Votre entreprise"}</h2>
            <p className="text-white/60">{formData.description || "Ajoutez une description de votre entreprise"}</p>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ProfileForm formData={formData} handleChange={handleChange} />
        
        <InterventionZonesSection 
          selectedZones={formData.service_area}
          onZonesChange={handleZonesChange}
        />

        <Button 
          type="submit" 
          className="w-full md:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
      </form>
    </div>
  )
}