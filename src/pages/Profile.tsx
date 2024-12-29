import { useAuthRedirect } from "@/hooks/use-auth-redirect";

export const Profile = () => {
  useAuthRedirect();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Your profile information will appear here.</p>
    </div>
  );
};