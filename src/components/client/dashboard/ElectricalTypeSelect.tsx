import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ElectricalTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const ElectricalTypeSelect = ({ value, onChange }: ElectricalTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-200">Type d'installation électrique</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background-dark/50 border-gray-700">
          <SelectValue placeholder="Sélectionnez le type d'installation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="monophase">Monophasé</SelectItem>
          <SelectItem value="triphase">Triphasé</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};