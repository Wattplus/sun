import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { DashboardPage } from "@/pages/installer/dashboard/DashboardPage";
import { AccountPage } from "@/components/installer/account/AccountPage";
import { CheckoutPage } from "@/pages/installer/payment/CheckoutPage";
import { NewCardPage } from "@/pages/installer/payment/NewCardPage";
import { TopUpPage } from "@/pages/installer/payment/TopUpPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/espace-installateur/dashboard" element={<DashboardPage />} />
      <Route path="/espace-installateur/compte" element={<AccountPage />} />
      <Route path="/espace-installateur/paiement" element={<CheckoutPage />} />
      <Route path="/espace-installateur/nouvelle-carte" element={<NewCardPage />} />
      <Route path="/espace-installateur/recharge" element={<TopUpPage />} />
    </Routes>
  );
};
