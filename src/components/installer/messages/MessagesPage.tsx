import { MessagesList } from "./MessagesList";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1200px] mx-auto space-y-6"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">
              Gérez vos conversations et suivez vos échanges
            </p>
          </div>
        </div>

        <Card className="p-6 shadow-lg bg-card/50 backdrop-blur-sm">
          <MessagesList />
        </Card>
      </motion.div>
    </div>
  );
};