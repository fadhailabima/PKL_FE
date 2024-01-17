"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RakSlot, getRakSlot, showRakSlotByID } from "@/services/rak";
import { Button } from "@/components/ui/button";

export default function DetailRakSlot() {
  const router = useRouter();
  const [data, setData] = useState<RakSlot[] | null>(null);
  const getData = async (token: string) => {
    const res = await getRakSlot(token);
    setData(res);
  };
  const [selected, setSelected] = useState<RakSlot | null>(null);
  console.log(selected);
  console.log(data);
  const getSelected = async (token: string, id: string) => {
    const res = await showRakSlotByID(token, id);
    console.log(res.data);
    setSelected(res.data);
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

  return (
    <div className="flex-1 max-h-full p-5">
      <h3 className="mt-6 text-xl text-center">Detail Rak Slot</h3>
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
                  {/* {selected && ( */}
                  <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                    <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                      {selected?.id_rakslot}
                    </td>
                    <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                      {selected?.Xcoordinate}
                    </td>
                    <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                      {selected?.Ycoordinate}
                    </td>
                    <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                      {selected?.Zcoordinate}
                    </td>
                    <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                      {selected?.status}
                    </td>
                  </tr>
                  {/* )} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
