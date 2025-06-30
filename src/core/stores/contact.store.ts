import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ContactFormData } from '../interfaces/contactFormControl.inteface';

interface ContactStore {
  contactList: ContactFormData[],
  contactData: ContactFormData,
  setDataContact: (contact: ContactFormData) => void;
  fetchContact: (contact: ContactFormData[]) => void;
  updateContactInList: (updatedContact: ContactFormData) => void;
}

export const useContactStore = create<ContactStore>()(
  persist(
    (set) => ({
      contactList: [],
      contactData: {
        id: null,
        name: "",
        fathers_surname: "",
        mothers_surname: "",
        birthdate: "",
        alias: "",
        profile_image: null,
        emails: [],
        phones: []
      },
      fetchContact: (contacts) => set({ contactList: contacts }),
      setDataContact: (contact) => set({ contactData: contact }),

      updateContactInList: (updatedContact: ContactFormData) => set((state) => ({
        contactData: updatedContact,
        contactList: state.contactList.map(contact =>
          contact.id === updatedContact.id ? updatedContact : contact
        )
      }))
    }),
    {
      name: 'contact-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);