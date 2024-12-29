import { ClientTypeSelect } from "../ClientTypeSelect";
import { RoofTypeSelect } from "../RoofTypeSelect";
import { RoofOrientationSelect } from "../RoofOrientationSelect";
import { MonthlyBillInput } from "../MonthlyBillInput";
import { ElectricalTypeSelect } from "../ElectricalTypeSelect";
import { BudgetInput } from "../BudgetInput";

interface ProjectInfoFieldsProps {
  clientType: string;
  roofType: string;
  roofOrientation: string;
  monthlyBillEuros: string;
  electricalType: string;
  budget: string;
  onSelectChange: (value: string, field: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    clientType?: string;
    roofType?: string;
    roofOrientation?: string;
    monthlyBillEuros?: string;
    budget?: string;
  };
}

export const ProjectInfoFields = ({
  clientType,
  roofType,
  roofOrientation,
  monthlyBillEuros,
  electricalType,
  budget,
  onSelectChange,
  onChange,
  errors,
}: ProjectInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <ClientTypeSelect
          value={clientType}
          onChange={(value) => onSelectChange(value, "clientType")}
          error={errors.clientType}
        />
        <RoofTypeSelect
          value={roofType}
          onChange={(value) => onSelectChange(value, "roofType")}
          error={errors.roofType}
        />
      </div>

      <RoofOrientationSelect
        value={roofOrientation}
        onChange={(value) => onSelectChange(value, "roofOrientation")}
        error={errors.roofOrientation}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <MonthlyBillInput
          value={monthlyBillEuros}
          onChange={onChange}
          error={errors.monthlyBillEuros}
        />
        <ElectricalTypeSelect
          value={electricalType}
          onChange={(value) => onSelectChange(value, "electricalType")}
        />
      </div>

      <BudgetInput
        value={budget}
        onChange={onChange}
        error={errors.budget}
      />
    </div>
  );
};