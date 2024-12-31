import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NotificationsList } from "./NotificationsList";
import { Card } from "@/components/ui/card";

export const NotificationsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session?.user) return;

        // Marquer les notifications comme lues
        const { data: installerData } = await supabase
          .from("installers")
          .select("id")
          .eq("user_id", session.session.user.id)
          .single();

        if (installerData) {
          console.log("Installer ID:", installerData.id);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
      </div>

      <Card className="p-6">
        {isLoading ? (
          <div>Chargement des notifications...</div>
        ) : (
          <NotificationsList />
        )}
      </Card>
    </div>
  );
};