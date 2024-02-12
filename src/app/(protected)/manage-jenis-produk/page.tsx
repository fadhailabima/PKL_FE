"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  jenisProduk,
  getJenisProduk,
  deleteJenisProduk,
} from "@/services/produk";
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

export default function manageProduk() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [error, setError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [data, setData] = useState<jenisProduk[] | null>(null);

  const getData = async (token: string) => {
    const res = await getJenisProduk(token);
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

  const handleDeleteJenisProduk = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await deleteJenisProduk(token, id);
        if (res !== undefined) {
          getData(token);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setShowSuccessAlert(true);
    setError(false);
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  };

  const searchTermLower = searchTerm?.toLowerCase() || "";

  const filteredItems = data?.filter((item) =>
    item.jenisproduk?.toLowerCase().includes(searchTermLower)
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
          Daftar Jenis Produk
        </h2>
        <Input
          className="mt-6"
          style={{ width: "500px" }}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <div>
          <Link href="/tambah-jenis-produk">
            <Button className="mt-6">Tambah Jenis Produk</Button>
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
                      ID
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
                    >
                      Jenis Produk
                    </th>
                    <th
                      scope="col"
                      className="text-center py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase"
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
                        {item.id}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        {item.jenisproduk}
                      </td>
                      <td className="text-center py-4 text-sm text-gray-500 whitespace-nowrap">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant={"destructive"}>Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Apakah anda yakin ingin menghapus jenis produk ?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                              onClick={() =>
                                handleDeleteJenisProduk(item.id)
                              }
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
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4 mt-5" />
                <AlertTitle>Gagal hapus produk</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {showSuccessAlert && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Berhasil hapus produk</AlertTitle>
                <AlertDescription>Produk berhasil dihapus</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
