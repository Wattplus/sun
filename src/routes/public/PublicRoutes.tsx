import { Routes, Route } from "react-router-dom"
import Index from "@/pages/Index"
import Login from "@/pages/Login"
import { AboutUs } from "@/pages/AboutUs"
import { Blog } from "@/pages/Blog"
import { Contact } from "@/pages/Contact"
import { FAQ } from "@/pages/FAQ"
import { Financing } from "@/pages/Financing"
import { LegalNotice } from "@/pages/LegalNotice"
import { OurMission } from "@/pages/OurMission"
import { PrivacyPolicy } from "@/pages/PrivacyPolicy"
import { SolarInstallation } from "@/pages/SolarInstallation"
import { TermsOfService } from "@/pages/TermsOfService"

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/financing" element={<Financing />} />
      <Route path="/legal" element={<LegalNotice />} />
      <Route path="/mission" element={<OurMission />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/solar-installation" element={<SolarInstallation />} />
      <Route path="/terms" element={<TermsOfService />} />
    </Routes>
  )
}