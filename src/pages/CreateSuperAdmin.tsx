import { createSuperAdmin } from "@/lib/supabase-client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const CreateSuperAdmin = () => {
  const navigate = useNavigate();

  const handleCreateSuperAdmin = async () => {
    try {
      const email = "mikael@wattplus.org";
      const password = "Hanna77026@";
      
      const { error, success } = await createSuperAdmin(email, password);
      
      if (error) {
        console.error('Error creating super admin:', error);
        toast.error("Erreur lors de la création du super admin");
        return;
      }

      if (success) {
        toast.success("Super admin créé avec succès");
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Une erreur est survenue");
    }
  };

  // Execute creation immediately when component mounts
  React.useEffect(() => {
    handleCreateSuperAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-light flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Création du Super Admin</h1>
        <p className="text-primary/80">Création en cours...</p>
      </div>
    </div>
  );
};