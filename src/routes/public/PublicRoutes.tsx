import { Routes, Route } from "react-router-dom"
import { Index } from "@/pages/Index"
import { AboutUs } from "@/pages/AboutUs"
import { Contact } from "@/pages/Contact"
import { Blog } from "@/pages/Blog"
import { OurMission } from "@/pages/OurMission"
import { SolarInstallation } from "@/pages/SolarInstallation"
import { Financing } from "@/pages/Financing"
import { FAQ } from "@/pages/FAQ"
import { Pricing } from "@/pages/Pricing"
import Login from "@/pages/Login"
import { InstallerProfile } from "@/pages/InstallerProfile"
import { LegalNotice } from "@/pages/LegalNotice"
import { PrivacyPolicy } from "@/pages/PrivacyPolicy"
import { TermsOfService } from "@/pages/TermsOfService"
import { ThankYou } from "@/pages/ThankYou"
import { Maintenance } from "@/pages/Maintenance"

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/qui-sommes-nous" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/notre-mission" element={<OurMission />} />
      <Route path="/installation-solaire" element={<SolarInstallation />} />
      <Route path="/financement" element={<Financing />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/tarifs" element={<Pricing />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/installateur/:id" element={<InstallerProfile />} />
      <Route path="/mentions-legales" element={<LegalNotice />} />
      <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
      <Route path="/conditions-generales" element={<TermsOfService />} />
      <Route path="/merci" element={<ThankYou />} />
      <Route path="/maintenance" element={<Maintenance />} />
    </Routes>
  )
}