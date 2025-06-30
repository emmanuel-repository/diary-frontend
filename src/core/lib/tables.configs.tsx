/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { ActionsTable } from '@/core/interfaces/actionsTable.interface';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { KeysTable } from '@/core/interfaces/keysTable.interface';
import { ColumnDef, RowData } from '@tanstack/react-table';

export function getColumns<T extends RowData>(columnsConfig: KeysTable[], actions: ActionsTable[] = []): ColumnDef<T>[] {

  const columns: ColumnDef<T>[] = columnsConfig.map((item) => {

    return {
      accessorKey: item.keyColumn,
      header: (column: any) => {

        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} 	>
            {item.description}
          </Button>
        );

      },
     
      cell: (row: any) => <div className="uppercase" > {row.getValue(item.keyColumn)} </div>,
    };

  });

  if (actions.length > 0) {
    columns.push(getColumnsAction(actions));
  }

  return columns;
}

function getColumnsAction<T extends RowData>(actions: ActionsTable[]): ColumnDef<T> {

  return {

    id: "actions",
    enableHiding: false,
    header: 'Acciones',
    cell: (row: any) => {

      return (
        <>
          <DropdownMenu >

            <DropdownMenuTrigger asChild>
              <Button size="lg" variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">

              <DropdownMenuGroup>

                {
                  actions.map((item: ActionsTable, index: number) => (
                    <DropdownMenuItem key={`${row.row.original.id || ""}-${index}`} onClick={() => { item.callbacks?.(row.row.original) }}>
                      <span> {item.description} </span>
                    </DropdownMenuItem>
                  ))
                }

              </DropdownMenuGroup>

            </DropdownMenuContent>

          </DropdownMenu >

        </>
      )
    }
  };
}