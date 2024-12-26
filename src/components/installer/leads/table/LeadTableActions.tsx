import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { InstallerLeadStatus } from "@/types/crm"

interface LeadTableActionsProps {
  leadId: string
  currentStatus: InstallerLeadStatus
  onStatusChange: (leadId: string, status: InstallerLeadStatus) => void
}

export const LeadTableActions = ({ 
  leadId, 
  currentStatus, 
  onStatusChange 
}: LeadTableActionsProps) => {
  const statusOptions: { value: InstallerLeadStatus; label: string }[] = [
    { value: "nouveau", label: "Nouveau lead" },
    { value: "contacte", label: "Contacté" },
    { value: "devis_envoye", label: "Devis envoyé" },
    { value: "rdv_planifie", label: "RDV planifié" },
    { value: "negociation", label: "En négociation" },
    { value: "signe", label: "Signé" },
    { value: "perdu", label: "Perdu" }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onStatusChange(leadId, option.value)}
            className={currentStatus === option.value ? "bg-primary/10" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}