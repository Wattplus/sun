import { useState } from "react"
import { Home, FileText, MessageSquare, Settings, Shield, MapPin, Phone, Mail, Users, Sun, Battery, TrendingUp, Leaf } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientNavbar } from "@/components/client/ClientNavbar"
import { ProjectStatus } from "@/components/client/dashboard/ProjectStatus"
import { InstallerRequests } from "@/components/client/dashboard/InstallerRequests"
import { DocumentsList } from "@/components/client/documents/DocumentsList"
import { MessagesList } from "@/components/client/messages/MessagesList"
import { ClientInfoForm } from "@/components/client/dashboard/ClientInfoForm"
import { ConsumptionChart } from "@/components/client/dashboard/ConsumptionChart"
import { SavingsEstimate } from "@/components/client/dashboard/SavingsEstimate"
import { NextSteps } from "@/components/client/dashboard/NextSteps"
import { Card } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"
import { ClientFAQ } from "@/components/client/faq/ClientFAQ"
import { InstallerDirectory } from "@/components/client/directory/InstallerDirectory"
import { PurchasedContactsList } from "@/components/client/dashboard/PurchasedContactsList"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [monthlyBill, setMonthlyBill] = useState<string>("")
  const [userInfo] = useState({
    name: "Jean Dupont",
    email: "j********@example.com",
    phone: "06 ** ** ** 89",
    projectStatus: "En cours d'étude",
    lastUpdate: "2024-03-20",
    installerRequests: [
      {
        id: 1,
        companyName: "Solar Pro",
        date: "2024-03-22",
        status: "pending"
      }
    ]
  })

  const getBreadcrumbText = () => {
    switch (activeTab) {
      case "dashboard":
        return "Tableau de bord"
      case "documents":
        return "Documents"
      case "messages":
        return "Messages"
      case "settings":
        return "Paramètres"
      case "directory":
        return "Annuaire"
      default:
        return ""
    }
  }

  const handleMonthlyBillUpdate = (value: string) => {
    setMonthlyBill(value)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <>
      <Helmet>
        <title>Espace Client - Suivi de Projet Photovoltaïque</title>
        <meta name="description" content="Accédez à votre espace client pour suivre l'avancement de votre projet d'installation solaire, consulter vos documents et communiquer avec votre installateur." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background-dark to-background-light">
        <ClientNavbar />
        
        <main className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/client">Espace Client</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span className="text-gray-400">{getBreadcrumbText()}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-8 glass-panel p-6 rounded-lg border border-white/10"
          >
            <motion.h1 variants={itemVariants} className="text-3xl font-bold gradient-text mb-2">
              Tableau de bord
            </motion.h1>
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-gray-300">Bienvenue, {userInfo.name}</p>
                <p className="text-sm text-gray-400">Dernière connexion : {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Card className="p-3 bg-green-500/10 text-green-400">
                  <Battery className="h-5 w-5" />
                </Card>
                <Card className="p-3 bg-yellow-500/10 text-yellow-400">
                  <Sun className="h-5 w-5" />
                </Card>
                <Card className="p-3 bg-blue-500/10 text-blue-400">
                  <TrendingUp className="h-5 w-5" />
                </Card>
                <Card className="p-3 bg-emerald-500/10 text-emerald-400">
                  <Leaf className="h-5 w-5" />
                </Card>
              </div>
            </motion.div>
          </motion.div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="glass-panel p-1">
              <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")} className="gap-2">
                <Home className="w-4 h-4" />
                Accueil
              </TabsTrigger>
              <TabsTrigger value="directory" onClick={() => setActiveTab("directory")} className="gap-2">
                <Users className="w-4 h-4" />
                Annuaire
              </TabsTrigger>
              <TabsTrigger value="documents" onClick={() => setActiveTab("documents")} className="gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="messages" onClick={() => setActiveTab("messages")} className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="settings" onClick={() => setActiveTab("settings")} className="gap-2">
                <Settings className="w-4 h-4" />
                Paramètres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <ClientInfoForm onMonthlyBillUpdate={handleMonthlyBillUpdate} />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <PurchasedContactsList />
                </motion.div>

                <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
                  <ProjectStatus 
                    status={userInfo.projectStatus}
                    lastUpdate={userInfo.lastUpdate}
                  />
                  <SavingsEstimate monthlyBill={monthlyBill} />
                </motion.div>

                <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
                  <ConsumptionChart />
                  <NextSteps />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <InstallerRequests
                    requests={userInfo.installerRequests}
                    onAccept={(id) => console.log('Accept request:', id)}
                    onReject={(id) => console.log('Reject request:', id)}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <ClientFAQ />
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="directory">
              <InstallerDirectory />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsList />
            </TabsContent>

            <TabsContent value="messages">
              <MessagesList />
            </TabsContent>

            <TabsContent value="settings">
              <Card className="glass-panel">
                <div className="p-6 space-y-6">
                  <h3 className="text-xl font-semibold gradient-text">Paramètres du compte</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300">Nom</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md bg-background-dark/50 border-gray-600 text-gray-200"
                        value={userInfo.name}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300">Email</label>
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-md bg-background-dark/50 border-gray-600 text-gray-200"
                        value={userInfo.email}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  )
}

export default ClientPortal;