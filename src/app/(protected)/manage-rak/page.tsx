"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Rak, getRak, changeStatusRak } from "@/services/rak";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function manageRak() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [status, setStatus] = useState<string>("Tersedia");
  const [data, setData] = useState<Rak[] | null>(null);

  const getData = async (token: string) => {
    const res = await getRak(token);
    setData(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      getData(token);
    }
  }, []);

  const handleChangeStatus = async (idrak: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await changeStatusRak(token, idrak, newStatus);
        if (res !== undefined) {
          getData(token);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      getData(localStorage.getItem("token")!);
    }, 100);
  };

  const filteredItems = data?.filter(
    (item) =>
      (item.idrak.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kapasitas_sisa.includes(searchTerm)) &&
      (filterTerm === "" || item.status === filterTerm)
  );
  const totalPages = Math.ceil((filteredItems?.length ?? 0) / itemsPerPage);
  const currentItems = filteredItems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 max-h-full p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-500 mt-6 text-xl text-center font-semibold pb-1">
          Daftar Rak
        </h2>
        <Input
          className="mt-6"
          style={{ width: "500px" }}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <select
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          className="mt-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-xs font-medium tracking-wider  text-gray-500 uppercase"
          style={{ width: "250px", height: "40px" }}
        >
          <option value="" disabled selected>
            Select Status
          </option>
          <option value="">All</option>
          <option value="Tersedia">Tersedia</option>
          <option value="Tidak Tersedia">Tidak Tersedia</option>
        </select>
        <div>
          <Link href="/tambah-rak">
            <Button className="mt-6">Tambah Rak</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
              <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      ID Rak
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Kapasitas (Kg)
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Detail Rak Slot
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems?.map((item, i) => (
                    <tr
                      key={i}
                      className="transition-all hover:bg-gray-100 hover:shadow-lg"
                    >
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {item.idrak}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {item.kapasitas}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        <Button
                          onClick={() => {
                            const newStatus =
                              item.status === "Tersedia"
                                ? "Tidak Tersedia"
                                : "Tersedia";
                            handleChangeStatus(item.idrak, newStatus);
                          }}
                          className={
                            item.status === "Tersedia"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }
                        >
                          {item.status}
                        </Button>
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {item.status === "Tidak Tersedia" ? (
                          <Button variant="link" disabled>
                            Detail
                          </Button>
                        ) : (
                          <Link href={"/detail-rak-slot/" + item.idrak}>
                            <Button variant="link">Detail</Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-2">
                <Button
                  className="m-2"
                  onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  className="m-2"
                  onClick={() =>
                    setCurrentPage((old) => Math.min(old + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
