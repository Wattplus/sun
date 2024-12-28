import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Building, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Contact {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  purchaseType: "exclusif" | "mutualisé";
  purchaseDate: string;
}

interface ContactsListProps {
  contacts: Contact[];
}

export const ContactsList = ({ contacts }: ContactsListProps) => {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
    toast.success("Appel en cours...");
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
    toast.success("Ouverture de votre messagerie...");
  };

  return (
    <Card className="p-6 bg-background/95 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              Entreprises intéressées par votre projet
            </h3>
            <p className="text-sm text-muted-foreground">
              Ces entreprises ont manifesté leur intérêt pour votre projet
            </p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Shield className="w-4 h-4" />
            Contacts vérifiés
          </Badge>
        </div>

        {contacts.length > 0 ? (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      <h4 className="font-medium">{contact.companyName}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Contact : {contact.contactName}
                    </p>
                  </div>
                  <Badge>
                    {contact.purchaseType === "exclusif" ? "Contact exclusif" : "Contact mutualisé"}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => handleCall(contact.phone)}
                  >
                    <Phone className="w-4 h-4" />
                    Appeler
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => handleEmail(contact.email)}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Building className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucune entreprise n'a encore manifesté son intérêt</p>
            <p className="text-sm">
              Vous serez notifié dès qu'une entreprise s'intéressera à votre projet
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};