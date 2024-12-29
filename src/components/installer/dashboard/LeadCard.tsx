import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Mail, MapPin, Phone, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeadCardProps {
  lead: Lead;
  status: 'available' | 'purchased';
  onStatusChange?: (newStatus: string) => void;
  onSelect?: () => void;
  isSelected?: boolean;
  onNoteAdd?: (note: string) => void;
}

export const LeadCard = ({ lead, status, onSelect, isSelected, onNoteAdd, onStatusChange }: LeadCardProps) => {
  const isAvailable = status === 'available';
  const isMobile = useIsMobile();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const handleNoteSubmit = () => {
    if (note.trim()) {
      onNoteAdd?.(note);
      setNote("");
      setShowNoteInput(false);
      toast({
        title: "Note ajoutée",
        description: "La note a été ajoutée avec succès",
      });
    }
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusChange?.(newStatus);
    toast({
      title: "Statut mis à jour",
      description: "Le statut du lead a été mis à jour avec succès",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouveau': return 'bg-blue-500/10 text-blue-600';
      case 'contacte': return 'bg-yellow-500/10 text-yellow-600';
      case 'devis_envoye': return 'bg-purple-500/10 text-purple-600';
      case 'rdv_planifie': return 'bg-green-500/10 text-green-600';
      case 'negociation': return 'bg-orange-500/10 text-orange-600';
      case 'signe': return 'bg-emerald-500/10 text-emerald-600';
      case 'perdu': return 'bg-red-500/10 text-red-600';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

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
                <h3 className="font-medium text-base md:text-lg">
                  {lead.firstname} {isAvailable ? '' : lead.lastname}
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className={lead.projectType === 'professional' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}
                  >
                    {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
                  </Badge>
                </div>
              </div>
            </div>
            {isAvailable && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {lead.price}€
              </Badge>
            )}
          </div>

          {!isAvailable && (
            <div className="w-full">
              <Select 
                value={lead.installerStatus} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className={`w-full ${getStatusColor(lead.installerStatus || 'nouveau')}`}>
                  <SelectValue placeholder="Changer le statut" />
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
          )}

          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{lead.postalcode}</span>
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Acheté le {new Date(lead.purchasedby?.[0]?.purchaseDate || "").toLocaleDateString()}</span>
                </div>
              </>
            )}
          </div>

          {!isAvailable && (
            <div className="space-y-2">
              {showNoteInput ? (
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Ajouter une note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleNoteSubmit}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setShowNoteInput(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => setShowNoteInput(true)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ajouter une note
                </Button>
              )}
            </div>
          )}

          {isAvailable && onSelect && (
            <Button
              onClick={onSelect}
              variant={isSelected ? "secondary" : "outline"}
              className="w-full mt-2"
              size={isMobile ? "sm" : "default"}
            >
              {isSelected ? "Désélectionner" : "Sélectionner"}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};