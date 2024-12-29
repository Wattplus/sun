import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { supabase } from "@/integrations/supabase/client";

const ComplaintManagement = () => {
  const { data: complaints, isLoading } = useQuery({
    queryKey: ['complaints'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('complaints')
        .select('*, leads(*), installers(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-6 p-6">
      <AdminBreadcrumb />
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-primary" />
          Gestion des réclamations
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl"
      >
        {isLoading ? (
          <p className="text-center text-muted-foreground">Chargement...</p>
        ) : !complaints?.length ? (
          <p className="text-center text-muted-foreground">
            Aucune réclamation à afficher
          </p>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="border border-border rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Réclamation #{complaint.id.slice(0, 8)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(complaint.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    complaint.status === 'resolved' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {complaint.status === 'resolved' ? 'Résolu' : 'En attente'}
                  </span>
                </div>
                <p className="text-sm">{complaint.description}</p>
                {complaint.resolution && (
                  <p className="text-sm text-muted-foreground">
                    Résolution: {complaint.resolution}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ComplaintManagement;