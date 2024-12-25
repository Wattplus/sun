import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RoofTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const RoofTypeSelect = ({ value, onChange, error }: RoofTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-200">Type de toit</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background-dark/50 border-gray-700">
          <SelectValue placeholder="Sélectionnez le type de toit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tuiles-plates">Tuiles plates</SelectItem>
          <SelectItem value="tuiles-mecaniques">Tuiles mécaniques</SelectItem>
          <SelectItem value="tuiles-romaines">Tuiles romaines</SelectItem>
          <SelectItem value="ardoises-naturelles">Ardoises naturelles</SelectItem>
          <SelectItem value="ardoises-fibrociment">Ardoises fibrociment</SelectItem>
          <SelectItem value="bac-acier">Bac acier</SelectItem>
          <SelectItem value="zinc">Zinc</SelectItem>
          <SelectItem value="tole-ondulee">Tôle ondulée</SelectItem>
          <SelectItem value="terrasse-beton">Terrasse béton</SelectItem>
          <SelectItem value="terrasse-graviers">Terrasse gravillonnée</SelectItem>
          <SelectItem value="shingle">Shingle</SelectItem>
          <SelectItem value="autre">Autre</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};