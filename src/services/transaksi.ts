import axios from "axios";

export type Transaksi = {
  receiptID: string;
  id_produk: string;
  id_karyawan: string;
  jumlah: string;
  tanggal_transaksi: string;
  jenis_transaksi: string;
  karyawan: Karyawan;
  kode_produksi: string;
  tanggal_expired: string;
  produk: Produk;
};

export type Karyawan = {
  idkaryawan: string;
  nama: string;
  alamat?: string;
  email?: string;
  handphone?: string;
  status: string;
  foto: null;
};

export type Produk = {
  idproduk: string;
  namaproduk: string;
  jenisproduk: string;
  value: string;
}

export const getTransaksi = async (token: string): Promise<Transaksi[]> => {
  try {
    const response = await axios.get("http://localhost:8000/api/getTransaksi", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.transaksis);

    return response.data.transaksis;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data admin`);
  }
};

export type TransaksiReport = {
  receiptID: string;
  id_rakslot: string;
  id_rak: string;
  jumlah: string;
};

export const showTransaksiReport = async (token: string, receiptID: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getDetailTransaksi/${receiptID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


