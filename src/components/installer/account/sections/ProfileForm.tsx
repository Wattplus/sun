import { FormField } from "@/components/form/FormField"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface ProfileFormProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    company: string
    siret: string
    website: string
    description: string
    service_area?: string[]
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

// Liste des départements français
const FRENCH_DEPARTMENTS = [
  "01 - Ain", "02 - Aisne", "03 - Allier", "04 - Alpes-de-Haute-Provence", "05 - Hautes-Alpes",
  "06 - Alpes-Maritimes", "07 - Ardèche", "08 - Ardennes", "09 - Ariège", "10 - Aube",
  "11 - Aude", "12 - Aveyron", "13 - Bouches-du-Rhône", "14 - Calvados", "15 - Cantal",
  "16 - Charente", "17 - Charente-Maritime", "18 - Cher", "19 - Corrèze", "2A - Corse-du-Sud",
  "2B - Haute-Corse", "21 - Côte-d'Or", "22 - Côtes-d'Armor", "23 - Creuse", "24 - Dordogne",
  "25 - Doubs", "26 - Drôme", "27 - Eure", "28 - Eure-et-Loir", "29 - Finistère",
  "30 - Gard", "31 - Haute-Garonne", "32 - Gers", "33 - Gironde", "34 - Hérault",
  "35 - Ille-et-Vilaine", "36 - Indre", "37 - Indre-et-Loire", "38 - Isère", "39 - Jura",
  "40 - Landes", "41 - Loir-et-Cher", "42 - Loire", "43 - Haute-Loire", "44 - Loire-Atlantique",
  "45 - Loiret", "46 - Lot", "47 - Lot-et-Garonne", "48 - Lozère", "49 - Maine-et-Loire",
  "50 - Manche", "51 - Marne", "52 - Haute-Marne", "53 - Mayenne", "54 - Meurthe-et-Moselle",
  "55 - Meuse", "56 - Morbihan", "57 - Moselle", "58 - Nièvre", "59 - Nord",
  "60 - Oise", "61 - Orne", "62 - Pas-de-Calais", "63 - Puy-de-Dôme", "64 - Pyrénées-Atlantiques",
  "65 - Hautes-Pyrénées", "66 - Pyrénées-Orientales", "67 - Bas-Rhin", "68 - Haut-Rhin",
  "69 - Rhône", "70 - Haute-Saône", "71 - Saône-et-Loire", "72 - Sarthe", "73 - Savoie",
  "74 - Haute-Savoie", "75 - Paris", "76 - Seine-Maritime", "77 - Seine-et-Marne",
  "78 - Yvelines", "79 - Deux-Sèvres", "80 - Somme", "81 - Tarn", "82 - Tarn-et-Garonne",
  "83 - Var", "84 - Vaucluse", "85 - Vendée", "86 - Vienne", "87 - Haute-Vienne",
  "88 - Vosges", "89 - Yonne", "90 - Territoire de Belfort", "91 - Essonne",
  "92 - Hauts-de-Seine", "93 - Seine-Saint-Denis", "94 - Val-de-Marne", "95 - Val-d'Oise",
  "971 - Guadeloupe", "972 - Martinique", "973 - Guyane", "974 - La Réunion",
  "976 - Mayotte"
];

export const ProfileForm = ({ formData, handleChange, handleSubmit, isLoading }: ProfileFormProps) => {
  const [isNationwide, setIsNationwide] = useState(formData.service_area?.includes("Toute France") || false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    formData.service_area?.filter(area => area !== "Toute France") || []
  );

  const handleNationwideChange = (checked: boolean) => {
    setIsNationwide(checked);
    if (checked) {
      setSelectedDepartments([]);
    }
  };

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments(prev => [...prev, department]);
    } else {
      setSelectedDepartments(prev => prev.filter(d => d !== department));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceArea = isNationwide ? ["Toute France"] : selectedDepartments;
    // Update formData with the selected service area
    const updatedFormData = {
      ...formData,
      service_area: serviceArea
    };
    handleSubmit(e);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Prénom"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
          />

          <FormField
            label="Nom"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
          />

          <FormField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            disabled
          />

          <FormField
            label="Téléphone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+33 6 12 34 56 78"
            required
          />

          <FormField
            label="Entreprise"
            id="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nom de votre entreprise"
            required
          />

          <FormField
            label="SIRET"
            id="siret"
            value={formData.siret}
            onChange={handleChange}
            placeholder="123 456 789 00012"
            required
          />

          <FormField
            label="Site web"
            id="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="www.monentreprise.fr"
          />

          <FormField
            label="Description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez votre entreprise en quelques mots"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Zones d'intervention</h3>
          
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="nationwide"
              checked={isNationwide}
              onCheckedChange={handleNationwideChange}
            />
            <Label htmlFor="nationwide">Toute France</Label>
          </div>

          {!isNationwide && (
            <ScrollArea className="h-[200px] border rounded-md p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {FRENCH_DEPARTMENTS.map((department) => (
                  <div key={department} className="flex items-center space-x-2">
                    <Checkbox
                      id={department}
                      checked={selectedDepartments.includes(department)}
                      onCheckedChange={(checked) => handleDepartmentChange(department, checked as boolean)}
                    />
                    <Label htmlFor={department} className="text-sm">
                      {department}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="w-full md:w-auto flex items-center gap-2"
            disabled={isLoading}
            size="lg"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Enregistrement en cours..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </Card>
  )
}