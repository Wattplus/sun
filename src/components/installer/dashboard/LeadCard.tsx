import { Lead } from "@/types/crm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Home, CreditCard, Building2 } from "lucide-react";
import { motion } from "framer-motion";

interface LeadCardProps {
  lead: Lead;
  status: string;
  onStatusChange: (status: string) => void;
}

export const LeadCard = ({ lead, status, onStatusChange }: LeadCardProps) => {
  return (
    <Link to={`/espace-installateur/leads/${lead.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 bg-glass-gradient hover:bg-glass-gradient-hover backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  {lead.projectType === 'professional' ? (
                    <Building2 className="h-4 w-4 text-primary animate-pulse" />
                  ) : (
                    <Home className="h-4 w-4 text-primary animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    {lead.firstName} {lead.lastName}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${lead.projectType === 'professional' 
                        ? 'bg-amber-500/10 text-amber-600 border-amber-200/20 group-hover:bg-amber-500/20' 
                        : 'bg-emerald-500/10 text-emerald-600 border-emerald-200/20 group-hover:bg-emerald-500/20'
                      } transition-colors duration-300
                    `}
                  >
                    {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
                  </Badge>
                </div>
              </div>
            </div>
            <div 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="relative z-10"
            >
              <Select 
                value={status} 
                onValueChange={onStatusChange}
              >
                <SelectTrigger className="w-[140px] bg-background/50 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nouveau">Nouveau</SelectItem>
                  <SelectItem value="contacte">Contacté</SelectItem>
                  <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
                  <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
                  <SelectItem value="negociation">En négociation</SelectItem>
                  <SelectItem value="signe">Signé</SelectItem>
                  <SelectItem value="perdu">Perdu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{lead.phone}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{lead.postalCode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm">{lead.monthlyBill ? `${lead.monthlyBill}€/mois` : 'Non renseigné'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};