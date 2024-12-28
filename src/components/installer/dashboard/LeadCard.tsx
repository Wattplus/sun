import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

interface LeadCardProps {
  lead: Lead;
  status: 'available' | 'purchased';
  onStatusChange: () => void;
}

export const LeadCard = ({ lead, status }: LeadCardProps) => {
  const isAvailable = status === 'available';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-4 hover:shadow-lg transition-all duration-300 border border-primary/10 hover:border-primary/30 bg-background/50">
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
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
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
      </Card>
    </motion.div>
  );
};