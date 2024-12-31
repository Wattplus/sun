import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  lightMode?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  lightMode,
  required,
  disabled,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={lightMode ? "text-white" : ""}>
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`${error ? "border-red-500" : ""} ${
          lightMode 
            ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white" 
            : ""
        }`}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {error && <p className="text-red-300 text-sm">{error}</p>}
    </div>
  );
};