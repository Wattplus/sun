import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProjectTypeSelect = ({ value, onChange }: ProjectTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-200">Type de projet</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background-dark/50 border-gray-700">
          <SelectValue placeholder="Sélectionnez le type de projet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Installation Panneaux Solaires">Installation Panneaux Solaires</SelectItem>
          <SelectItem value="Rénovation">Rénovation</SelectItem>
          <SelectItem value="Extension">Extension</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};