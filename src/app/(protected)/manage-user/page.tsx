"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, getUser, deleteUser, changeStatus } from "@/services/admin";
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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function manageUser() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [status, setStatus] = useState<string>("Aktif"); // initial status

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

  const handleDeleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await deleteUser(token, id);
        if (res !== undefined) {
          getData(token);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setShowSuccessAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleChangeStatus = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await changeStatus(token, id, newStatus);
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
      (item.admin?.nama.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item.karyawan?.nama
          .toLowerCase()
          .includes(searchTerm?.toLowerCase())) &&
      (filterTerm === "" || item.level === filterTerm)
  );
  const totalPages = Math.ceil((filteredItems?.length ?? 0) / itemsPerPage);
  const currentItems = filteredItems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("currentItems", currentItems);

  return (
    <div className="flex-1 max-h-full p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-500 mt-6 text-xl text-center font-semibold pb-1">
          Daftar User
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
            Select Level
          </option>
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="karyawan">Petugas</option>
        </select>
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
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Action
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
                            <Button
                              onClick={() => {
                                const newStatus =
                                  item.admin.status === "Aktif"
                                    ? "NON AKTIF"
                                    : "Aktif";
                                handleChangeStatus(item.id, newStatus);
                              }}
                            >
                              {item.admin.status}
                            </Button>
                          </td>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant={"destructive"}>Delete</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Apakah anda yakin ingin menghapus user ?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUser(item.id)}
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
                            <Button
                              onClick={() => {
                                const newStatus =
                                  item.karyawan.status === "Aktif"
                                    ? "NON AKTIF"
                                    : "Aktif";
                                setStatus(newStatus); // toggle status first
                                handleChangeStatus(item.id, newStatus);
                              }}
                            >
                              {item.karyawan.status}
                            </Button>
                          </td>
                          <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant={"destructive"}>Delete</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Apakah anda yakin ingin menghapus user ?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUser(item.id)}
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Gagal Sign Up</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {showSuccessAlert && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Sign Up Successful</AlertTitle>
                  <AlertDescription>
                    Your account has been created successfully.
                  </AlertDescription>
                </Alert>
              )}

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
