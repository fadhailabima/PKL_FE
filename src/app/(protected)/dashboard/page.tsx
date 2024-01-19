"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Transaksi, getTransaksi } from "@/services/transaksi";
import { Button } from "@/components/ui/button";
import { Count, getCount } from "@/services/admin";

export default function Dashboard() {
  const router = useRouter();

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

  console.log(transaksi);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      ambilData(token);
    }
  }, []);
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
              <span className="text-lg font-semibold">
                {count?.jumlah_rak}
              </span>
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
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Jumlah
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transaksi?.map((produk, i) => (
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
                        {produk.jumlah}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.tanggal_transaksi}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {produk.jenis_transaksi}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        <Button variant="link">Detail</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
