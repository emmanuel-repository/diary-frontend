import { infoAlert, successAlert } from "@/components/custom/Swal";
import { Email } from "../interfaces/email.interface";
import { contactService } from "../services/contact.service";
import { useApi } from "./useApi";
import { ApiError } from "../interfaces/api.interface";
import { Phone } from "../interfaces/phone.interface";

export const useDeleteEmail = (onDeleted?: (id: number) => void) => {

  return useApi((email: Email) => contactService.deleteEmailContact(email.id!), {
    autoFetch: false,

    onSuccess: (data) => {
      console.log('Email eliminado correctamente');
      onDeleted?.(data.id);
      successAlert('Se quito Correo de sus registro')
    },

    onError: (error: ApiError) => {
      console.error('Error eliminando email:', error.message);
      infoAlert('Error', error.message)
    },
  });

};

export const useDeletePhone = (onDeleted?: (id: number) => void) => {

  return useApi((phone: Phone) => contactService.deletePhoneContact(phone.id!), {
    autoFetch: false,

    onSuccess: (data) => {
      console.log('Email eliminado correctamente');
      onDeleted?.(data.id);
      successAlert('Se quito el Numero de telefono de sus registro')
    },

    onError: (error: ApiError) => {
      console.error('Error eliminando phone:', error.message);
      infoAlert('Error', error.message)
    },
  });

};