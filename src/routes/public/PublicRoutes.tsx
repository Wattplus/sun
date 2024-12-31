import { Routes, Route } from "react-router-dom"
import { Index } from "@/pages/Index"
import { AboutUs } from "@/pages/AboutUs"
import { OurMission } from "@/pages/OurMission"
import { Blog } from "@/pages/Blog"
import { SolarInstallation } from "@/pages/SolarInstallation"
import { Maintenance } from "@/pages/Maintenance"
import { Financing } from "@/pages/Financing"
import { FAQ } from "@/pages/FAQ"
import { Pricing } from "@/pages/Pricing"
import Login from "@/pages/Login"
import { InstallerProfile } from "@/pages/InstallerProfile"
import { LegalNotice } from "@/pages/LegalNotice"
import { PrivacyPolicy } from "@/pages/PrivacyPolicy"
import { TermsOfService } from "@/pages/TermsOfService"

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/qui-sommes-nous" element={<AboutUs />} />
      <Route path="/notre-mission" element={<OurMission />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/installation-solaire" element={<SolarInstallation />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/financement" element={<Financing />} />
      <Route path="/devenir-installateur" element={<InstallerProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tarifs" element={<Pricing />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/mentions-legales" element={<LegalNotice />} />
      <Route path="/confidentialite" element={<PrivacyPolicy />} />
      <Route path="/cgv" element={<TermsOfService />} />
    </Routes>
  )
}