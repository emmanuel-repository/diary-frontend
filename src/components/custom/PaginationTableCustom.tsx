import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import React from "react";

interface PaginationTableCustomProps {
  table: any
}

export const PaginationTableCustom: React.FC<PaginationTableCustomProps> = ({ table }) => {

  return (
    <>
      <div className="flex items-center justify-between px-2">

        <div className="flex-1 text-sm text-muted-foreground mr-2">  
          {table.getFilteredRowModel().rows.length} Fila(s).
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">

          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Filas por Pagina</p>

            <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value) => { table.setPageSize(Number(value)) }}   >

              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>

              <SelectContent side="top">
                {
                  [10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))
                }
              </SelectContent>

            </Select>

          </div>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Pagina {table.getState().pagination.pageIndex + 1} de{" "}  {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">

            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}  >
              <span className="sr-only">Go to first page</span>
              <FontAwesomeIcon icon={faAnglesLeft}/>
            </Button>

            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}  >
              <span className="sr-only">Go to previous page</span>
              <FontAwesomeIcon icon={faChevronLeft}/>
            </Button>

            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}  >
              <span className="sr-only">Go to next page</span>
              <FontAwesomeIcon icon={faChevronRight}/>
            </Button>

            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}  >
              <span className="sr-only">Go to last page</span>
              <FontAwesomeIcon icon={faAnglesRight}/>
            </Button>

          </div>
        </div>
      </div>
    </>
  );

}


