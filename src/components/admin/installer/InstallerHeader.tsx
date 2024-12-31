import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UserPlus, Key } from "lucide-react"
import { ChangePasswordDialog } from "./ChangePasswordDialog"
import { useState } from "react"

interface InstallerHeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onNewInstaller: () => void
}

export const InstallerHeader = ({ searchTerm, onSearchChange, onNewInstaller }: InstallerHeaderProps) => {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Gestion des installateurs
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full sm:w-[300px] bg-background border-primary/20"
          />
        </div>

        <Button
          onClick={() => setPasswordDialogOpen(true)}
          variant="outline"
          className="border-primary/20 hover:border-primary/40 hover:bg-primary/10"
        >
          <Key className="h-4 w-4 mr-2 text-primary" />
          Changer mot de passe
        </Button>

        <Button
          onClick={onNewInstaller}
          className="bg-primary hover:bg-primary-dark text-white gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Nouvel installateur
        </Button>
      </div>

      <ChangePasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
      />
    </div>
  )
}