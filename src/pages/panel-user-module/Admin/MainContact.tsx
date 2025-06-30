/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { ListUser } from "./ListContact";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContactStore } from "@/core/stores/contact.store";
import { ContactFormData } from "@/core/interfaces/contactFormControl.inteface";


export default function MainContact() {

  const navigate = useNavigate();
  const { setDataContact } = useContactStore();

  const handleRedirectRegister = useCallback(() => navigate('/new-contact'), []);

  const handleRedirectUpdate = useCallback((contact: ContactFormData) => {
    setDataContact(contact);
    navigate(`/edit-contact`);
  }, []);

  const listActions = useMemo<ActionsTable[]>(
    () => [{ description: "Ver", callbacks: handleRedirectUpdate }],
    [handleRedirectUpdate]
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