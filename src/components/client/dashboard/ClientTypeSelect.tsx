import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClientTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const ClientTypeSelect = ({ value, onChange, error }: ClientTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-200">Type de client</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background-dark/50 border-gray-700">
          <SelectValue placeholder="Sélectionnez votre profil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="particulier">Particulier</SelectItem>
          <SelectItem value="professionnel">Professionnel</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};