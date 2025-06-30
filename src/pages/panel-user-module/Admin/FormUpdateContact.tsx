import ProfileImageUpload from "@/components/custom/ProfileImageCustom";
import { infoAlert, successAlert } from "@/components/custom/Swal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApi } from "@/core/hooks/useApi";
import { useDeleteEmail, useDeletePhone } from "@/core/hooks/useDelete";
import { ApiError } from "@/core/interfaces/api.interface";
import { ContactFormData } from "@/core/interfaces/contactFormControl.inteface";
import { buildContactFormData } from "@/core/lib/formDataBuilder";
import { contactService } from "@/core/services/contact.service";
import { useContactStore } from "@/core/stores/contact.store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function FormUpdateContact() {

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { contactData, setDataContact, updateContactInList } = useContactStore();
  const { refetch: deleteEmail } = useDeleteEmail();
  const { refetch: deletePhone } = useDeletePhone();
  const { register, handleSubmit, control, formState: { errors }, getValues } = useForm<ContactFormData>({ defaultValues: contactData });
  const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
    control, name: 'emails',
  });
  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control,
    name: 'phones',
  });
  const { refetch } = useApi(
    () => {
      const values = getValues();
      const formData = buildContactFormData(values, profileImage);
      return contactService.updateContact(contactData.id!, formData);
    },
    {
      autoFetch: false,
      onSuccess: (data) => {
        console.log('datos actualizados', data);
        updateContactInList(data);
        successAlert('Se actualizaron los datos con Exito.');
      },
      onError: (error: ApiError) => {
        infoAlert('Error', error.message,);
      }
    }
  );

  const handleDeleteEmail = (index: number) => {

    const email = getValues(`emails.${index}`);

    removeEmail(index);

    const updatedEmails = contactData.emails.filter((_, i) => i !== index);

    setDataContact({ ...contactData, emails: updatedEmails });

    if (email?.id != null) deleteEmail(email);
  }

  const handleDeletePhone = (index: number) => {

    const phones = getValues(`phones.${index}`);

    removePhone(index);

    const updatedEmails = contactData.phones.filter((_, i) => i !== index);

    setDataContact({ ...contactData, phones: updatedEmails });

    if (phones?.id != null) deletePhone(phones);
  }

  const handleImageChange = (file: File | null) => setProfileImage(file);

  const onSubmit = () => refetch();

  return (
    <>
      <div className="flex flex-row pt-20">

        <div className=" ml-4 flex-grow">
          <Card className="w-auto">

            <CardHeader>
              <div className="flex flex-row justify-center">
                <div className="text-5xl">Contacto</div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4 space-y-6">
                <div className="grid grid-cols-3 gap-x-3">

                  <div className="flex flex-col space-y-4">
                    <ProfileImageUpload onImageChange={handleImageChange}
                      initialImage={`${import.meta.env.VITE_URL_PROFILE_IMAGE}/${contactData.profile_image!}`}
                      size="lg"
                    />
                  </div>

                  {/* Columna izquierda: datos básicos */}
                  <div className="flex flex-col space-y-4">
                    <div>
                      <Label>Nombre</Label>
                      <Input {...register('name', { required: true })} />
                      {errors.name && <span className="text-red-500">Este campo es requerido</span>}
                    </div>
                    <div>
                      <Label>Apellido paterno</Label>
                      <Input {...register('fathers_surname', { required: true })} />
                    </div>
                    <div>
                      <Label>Apellido materno</Label>
                      <Input {...register('mothers_surname', { required: true })} />
                    </div>
                    <div>
                      <Label>Fecha de nacimiento</Label>
                      <Input type="date" {...register('birthdate', { required: true })} />
                    </div>
                    <div>
                      <Label>Alias</Label>
                      <Input {...register('alias', { required: true })} />
                    </div>
                  </div>

                  {/* Columna derecha: emails y teléfonos */}
                  <div className="flex flex-col space-y-6">
                    <div>
                      <h3 className="font-semibold">Emails</h3>

                      {emailFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center mb-2">

                          <Input {...register(`emails.${index}.email`, { required: true })} defaultValue={field.email} />

                          <Button type="button" onClick={() => handleDeleteEmail(index)} className="bg-red-500">
                            Eliminar
                          </Button>
                        </div>
                      ))}

                      <Button type="button" onClick={() => appendEmail({ email: '', id: null })} >
                        Agregar Email
                      </Button>

                    </div>

                    <div>
                      <h3 className="font-semibold">Teléfonos</h3>
                      {phoneFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center mb-2">

                          <Input  {...register(`phones.${index}.number`, { required: true })} defaultValue={field.number} />

                          <Button type="button" onClick={() => handleDeletePhone(index)} className="bg-red-500">
                            Eliminar
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        onClick={() => appendPhone({ number: '', id: null })}>
                        Agregar Teléfono
                      </Button>

                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button type="submit" className="px-6 py-2 bg-green-600 text-white rounded">
                    Guardar Cambios
                  </Button>
                </div>

              </form>
            </CardContent>

          </Card>
        </div>

      </div>
    </>
  );
}