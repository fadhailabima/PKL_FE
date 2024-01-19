"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, getUser } from "@/services/admin";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function manageUser() {
  const router = useRouter();
  const [data, setData] = useState<User[] | null>(null);

  const getData = async (token: string) => {
    const res = await getUser(token);
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
          Daftar User
        </h2>
        <div>
          <Link href="/tambah-user">
            <Button className="mt-6">Tambah User</Button>
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
                      ID User
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Level
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      No. Handphone
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Status
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
                        {item.username}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {item.level}
                      </td>
                      {item.admin && (
                        <>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.admin.nama}
                          </td>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.admin.email}
                          </td>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.admin.handphone}
                          </td>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.admin.status}
                          </td>
                        </>
                      )}
                      {item.karyawan && (
                        <>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.karyawan.nama}
                          </td>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.karyawan.email}
                          </td>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.karyawan.handphone}
                          </td>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            {item.karyawan.status}
                          </td>
                        </>
                      )}
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
