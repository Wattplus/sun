import { MessagesList } from "./MessagesList";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un message ou un client..." 
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="p-4">
          <MessagesList onMessageClick={handleMessageClick} />
        </Card>
      </motion.div>
    </div>
  );
};