
import React from "react"
import { flexRender } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableHeaderCustomProps {
	table: any
}

export const TableHeaderCustom: React.FC<TableHeaderCustomProps> = ({ table }) => {

	return (
		<>
			<TableHeader>
				{
					table.getHeaderGroups().map((headerGroup: any) => (

						<TableRow key={headerGroup.id}>

							{
								headerGroup.headers.map((header: any) => {
									return (

										<TableHead key={header.id} className="text-center">
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>

									)
								})
							}

						</TableRow>

					))
				}
			</TableHeader>
		</>
	)

}