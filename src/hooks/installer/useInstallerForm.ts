import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/components/ui/use-toast';
import { InstallerFormData, VisibilitySettings, Certifications, InstallationTypes } from '@/types/installer';

export const useInstallerForm = (initialData?: Partial<InstallerFormData>) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<InstallerFormData>({
    user_id: '',
    company_name: '',
    contact_name: '',
    phone: '',
    address: '',
    postal_code: '',
    city: '',
    service_area: [],
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    installation_types: {
      residential: false,
      commercial: false,
      industrial: false
    },
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
    } else if (category === 'installation_types') {
      setFormData(prev => ({
        ...prev,
        installation_types: {
          ...prev.installation_types,
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

      const { error } = await supabase
        .from('installers')
        .upsert({
          ...formData,
          user_id: session.session.user.id,
          certifications: formData.certifications as unknown as Certifications,
          installation_types: formData.installation_types as unknown as InstallationTypes,
          visibility_settings: formData.visibility_settings as unknown as VisibilitySettings,
        });

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