import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase-client"
import { useNavigate } from "react-router-dom"
import { ProfileHeader } from "./sections/ProfileHeader"
import { ProfileForm } from "./sections/ProfileForm"

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
      <ProfileHeader 
        company={formData.company}
        description={formData.description}
      />
      <ProfileForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}