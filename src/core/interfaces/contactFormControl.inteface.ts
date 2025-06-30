import { Email } from "./email.interface";
import { Phone } from "./phone.interface";

export interface ContactFormData {
  id?: number | null
  name: string;
  fathers_surname: string;
  mothers_surname: string;
  birthdate: string;
  alias: string;
  profile_image: string | null;
  emails: Email[];
  phones: Phone[];
};