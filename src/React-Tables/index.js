import Table from "./TableContainer";
import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";

const ReactTable = () => {
  //Fetch function
  const getProducts = async () => {
    const res = await fetch("http://localhost:7000/products");
    return res.json();
  };

  // Using the hook
  const { data, error, isLoading } = useQuery("Products", getProducts);

  const columns = useMemo(
    () => [
      {
        Header: "Products",
        columns: [
          { Header: "Product", accessor: "name" },
          { Header: "Brand", accessor: "brand" },
          { Header: "Price", accessor: "price" },
          { Header: "Category", accessor: "category" },
          { Header: "Weight", accessor: "weight" },
          {
            Header: "Description",
            accessor: "description",
          },
        ],
      },
    ],
    []
  );

  // Error and Loading states
  if (isLoading) {
    return <div className="mt-6 text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="mt-6 text-2xl">Error fetching data</div>;
  }

  return (
    <section className="bg-white dark:bg-gray-900 overflow-hidden  ">
      <h1 className="text-center text-2xl font-semibold mt-5">
        React Table Demo
      </h1>
      <Table columns={columns} data={data} />
    </section>
  );
};

export default ReactTable;
