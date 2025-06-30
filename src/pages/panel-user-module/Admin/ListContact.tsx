import { TableHeaderCustom } from "@/components/custom/TableHeaderCustom";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { KeysTable } from "@/core/interfaces/keysTable.interface";
import { useApi } from "@/core/hooks/useApi";
import { getColumns } from "@/core/lib/tables.configs";
import { Table } from "@/components/ui/table";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import { PaginationTableCustom } from "@/components/custom/PaginationTableCustom";
import { contactService } from "@/core/services/contact.service";
import { useContactStore } from "@/core/stores/contact.store";

interface ListCarsProps {
  actions: ActionsTable[];
}

export const ListUser: React.FC<ListCarsProps> = ({ actions }) => {

  const { contactList, fetchContact } = useContactStore();
  const { data: fetchedContactList, error } = useApi(contactService.getAllContacts);

  const keysColumns = useMemo<KeysTable[]>(() => [
    { keyColumn: "id", description: "ID" },
    { keyColumn: "alias", description: "Alias" },
    { keyColumn: "name", description: "Nombre" },
    { keyColumn: "fathers_surname", description: "Apellido Paterno" },
    { keyColumn: "mothers_surname", description: "Apellido Materno" },
    { keyColumn: "birthdate", description: "Cumpleaños" },
  ], []);

  const columns = useMemo(() => getColumns(keysColumns, actions), [actions, keysColumns]);

  useEffect(() => {
    if (fetchedContactList) {
      fetchContact(fetchedContactList);
    } else if (error) {
      fetchContact([]);
    }
  }, [fetchContact, error, fetchedContactList]);

  const table = useReactTable({
    data: contactList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <Table>
        <TableHeaderCustom table={table} />
        <TableBodyCustom table={table} columns={columns} />
      </Table>
      <div className="pt-8">
        <PaginationTableCustom table={table} />
      </div>
    </>
  )

}