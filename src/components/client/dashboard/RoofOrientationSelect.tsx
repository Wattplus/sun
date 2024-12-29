import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RoofOrientationSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const RoofOrientationSelect = ({ value, onChange, error }: RoofOrientationSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-200">Orientation du toit</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background-dark/50 border-gray-700">
          <SelectValue placeholder="Sélectionnez l'orientation du toit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sud">Sud</SelectItem>
          <SelectItem value="sud-est">Sud-Est</SelectItem>
          <SelectItem value="sud-ouest">Sud-Ouest</SelectItem>
          <SelectItem value="est">Est</SelectItem>
          <SelectItem value="ouest">Ouest</SelectItem>
          <SelectItem value="nord">Nord</SelectItem>
          <SelectItem value="nord-est">Nord-Est</SelectItem>
          <SelectItem value="nord-ouest">Nord-Ouest</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};