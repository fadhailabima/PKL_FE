"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Transaksi, getTransaksi, deleteTransaksi } from "@/services/transaksi";
import { Button } from "@/components/ui/button";
import { Count, getCount } from "@/services/admin";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [error, setError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [count, setCount] = useState<Count | null>(null);

  const getDetail = async (token: string) => {
    const res = await getCount(token);
    setCount(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      getDetail(token);
    }
  }, []);

  const [transaksi, saveData] = useState<Transaksi[] | null>(null);
  const ambilData = async (token: string) => {
    const res = await getTransaksi(token);
    saveData(res);
  };

  const handleDeleteTransaksi = async (receiptID: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await deleteTransaksi(token, receiptID);
        if (res !== undefined) {
          ambilData(token);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setShowSuccessAlert(true);
    setTimeout(() => {
      ambilData(localStorage.getItem("token")!);
    }, 100);
  };

  console.log(transaksi);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      ambilData(token);
    }
  }, []);
  const filteredItems = transaksi?.filter(
    (item) =>
      (item.produk.namaproduk
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        item.tanggal_transaksi.includes(searchTerm)) &&
      (filterTerm === "" || item.jenis_transaksi === filterTerm)
  );
  const totalPages = Math.ceil((filteredItems?.length ?? 0) / itemsPerPage);
  const currentItems = filteredItems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <main className="flex-1 max-h-full p-5">
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
        <h1 className="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Produk</span>
              <span className="text-lg font-semibold">
                {count?.jumlah_produk}
              </span>
            </div>
            <div className="p-8"></div>
          </div>
        </div>
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total User</span>
              <span className="text-lg font-semibold">
                {count?.jumlah_user}
              </span>
            </div>
            <div className="p-8"></div>
          </div>
        </div>
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Rak</span>
              <span className="text-lg font-semibold">{count?.jumlah_rak}</span>
            </div>
            <div className="p-8"></div>
          </div>
        </div>
        <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-gray-400">Total Transaksi</span>
              <span className="text-lg font-semibold">
                {count?.jumlah_transaksi}
              </span>
            </div>
            <div className="p-8"></div>
          </div>
        </div>
      </div>
      <h3 className="mt-6 text-xl">Transaksi</h3>
      <div className="flex justify-between items-center">
        <Input
          className="mt-2"
          style={{ width: "500px" }}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <select
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          className="border border-gray-300 rounded-lg shadow-sm focus:outline-none text-xs font-medium tracking-wider  text-gray-500 uppercase"
          style={{ width: "250px", height: "40px" }}
        >
          <option value="" disabled selected>
            Select transaction type
          </option>
          <option value="">All</option>
          <option value="masuk">Masuk</option>
          <option value="keluar">Keluar</option>
        </select>
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
                      ID Transaksi
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Nama Petugas
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Nama Produk
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Jumlah
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Kode Produksi
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Tanggal Expired
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Tanggal Transaksi
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Jenis Transaksi
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Detail
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems?.map((produk, i) => (
                    <tr
                      key={i}
                      className="transition-all hover:bg-gray-100 hover:shadow-lg"
                    >
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.receiptID}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.karyawan.nama}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.produk.namaproduk}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.jumlah}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.kode_produksi}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.tanggal_expired}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.tanggal_transaksi}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.jenis_transaksi}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        <Link href={"/transaksi-report/" + produk.receiptID}>
                          <Button variant="link">Detail</Button>
                        </Link>
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Apakah anda yakin ingin menghapus transaksi ?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                              onClick={() => handleDeleteTransaksi(produk.receiptID)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-2">
                <Button
                  className="m-2"
                  onClick={() =>
                    setCurrentPage((old) => Math.max(old - 1, 1, totalPages))
                  }
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
    </main>
  );
}
