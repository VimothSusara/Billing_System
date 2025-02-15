import { useEffect, useState } from "react";
import useItemStore from "@/store/itemStore";
import DataTable from "react-data-table-component";
import formatDateString from "@/utils/formatDateString";

const ItemList = () => {
  const {
    limit,
    loading,
    items,
    totalCount,
    currentPage,
    setSelectedItem,
    setPage,
    fetchItems,
    setItems,
  } = useItemStore();

  useEffect(() => {
    fetchItems(currentPage, limit);
  }, [setPage, currentPage, setItems]);

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
    setSelectedItem(row);
  };

  const columns = [
    {
      name: "Code",
      selector: (row) => row.item_code,
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.item_name,
      center: true,
    },
    {
      name: "Buy",
      selector: (row) => row.buying_price,
      center: true,
    },
    {
      name: "Created",
      selector: (row) => formatDateString(row.createdAt),
      center: true,
    },
  ];

  const paginationComponentOptions = {
    noRowsPerPage: true,
  };

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: ".9rem",
      },
    },
    cells: {
      style: {
        fontSize: ".8rem",
        fontWeight: "bold",
        color: "#757575",
      },
    },
  };

  return (
    <>
      <div className="p-3 border-[1px] border-gray-300">
        <DataTable
          columns={columns}
          data={items}
          pagination
          paginationServer
          paginationPerPage={limit}
          paginationTotalRows={totalCount}
          onChangePage={(page) => setPage(page)}
          // paginationOptions={paginationOptions}
          onRowClicked={(row) => handleRowClick(row)}
          noDataText="No items found"
          // compact={true}
          dense
          striped={true}
          responsive={true}
          pointerOnHover={true}
          highlightOnHover={true}
          // progressPending={loading}
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader={true}
          fixedHeaderScrollHeight="500px"
          customStyles={customStyles}
        />
      </div>
    </>
  );
};

export default ItemList;
