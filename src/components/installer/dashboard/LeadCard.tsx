import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LeadCardProps {
  lead: Lead;
  status: 'available' | 'purchased';
  onStatusChange?: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

export const LeadCard = ({ lead, status, onSelect, isSelected }: LeadCardProps) => {
  const isAvailable = status === 'available';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className="p-4 hover:shadow-lg transition-all duration-300 border border-primary/10 hover:border-primary/30 bg-background/50">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {lead.projectType === 'professional' ? (
                  <Building2 className="h-4 w-4 text-primary" />
                ) : (
                  <Home className="h-4 w-4 text-primary" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  {lead.firstName} {isAvailable ? '' : lead.lastName}
                </h3>
                <Badge 
                  variant="outline" 
                  className={lead.projectType === 'professional' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}
                >
                  {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
                </Badge>
              </div>
            </div>
            {isAvailable && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {lead.price}€
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{lead.postalCode}</span>
            </div>
            {!isAvailable && (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{lead.email}</span>
                </div>
              </>
            )}
          </div>

          {isAvailable && onSelect && (
            <Button
              onClick={onSelect}
              variant={isSelected ? "secondary" : "outline"}
              className="w-full mt-2"
            >
              {isSelected ? "Désélectionner" : "Sélectionner"}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};