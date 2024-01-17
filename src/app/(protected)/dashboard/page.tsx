"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Rak,
  RakSlot,
  getRak,
  showDetailRak,
  showRakSlotByID,
} from "@/services/rak";
import { Transaksi, getTransaksi } from "@/services/transaksi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<Rak[] | null>(null);
  const getData = async (token: string) => {
    const res = await getRak(token);
    setData(res);
  };
  const [selected, setSelected] = useState<Rak | null>(null);
  const getSelected = async (token: string, id: string) => {
    const res = await showDetailRak(token, id);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  const sizes = ["md"];

  const handleOpen = (size: any) => {
    setSize(size);
    onOpen();
  };

  const [choose, setChoose] = useState<RakSlot | null>(null);

  const chooseRak = async (
    token: string,
    id: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    try {
      const res = await showRakSlotByID(token, id);
      setChoose(res.data);
      router.push(`/detail-rak-slot/${id}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("ini id rak", choose);
  return (
    <main className="flex-1 max-h-full p-5">
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
        <h1 className="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((item, i) => (
          <div
            key={i}
            className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
          >
            {sizes.map((size) => (
              <div
                className="flex items-start justify-between"
                key={size}
                onClick={() => {
                  getSelected(localStorage.getItem("token")!, item.idrak);
                  handleOpen(size); // Panggil handleOpen
                  // router.push(`/rak/${item.idrak}`); // Navigasi ke halaman rak dengan ID yang dipilih
                }}
              >
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-400">Sisa Kapasitas Rak</span>
                  <span className="text-lg font-semibold">
                    {item.kapasitas_sisa}
                  </span>
                </div>
                <div className="p-10"></div>
              </div>
            ))}
            <Modal
              size={"2xl"}
              isOpen={isOpen}
              onClose={onClose}
              backdrop="blur"
            >
              <ModalContent className="bg-white divide-y divide-gray-200">
                {(onClose) => (
                  <>
                    <ModalHeader className="bg-slate-300 flex flex-col gap-1">
                      Detail Rak
                    </ModalHeader>
                    <ModalBody>
                      <Table aria-label="Example static collection table">
                        <TableHeader className="bg-gray-400">
                          <TableColumn className="bg-gray-400">
                            ID Rak
                          </TableColumn>
                          <TableColumn className="bg-gray-400">
                            Kapasitas Maksimal
                          </TableColumn>
                          <TableColumn className="bg-gray-400">
                            Sisa Kapasitas
                          </TableColumn>
                          <TableColumn className="bg-gray-400">
                            Status
                          </TableColumn>
                          <TableColumn className="bg-gray-400">
                            Detail Slot
                          </TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow key="1">
                            <TableCell>{selected?.idrak}</TableCell>
                            <TableCell>{selected?.kapasitas}</TableCell>
                            <TableCell>{selected?.kapasitas_sisa}</TableCell>
                            <TableCell>{selected?.status}</TableCell>
                            <TableCell>
                              <Button
                                onClick={(e) =>
                                  chooseRak(
                                    localStorage.getItem("token")!,
                                    selected?.idrak ?? '',
                                    e
                                  )
                                }
                              >
                                Detail
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ModalBody>
                    <ModalFooter className="bg-slate-300"></ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
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
