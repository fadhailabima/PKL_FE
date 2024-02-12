"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  getTransaksiReport,
  transaksiKeluar,
  TransactionData,
} from "@/services/transaksi";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function tambahRak() {
  const [nama_produk, setProduk] = useState(""); // assuming it's a number
  const [jumlah, setJumlah] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [transaksi, setTransaksi] = useState<{ namaproduk: string }[] | null>(
    null
  );
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);

  const getTransaksi = async (token: string) => {
    const res = await getTransaksiReport(token);
    setTransaksi(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      getTransaksi(token);
    }
  }, []);

  const handleAddTransaksi = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // get the token from local storage
      if (!token) {
        throw new Error("No token found");
      }
      const response = await transaksiKeluar(token, nama_produk, jumlah);
      if (response) {
        console.log("Successfully added Transaksi");
        setTransactionData(response.data); // Simpan data transaksi ke dalam state

        console.log(response.data);
        printTransaksiKeluar(response.data as TransactionData);
        router.push("/transaksi-keluar");
      }
    } catch (error: any) {
      setError(error.message);
    }

    setShowSuccessAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const printTransaksiKeluar = (transactionData: TransactionData | null) => {
    const doc = new jsPDF();

    autoTable(doc, {
      body: [
        [
          {
            content: "Saprotan Utama Nusantara",
            styles: {
              halign: "left",
              fontSize: 15,
              textColor: [0, 128, 0],
            },
          },
          {
            content: "Transaksi Keluar",
            styles: {
              halign: "right",
              fontSize: 15,
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              "Tanggal Cetak : " +
              new Date().getDate().toString().padStart(2, "0") +
              " " +
              [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ][new Date().getMonth()] +
              " " +
              new Date().getFullYear() +
              " " +
              new Date().getHours().toString().padStart(2, "0") +
              ":" +
              new Date().getMinutes().toString().padStart(2, "0") +
              ":" +
              new Date().getSeconds().toString().padStart(2, "0"),
            styles: {
              halign: "left",
            },
          },
        ],
      ],
      theme: "plain",
    });
    autoTable(doc, {
      body: [
        [
          {
            content:
              "ID Transaksi: " +
              transactionData?.transaction.receiptID +
              "\nKode Produksi: " +
              transactionData?.transaction.kode_produksi +
              "\nNama Produk: " +
              transactionData?.transaction.produk.namaproduk +
              "\nNama Petugas: " +
              transactionData?.transaction.karyawan.nama +
              "\nJumlah: " +
              transactionData?.transaction.jumlah +
              "\nTanggal Transaksi: " +
              transactionData?.transaction.tanggal_transaksi +
              "\nTanggal Expired: " +
              transactionData?.transaction.tanggal_expired,
            styles: {
              halign: "left",
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Laporan Transaksi",
            styles: {
              halign: "left",
              fontSize: 14,
            },
          },
        ],
      ],
      theme: "plain",
    });

    autoTable(doc, {
      head: [["Lokasi Rak", "Rak Slot", "Jumlah"]],
      body: transactionData?.transaction.transaksi_reports
        ? transactionData.transaction.transaksi_reports.map((report) => [
            report.id_rak,
            report.id_rakslot,
            report.jumlah || [],
          ])
        : [],
      theme: "striped",
      headStyles: {
        fillColor: "#343a40",
      },
    });

    doc.save("LaporanTransaksiKeluar.pdf");
  };

  return (
    <div className="h-250 py-2 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-gray-500 mt-2 text-xl text-center font-semibold pb-1">
              Transaksi Keluar
            </h2>
            <div>
              <Link href="/dashboard-karyawan">
                <Button className="mt-6">Back</Button>
              </Link>
            </div>
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Nama Produk
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`w-56 mt-2 mb-2 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans ${nama_produk}`}
                >
                  {nama_produk || "Select a product"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Pilih Nama Produk</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={nama_produk}
                  onValueChange={setProduk}
                >
                  {transaksi?.map((item, index) => (
                    <DropdownMenuRadioItem key={index} value={item.namaproduk}>
                      {item.namaproduk}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <label className="text-gray-800 font-semibold block my-3 text-md">
              Jumlah
            </label>
            <Input
              onChange={(e) => setJumlah(e.target.value)}
              placeholder="Masukkan Jumlah Barang"
            />
          </div>
          <Button
            className="w-full mt-6 mb-3 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            onClick={handleAddTransaksi}
          >
            Submit
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Gagal Tambah Transaksi</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {showSuccessAlert && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Berhasil Menambahkan Transaksi</AlertTitle>
              <AlertDescription>
                Transaksi berhasil ditambahkan
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
