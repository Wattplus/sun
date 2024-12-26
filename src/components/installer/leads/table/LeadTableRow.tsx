import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Phone, Mail, User, CalendarDays } from "lucide-react"
import { Lead, InstallerLeadStatus } from "@/types/crm"
import { LeadTableActions } from "./LeadTableActions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface LeadTableRowProps {
  lead: Lead
  isSelected: boolean
  onSelect: (lead: Lead) => void
  onStatusChange: (leadId: string, status: InstallerLeadStatus) => void
}

export const LeadTableRow = ({ lead, isSelected, onSelect, onStatusChange }: LeadTableRowProps) => {
  const { toast } = useToast()

  const handleContact = (type: string) => {
    if (type === 'phone') {
      window.location.href = `tel:${lead.phone}`
    } else if (type === 'email') {
      window.location.href = `mailto:${lead.email}`
    }
    toast({
      title: "Contact",
      description: `Contact initié via ${type}`,
    })
  }

  const getStatusBadge = (status: InstallerLeadStatus) => {
    const statusConfig: Record<InstallerLeadStatus, { label: string; className: string }> = {
      nouveau: { 
        label: "Nouveau lead", 
        className: "bg-blue-500/10 text-blue-500 border-blue-500/20" 
      },
      contacte: { 
        label: "Contacté", 
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" 
      },
      devis_envoye: { 
        label: "Devis envoyé", 
        className: "bg-orange-500/10 text-orange-500 border-orange-500/20" 
      },
      rdv_planifie: { 
        label: "RDV planifié", 
        className: "bg-purple-500/10 text-purple-500 border-purple-500/20" 
      },
      negociation: { 
        label: "En négociation", 
        className: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" 
      },
      signe: { 
        label: "Signé", 
        className: "bg-green-500/10 text-green-500 border-green-500/20" 
      },
      perdu: { 
        label: "Perdu", 
        className: "bg-red-500/10 text-red-500 border-red-500/20" 
      }
    }

    const config = statusConfig[status || 'nouveau']
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  return (
    <TableRow className="hover:bg-primary/5">
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(lead)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      </TableCell>
      <TableCell>
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="space-y-2 cursor-pointer">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium">{lead.firstName} {lead.lastName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContact('phone')}
                  className="justify-start gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {lead.phone}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleContact('email')}
                  className="justify-start gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {lead.email}
                </Button>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Détails du projet</h4>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Budget:</span> {lead.budget}€</p>
                <p><span className="text-muted-foreground">Notes:</span> {lead.notes}</p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>
                    Créé {formatDistanceToNow(new Date(lead.createdAt), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </span>
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            {lead.city}
          </div>
          <div className="text-sm text-muted-foreground">
            {lead.address}
          </div>
          <div className="text-sm text-muted-foreground">
            {lead.postalCode}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className="bg-primary/10 text-primary border-primary/20"
        >
          {lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel'}
        </Badge>
      </TableCell>
      <TableCell>
        {getStatusBadge(lead.installerStatus || 'nouveau')}
      </TableCell>
      <TableCell>
        <LeadTableActions 
          leadId={lead.id} 
          currentStatus={lead.installerStatus || 'nouveau'} 
          onStatusChange={onStatusChange}
        />
      </TableCell>
    </TableRow>
  )
}