"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Rak,
  getRak,
} from "@/services/rak";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function manageRak() {
  const router = useRouter();
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

  return (
    <div className="flex-1 max-h-full p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-500 mt-6 text-xl text-center font-semibold pb-1">
          Daftar Rak
        </h2>
        <div>
          <Link href="">
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
                      Kapasitas
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Kapasitas Sisa
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
                  {data?.map((item, i) => (
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
                        {item.kapasitas_sisa}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {item.status}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        <Link href={"/detail-rak-slot/" + item.idrak}>
                          <Button variant="link">Detail</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
