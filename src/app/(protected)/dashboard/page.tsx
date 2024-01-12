"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Rak, getRak } from "@/services/rak";
import { Transaksi, getTransaksi } from "@/services/transaksi";

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<Rak[] | null>(null);
  const getData = async (token: string) => {
    const res = await getRak(token);
    setData(res);
  };

  console.log(data);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      getData(token);
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
      {/* Main content header */}
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
        <h1 className="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>
      </div>

      {/* Start Content */}
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((item, i) => (
          <div
            key={i}
            className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-gray-400">Sisa Kapasitas Rak</span>
                <span className="text-lg font-semibold">
                  {item.kapasitas_sisa}
                </span>
              </div>
              <div className="p-10"></div>
            </div>
            <div>
              <span>{item.idrak}</span>
            </div>
          </div>
        ))}
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
