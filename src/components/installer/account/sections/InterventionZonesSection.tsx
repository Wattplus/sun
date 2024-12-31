import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Globe, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface InterventionZonesSectionProps {
  selectedZones: string[];
  onZonesChange: (zones: string[]) => void;
}

export const InterventionZonesSection = ({ selectedZones, onZonesChange }: InterventionZonesSectionProps) => {
  const [isNationwide, setIsNationwide] = useState(selectedZones.includes("Toute France"));
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    selectedZones.filter(zone => zone !== "Toute France")
  );

  useEffect(() => {
    if (isNationwide) {
      onZonesChange(["Toute France"]);
    } else {
      onZonesChange(selectedDepartments);
    }
  }, [isNationwide, selectedDepartments, onZonesChange]);

  useEffect(() => {
    const nationwide = selectedZones.includes("Toute France");
    setIsNationwide(nationwide);
    setSelectedDepartments(nationwide ? [] : selectedZones);
  }, [selectedZones]);

  const handleNationwideClick = () => {
    setIsNationwide(!isNationwide);
    if (!isNationwide) {
      setSelectedDepartments([]);
      onZonesChange(["Toute France"]);
    } else {
      onZonesChange([]);
    }
  };

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (isNationwide) {
      setIsNationwide(false);
    }
    
    let newDepartments: string[];
    if (checked) {
      newDepartments = [...selectedDepartments, department];
    } else {
      newDepartments = selectedDepartments.filter(d => d !== department);
    }
    
    setSelectedDepartments(newDepartments);
    onZonesChange(newDepartments);
  };

  return (
    <Card className="p-6 space-y-4 bg-background/50 backdrop-blur-sm border-primary/20">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Zones d'intervention</h3>
            <p className="text-sm text-white/60">
              Sélectionnez les départements où vous intervenez
            </p>
          </div>
        </div>
        <Button 
          variant={isNationwide ? "default" : "outline"}
          onClick={handleNationwideClick}
          className="gap-2 whitespace-nowrap"
        >
          <Globe className="h-4 w-4" />
          {isNationwide ? "Toute France activé" : "Toute France"}
        </Button>
      </div>

      {!isNationwide && (
        <>
          <div className="flex flex-wrap gap-2">
            {selectedDepartments.map((dept) => (
              <Badge 
                key={dept}
                variant="secondary"
                className="bg-primary/20 hover:bg-primary/30 cursor-pointer"
                onClick={() => handleDepartmentChange(dept, false)}
              >
                {dept}
                <span className="ml-1 text-xs">×</span>
              </Badge>
            ))}
          </div>

          <ScrollArea className="h-[300px] border rounded-md p-4 bg-background/30">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {FRENCH_DEPARTMENTS.map((department) => (
                <div key={department} className="flex items-center space-x-2 p-2 hover:bg-primary/5 rounded-md transition-colors">
                  <Checkbox
                    id={department}
                    checked={selectedDepartments.includes(department)}
                    onCheckedChange={(checked) => handleDepartmentChange(department, checked as boolean)}
                  />
                  <label 
                    htmlFor={department} 
                    className="text-sm cursor-pointer hover:text-primary transition-colors"
                  >
                    {department}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </Card>
  );
};