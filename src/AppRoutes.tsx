import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "@/pages/installer/dashboard/DashboardPage";
import { AccountPage } from "@/components/installer/account/AccountPage";
import { CheckoutPage } from "@/pages/installer/payment/CheckoutPage";
import { NewCardPage } from "@/pages/installer/payment/NewCardPage";
import { TopUpPage } from "@/pages/installer/payment/TopUpPage";
import { ClientsPage } from "@/components/installer/clients/ClientsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/espace-installateur/dashboard" element={<DashboardPage />} />
      <Route path="/espace-installateur/compte" element={<AccountPage />} />
      <Route path="/espace-installateur/paiement" element={<CheckoutPage />} />
      <Route path="/espace-installateur/nouvelle-carte" element={<NewCardPage />} />
      <Route path="/espace-installateur/recharge" element={<TopUpPage />} />
      <Route path="/espace-installateur/clients" element={<ClientsPage />} />
    </Routes>
  );
};