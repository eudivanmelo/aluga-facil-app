import React, { createContext, useContext, useState } from 'react';

export interface NewPropertyFormData {
  title: string;
  description: string;
  propertyType: string;
  price: string;
  paymentFrequency: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  photos: string[];
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  petsAllowed: string;
  furnished: string;
  tags: string[];
}

const INITIAL_FORM_DATA: NewPropertyFormData = {
  title: '',
  description: '',
  propertyType: '',
  price: '',
  paymentFrequency: '',
  street: '',
  number: '',
  neighborhood: '',
  complement: '',
  city: '',
  state: '',
  latitude: null,
  longitude: null,
  photos: [],
  bedrooms: 1,
  bathrooms: 1,
  parkingSpaces: 0,
  petsAllowed: '',
  furnished: '',
  tags: [],
};

interface NewPropertyContextValue {
  formData: NewPropertyFormData;
  updateFormData: (partial: Partial<NewPropertyFormData>) => void;
  resetFormData: () => void;
}

const NewPropertyContext = createContext<NewPropertyContextValue | undefined>(undefined);

export function NewPropertyProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<NewPropertyFormData>(INITIAL_FORM_DATA);

  const updateFormData = (partial: Partial<NewPropertyFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const resetFormData = () => setFormData(INITIAL_FORM_DATA);

  return (
    <NewPropertyContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </NewPropertyContext.Provider>
  );
}

export function useNewProperty() {
  const context = useContext(NewPropertyContext);
  if (!context) throw new Error('useNewProperty must be used within a NewPropertyProvider');
  return context;
}
