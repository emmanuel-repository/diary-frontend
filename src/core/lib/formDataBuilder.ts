import { ContactFormData } from "@/core/interfaces/contactFormControl.inteface";


export function buildContactFormData(values: ContactFormData, profileImage: File | null): FormData {
  const formData = new FormData();

  ['name', 'fathers_surname', 'mothers_surname', 'birthdate', 'alias'].forEach((key) => {
    const value = values[key as keyof ContactFormData];
    if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  formData.append('emails', JSON.stringify(values.emails || []));
  formData.append('phones', JSON.stringify(values.phones || []));

  if (profileImage) {
    formData.append('profile_image', profileImage);
  }

  return formData;
}