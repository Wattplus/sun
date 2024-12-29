import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ClientTypeFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const ClientTypeForm = ({ value, onChange }: ClientTypeFormProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-base">Type de client</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="particulier" id="particulier" />
          <Label htmlFor="particulier">Particulier</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="professionnel" id="professionnel" />
          <Label htmlFor="professionnel">Professionnel</Label>
        </div>
      </RadioGroup>
    </div>
  );
};