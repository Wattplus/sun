import { Lead } from "@/types/crm";
import { LeadTable } from "./LeadTable";
import { LeadMobileTable } from "./LeadMobileTable";
import { LeadHeader } from "./LeadHeader";
import { LeadStats } from "./LeadStats";
import { AdminBreadcrumb } from "../AdminBreadcrumb";
import { LeadDialogs } from "./LeadDialogs";
import { getStatusColor, getStatusText } from "@/utils/leadStatus";
import { Card } from "@/components/ui/card";

interface LeadManagementContentProps {
  leads: Lead[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLead: Lead | null;
  editDialogOpen: boolean;
  assignDialogOpen: boolean;
  deleteDialogOpen: boolean;
  selectedInstallerId: string;
  leadToAssign: Lead | null;
  isMobile: boolean;
  handleEditClick: (lead: Lead) => void;
  handleAssignClick: (lead: Lead) => void;
  handleDeleteClick: (lead: Lead) => void;
  handleEditClose: () => void;
  handleSaveLead: (lead: Lead) => void;
  setAssignDialogOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  setSelectedInstallerId: (id: string) => void;
  handleAssignSubmit: (leadId: string, installerId: string) => void;
  handleConfirmDelete: () => void;
}

export const LeadManagementContent = ({
  leads,
  searchTerm,
  setSearchTerm,
  selectedLead,
  editDialogOpen,
  assignDialogOpen,
  deleteDialogOpen,
  selectedInstallerId,
  leadToAssign,
  isMobile,
  handleEditClick,
  handleAssignClick,
  handleDeleteClick,
  handleEditClose,
  handleSaveLead,
  setAssignDialogOpen,
  setDeleteDialogOpen,
  setSelectedInstallerId,
  handleAssignSubmit,
  handleConfirmDelete,
}: LeadManagementContentProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <AdminBreadcrumb />
        
        <div className="space-y-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Gestion des Leads
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez efficacement vos prospects et suivez leur progression
            </p>
          </div>

          <LeadStats leads={leads} />

          <Card className="overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm">
            <div className="p-6 space-y-6">
              <LeadHeader
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onExportClick={() => console.log("Exporting to CSV...")}
                onNewLeadClick={() => handleEditClick({} as Lead)}
              />

              <div className="rounded-md border border-primary/10 bg-background/50">
                {isMobile ? (
                  <LeadMobileTable
                    leads={leads}
                    onEditClick={handleEditClick}
                    onAssignClick={handleAssignClick}
                    onDeleteClick={handleDeleteClick}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                  />
                ) : (
                  <LeadTable
                    leads={leads}
                    onEditClick={handleEditClick}
                    onAssignClick={handleAssignClick}
                    onDeleteClick={handleDeleteClick}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                  />
                )}
              </div>
            </div>
          </Card>

          <LeadDialogs
            selectedLead={selectedLead}
            editDialogOpen={editDialogOpen}
            assignDialogOpen={assignDialogOpen}
            deleteDialogOpen={deleteDialogOpen}
            selectedInstallerId={selectedInstallerId}
            leadToAssign={leadToAssign}
            onEditClose={handleEditClose}
            onSaveLead={handleSaveLead}
            setAssignDialogOpen={setAssignDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
            setSelectedInstallerId={setSelectedInstallerId}
            handleAssignSubmit={() => leadToAssign && selectedInstallerId ? handleAssignSubmit(leadToAssign.id, selectedInstallerId) : undefined}
            handleConfirmDelete={handleConfirmDelete}
          />
        </div>
      </div>
    </div>
  );
};