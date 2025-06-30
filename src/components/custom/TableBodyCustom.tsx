import { flexRender } from "@tanstack/react-table"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import React from "react";

interface TableBodyProps {
  table: any;
  columns: any;
}

export const TableBodyCustom: React.FC<TableBodyProps> = ({ table, columns }) => {

  return (
    <>

      <TableBody>

        {table.getRowModel().rows?.length ?

          (
            table?.getRowModel().rows.map((row: any) => (

              <TableRow key={row?.id} data-state={row?.getIsSelected() && "selected"}>

                {

                  row.getVisibleCells().map((cell: any) => (

                    <TableCell key={cell.id} className="text-center p-1 ">
                      {
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      }
                    </TableCell>

                  ))

                }

              </TableRow>

            ))
          )
          :
          (
            <TableRow>

              <TableCell colSpan={columns?.length} className="h-24 text-center">
                No hay resultado.
              </TableCell>

            </TableRow>
          )

        }


      </TableBody>
    </>
  )
}