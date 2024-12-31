import { Routes, Route } from "react-router-dom";
import { NewLeadsPage } from "@/components/installer/marketplace/NewLeadsPage";
import { CheckoutPage } from "@/pages/installer/payment/CheckoutPage";
import { NewCardPage } from "@/pages/installer/payment/NewCardPage";
import { TopUpPage } from "@/pages/installer/payment/TopUpPage";
import { ClientsPage } from "@/components/installer/clients/ClientsPage";
import { Index } from "@/pages/Index";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route 
        path="/espace-installateur/leads/nouveaux" 
        element={<NewLeadsPage />} 
      />
      <Route 
        path="/espace-installateur/paiement/checkout" 
        element={<CheckoutPage />} 
      />
      <Route 
        path="/espace-installateur/paiement/nouvelle-carte" 
        element={<NewCardPage />} 
      />
      <Route 
        path="/espace-installateur/paiement/recharge" 
        element={<TopUpPage />} 
      />
      <Route 
        path="/espace-installateur/clients" 
        element={<ClientsPage />} 
      />
    </Routes>
  );
};