import { MessagesList } from "./MessagesList";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const MessagesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleMessageClick = (id: string) => {
    navigate(`/espace-installateur/messages/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-2 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1400px] mx-auto space-y-4"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher dans les messages..." 
                className="pl-10 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button className="w-full md:w-auto gap-2">
            <Plus className="h-4 w-4" />
            Nouveau message
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-3 p-4 space-y-4">
            <h3 className="font-semibold text-lg">Filtres</h3>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-start gap-2 py-2">
                <MessageSquare className="h-4 w-4" />
                Tous les messages
                <Badge variant="secondary" className="ml-auto">24</Badge>
              </Badge>
              <Badge variant="outline" className="w-full justify-start gap-2 py-2">
                Non lus
                <Badge variant="secondary" className="ml-auto">12</Badge>
              </Badge>
              <Badge variant="outline" className="w-full justify-start gap-2 py-2">
                Archivés
                <Badge variant="secondary" className="ml-auto">8</Badge>
              </Badge>
            </div>
          </Card>

          <Card className="md:col-span-9 p-6 bg-background/60 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Messages récents</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Voir tous les messages
              </Button>
            </div>
            <MessagesList onMessageClick={handleMessageClick} />
          </Card>
        </div>
      </motion.div>
    </div>
  );
};