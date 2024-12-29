import { Lead } from "@/types/crm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditLeadDialog } from "../EditLeadDialog";
import { mockInstallers } from "../InstallerManagement";

interface LeadDialogsProps {
  selectedLead: Lead | null;
  editDialogOpen: boolean;
  assignDialogOpen: boolean;
  deleteDialogOpen: boolean;
  selectedInstallerId: string;
  leadToAssign: Lead | null;
  onEditClose: () => void;
  onSaveLead: (lead: Lead) => void;
  setAssignDialogOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  setSelectedInstallerId: (id: string) => void;
  handleAssignSubmit: (leadId: string, installerId: string) => Promise<void>;
  handleConfirmDelete: () => void;
}

export const LeadDialogs = ({
  selectedLead,
  editDialogOpen,
  assignDialogOpen,
  deleteDialogOpen,
  selectedInstallerId,
  leadToAssign,
  onEditClose,
  onSaveLead,
  setAssignDialogOpen,
  setDeleteDialogOpen,
  setSelectedInstallerId,
  handleAssignSubmit,
  handleConfirmDelete,
}: LeadDialogsProps) => {
  return (
    <>
      <EditLeadDialog
        lead={selectedLead}
        open={editDialogOpen}
        onOpenChange={onEditClose}
        onSave={onSaveLead}
      />

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-md border-[#33C3F0]/20">
          <DialogHeader>
            <DialogTitle>Assigner le lead à un installateur</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedInstallerId} onValueChange={setSelectedInstallerId}>
              <SelectTrigger className="bg-background/50 border-[#33C3F0]/20">
                <SelectValue placeholder="Sélectionner un installateur" />
              </SelectTrigger>
              <SelectContent>
                {mockInstallers
                  .filter(installer => installer.status === "active")
                  .map(installer => (
                    <SelectItem key={installer.id} value={installer.id}>
                      {installer.companyName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAssignDialogOpen(false)}
              className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40"
            >
              Annuler
            </Button>
            <Button
              onClick={() => leadToAssign && selectedInstallerId ? handleAssignSubmit(leadToAssign.id, selectedInstallerId) : undefined}
              disabled={!selectedInstallerId}
              className="bg-[#1EAEDB] hover:bg-[#0FA0CE]"
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-md border-[#33C3F0]/20">
          <DialogHeader>
            <DialogTitle>Supprimer définitivement le lead</DialogTitle>
            <DialogDescription>
              Attention : Cette action est irréversible. Le lead sera définitivement supprimé de la base de données.
              Êtes-vous sûr de vouloir continuer ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-[#33C3F0]/20 hover:border-[#33C3F0]/40"
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};