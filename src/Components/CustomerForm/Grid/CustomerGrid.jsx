import React, { memo, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";

const CustomerDataGrid = ({ showSummary, deliveryData, columns, paginationModel, setPaginationModel, pageSizeOptions, isWide, setSelectedRowsData }) => {
	const handleRowSelection = useCallback((rowSelectionModel) => {
		if (!rowSelectionModel) return;
		let selectedData = [];
		if (rowSelectionModel.type === "exclude") {
			selectedData = deliveryData;
		} else if (rowSelectionModel.type === "include") {
			selectedData = deliveryData.filter((row) =>
				rowSelectionModel.ids.has(row.id)
			);
		}
		setSelectedRowsData(selectedData);
	}, [deliveryData, setSelectedRowsData]);

	return (
		<DataGrid
			getRowId={(row) => row.id}
			rows={deliveryData}
			columns={columns.map((col) => ({ ...col, flex: isWide ? 1 : undefined, }))}
			columnAutoWidth={true}
			pageSize={paginationModel.pageSize}
			onPageSizeChange={(newPageSize) => setPaginationModel({ ...paginationModel, pageSize: newPageSize })}
			paginationModel={paginationModel}
			onPaginationModelChange={setPaginationModel}
			pageSizeOptions={pageSizeOptions}
			sortModel={paginationModel.sortModel}
			onSortModelChange={(model) => setPaginationModel({ ...paginationModel, sortModel: model })}
			disableSelectionOnClick
			rowHeight={50}
			loading={false}
			disableColumnMenu={true}
			checkboxSelection={true}
			onRowSelectionModelChange={handleRowSelection}
			density="standard"
			sx={{
				height: `calc(100vh - ${showSummary ? "300px" : "169px"})`,
				transform: "translateY(-10px)",
				transition: "transform 0.3s ease",
				boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
				'& .MuiDataGrid-columnHeaderTitle': {
					fontWeight: 'bold',
				},
				"& .MuiDataGrid-row": {
					alignItems: "center",
					height: '45px !important',
					minHeight: '45px !important',
				},
				"& .MuiDataGrid-cell": {
					fontSize: "13px",
					display: "flex",
					alignItems: "center",
				},
				"& .MuiTablePagination-root": {
					overflow: "visible",
				},
				"& .MuiDataGrid-toolbarContainer": {
					padding: "8px 16px",
					backgroundColor: "#fff",
					borderBottom: "1px solid #f0f0f0",
				},
				"& .MuiTablePagination-root": {
					overflow: "visible",
				},
				"& .MuiDataGrid-toolbarContainer": {
					padding: "8px 16px",
					backgroundColor: "#fff",
					borderBottom: "1px solid #f0f0f0",
				},
				"& .MuiTablePagination-root": {
					fontSize: "0.85rem",
					textAlign: "center",
				},
				"& .MuiTablePagination-toolbar": {
					minHeight: "auto",
					padding: 0,
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
				},
				"& .MuiTablePagination-spacer": {
					display: "none",
				},
				"& .MuiTablePagination-selectLabel": {
					margin: "0 8px 0 0",
					fontSize: "0.8rem",
				},
				"& .MuiTablePagination-select": {
					fontSize: "0.8rem",
					padding: "2px 8px",
				},
				"& .MuiTablePagination-displayedRows": {
					fontSize: "0.8rem",
					margin: "0 8px",
				},
				"& .MuiTablePagination-actions": {
					"& .MuiIconButton-root": {
						padding: "6px",
						color: "#555",
					},
					"& .Mui-disabled": {
						opacity: 0.3,
					},
				},
			}}
		/>
	);
};

export default memo(CustomerDataGrid);

