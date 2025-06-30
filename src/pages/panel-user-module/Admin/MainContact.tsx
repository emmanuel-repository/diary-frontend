/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { ListUser } from "./ListContact";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContactStore } from "@/core/stores/contact.store";
import { ContactFormData } from "@/core/interfaces/contactFormControl.inteface";
import { useDeleteContact } from "@/core/hooks/useDelete";
import { confirmationAlert } from "@/components/custom/Swal";


export default function MainContact() {

  const navigate = useNavigate();
  const { setDataContact, contactList, fetchContact } = useContactStore();

  const handleRedirectRegister = useCallback(() => navigate('/new-contact'), []);

  const handleRedirectUpdate = useCallback((contact: ContactFormData) => {
    setDataContact(contact);
    navigate(`/edit-contact`);
  }, []);

  const { refetch: deletContact } = useDeleteContact((deletedId) => {
    console.log(deletedId)
    fetchContact(contactList.filter((contact) => contact.id !== deletedId));
  })

  const handleDeleteContact = useCallback(async (contact: ContactFormData) => {
    const confirmed = await confirmationAlert("Se borrará el registro seleccionado, ¡No se podrá revertir!");

    if (confirmed.isConfirmed) {
      setDataContact(contact); // para que useApi tenga el `userData` correcto
      deletContact(contact); // llama al DELET
    }
  }, []);

  const listActions = useMemo<ActionsTable[]>(
    () => [
      { description: "Ver", callbacks: handleRedirectUpdate },
      { description: "Borrar Contacto", callbacks: handleDeleteContact }
    ],
    [handleRedirectUpdate, handleDeleteContact]
  );

  return (
    <>
      <div className="flex flex-row pt-20">

        <div className=" ml-4 flex-grow">
          <Card className="w-auto">

            <CardHeader>
              <div className="flex flex-row">
                <div className="basis-5/6 text-5xl">Contactos</div>
                <div className="basis-1/6">
                  <Button onClick={handleRedirectRegister}>Nuevo Contacto</Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <ListUser actions={listActions} />
            </CardContent>

          </Card>
        </div>

      </div>
    </>
  );

}