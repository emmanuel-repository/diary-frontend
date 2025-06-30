import { infoAlert, successAlert } from "@/components/custom/Swal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/core/interfaces/api.interface";
import { ContactFormData } from "@/core/interfaces/contactFormControl.inteface";
import { contactService } from "@/core/services/contact.service";
import { useApi } from "@/core/hooks/useApi";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileImageUpload from "@/components/custom/ProfileImageCustom";
import { buildContactFormData } from "@/core/lib/formDataBuilder";


export default function FormContact() {

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors }, getValues } = useForm<ContactFormData>({
    defaultValues: { emails: [], phones: [] }
  });
  const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
    control, name: 'emails'
  });
  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control, name: 'phones'
  });

  const { refetch } = useApi(
    () => {
      const values = getValues();
      const formData = buildContactFormData(values, profileImage);
      return contactService.saveContact(formData);
    },
    {
      onSuccess: () => {
        successAlert('Se creo un nuevo Contacto.');
        setTimeout(() => navigate('/list-contact'), 1000);
      },
      onError: (errors: ApiError) => {
        infoAlert('Error', errors.message);
      },
      autoFetch: false
    }
  )

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
                      size="lg"
                    />
                  </div>

                  {/* Columna 1: Datos personales */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label>Nombre:</Label>
                      <Input {...register('name', { required: true })} />
                      {errors.name && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label>Apellido paterno:</Label>
                      <Input {...register('fathers_surname', { required: true })} />
                      {errors.fathers_surname && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label>Apellido materno:</Label>
                      <Input {...register('mothers_surname', { required: true })} />
                      {errors.mothers_surname && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label>Fecha de nacimiento:</Label>
                      <Input type="date" {...register('birthdate', { required: true })} />
                      {errors.birthdate && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label>Alias:</Label>
                      <Input {...register('alias', { required: true })} />
                      {errors.alias && <span className="text-red-500 text-sm">Este campo es requerido</span>}
                    </div>
                  </div>

                  {/* Columna 2: Emails y teléfonos */}
                  <div className="flex flex-col space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Emails</h3>
                      <div className="space-y-2">
                        {emailFields.map((field, index) => (
                          <div key={field.id} className="flex gap-2 items-center">
                            <Input
                              {...register(`emails.${index}.email`, { required: true })}
                              placeholder={`Email #${index + 1}`}
                              className="flex-1"
                            />
                            <Button type="button" onClick={() => removeEmail(index)} className="bg-red-500">Eliminar</Button>
                          </div>
                        ))}
                      </div>
                      <Button type="button" onClick={() => appendEmail({ email: '' })} className="mt-2">
                        Agregar Email
                      </Button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Teléfonos</h3>
                      <div className="space-y-2">
                        {phoneFields.map((field, index) => (
                          <div key={field.id} className="flex gap-2 items-center">
                            <Input   {...register(`phones.${index}.number`, { required: true })}
                              placeholder={`Teléfono #${index + 1}`} className="flex-1" />
                            <Button type="button" onClick={() => removePhone(index)} className="bg-red-500">Eliminar</Button>
                          </div>
                        ))}
                      </div>
                      <Button type="button" onClick={() => appendPhone({ number: '' })} className="mt-2">
                        Agregar Teléfono
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Botón Enviar */}
                <div className="text-center">
                  <Button type="submit" className="px-6 py-2 bg-green-600 text-white rounded">Enviar</Button>
                </div>
              </form>
            </CardContent>

          </Card>
        </div>

      </div>
    </>
  )

}

