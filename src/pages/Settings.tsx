import { useAuthRedirect } from "@/hooks/use-auth-redirect";

export const Settings = () => {
  useAuthRedirect();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Your settings will appear here.</p>
    </div>
  );
};