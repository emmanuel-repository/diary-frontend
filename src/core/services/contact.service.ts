/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchWithAuth } from "@/core/lib/fetchWithAuth";

export const contactService = {
  
  async getAllContacts(): Promise<any> {
    return fetchWithAuth(`${import.meta.env.VITE_API}/user`, {
      method: "GET",
    });
  },

  async saveContact(user: FormData): Promise<any> {
    return fetchWithAuth(`${import.meta.env.VITE_API}/user`, {
      method: "POST",
      body: user,
    });
  },

   async updateContact(contactId: number, contact: FormData): Promise<any> {
    return fetchWithAuth(`${import.meta.env.VITE_API}/user/${contactId}`, {
      method: "PUT",
      body: contact,
    });
  },
  
  async deleteContact(contactId: number): Promise<any> {
    return fetchWithAuth(`${import.meta.env.VITE_API}/user/${contactId}`, {
      method: "DELETE",
    });
  },

  async deleteEmailContact(emailId: number): Promise<any> {
    return fetchWithAuth(`${import.meta.env.VITE_API}/user/email/${emailId}`, {
      method: "DELETE",
    });
  },

  async deletePhoneContact(emailId: number): Promise<any> {
    return fetchWithAuth(`${import.meta.env.VITE_API}/user/phone/${emailId}`, {
      method: "DELETE",
    });
  },
};