import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/components/ui/use-toast';
import type { InstallerFormData, DatabaseInstallerData } from '@/types/installer';

export const useInstallerForm = (initialData?: Partial<InstallerFormData>) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<InstallerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    siret: "",
    website: "",
    description: "",
    experience: "",
    panelBrands: "",
    inverterBrands: "",
    guaranteeYears: "",
    service_area: [],
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    installationTypes: {
      residential: false,
      commercial: false,
      industrial: false
    },
    maintenanceServices: false,
    address: "",
    postal_code: "",
    city: "",
    visibility_settings: {
      showPhoneNumber: true,
      highlightProfile: false,
      acceptDirectMessages: true,
      showCertifications: true
    },
    ...initialData
  });
  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const [category, field] = name.split('.');

    if (category === 'certifications') {
      setFormData(prev => ({
        ...prev,
        certifications: {
          ...prev.certifications,
          [field]: checked
        }
      }));
    } else if (category === 'installationTypes') {
      setFormData(prev => ({
        ...prev,
        installationTypes: {
          ...prev.installationTypes,
          [field]: checked
        }
      }));
    } else if (category === 'visibility_settings') {
      setFormData(prev => ({
        ...prev,
        visibility_settings: {
          ...prev.visibility_settings,
          [field]: checked
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: checked }));
    }
  };

  const handleZonesChange = (zones: string[]) => {
    setFormData(prev => ({ ...prev, service_area: zones }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error('No authenticated user');
      }

      const installerData: Partial<DatabaseInstallerData> = {
        user_id: session.session.user.id,
        contact_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        company_name: formData.company,
        website: formData.website,
        description: formData.description,
        experience_years: parseInt(formData.experience) || null,
        panel_brands: formData.panelBrands.split(',').map(brand => brand.trim()),
        inverter_brands: formData.inverterBrands.split(',').map(brand => brand.trim()),
        warranty_years: parseInt(formData.guaranteeYears) || null,
        service_area: formData.service_area,
        certifications: formData.certifications,
        installation_types: formData.installationTypes,
        maintenance_services: formData.maintenanceServices,
        visibility_settings: formData.visibility_settings,
        address: formData.address,
        postal_code: formData.postal_code,
        city: formData.city,
        siret: formData.siret
      };

      const { error } = await supabase
        .from('installers')
        .upsert(installerData);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Vos informations ont été mises à jour',
      });
    } catch (error) {
      console.error('Error updating installer:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la mise à jour',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleChange,
    handleCheckboxChange,
    handleZonesChange,
    handleSubmit,
  };
};