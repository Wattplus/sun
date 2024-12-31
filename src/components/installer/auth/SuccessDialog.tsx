import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
}

export const SuccessDialog = ({ open, onOpenChange, email }: SuccessDialogProps) => {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compte créé avec succès !</DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
            <p>
              Votre compte a été créé avec succès. Voici vos identifiants de connexion :
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p><strong>Email :</strong> {email}</p>
              <p><strong>Mot de passe :</strong> Celui que vous avez choisi</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Conservez ces informations précieusement. Vous en aurez besoin pour vous connecter à votre espace installateur.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => navigate("/connexion-installateur")}
          >
            Aller à la page de connexion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}