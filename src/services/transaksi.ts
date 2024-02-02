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
};

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
  id: number;
  receiptID: string;
  id_rakslot: string;
  id_rak: string;
  jumlah: string;
  transaksi: Transaksi;
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

export const deleteTransaksi = async (token: string, receiptID: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/deleteTransaksi/${receiptID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const transaksiMasuk = async (token: string, nama_produk: string, jumlah:string, tanggal_expired: string, kode_produksi: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/tambahtransaksi`,
      {
        nama_produk,
        jumlah,
        tanggal_expired,
        kode_produksi,
      },
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

export const transaksiKeluar = async (token: string, nama_produk: string, jumlah:string) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/tambahtransaksi`,
      {
        nama_produk,
        jumlah,
      },
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

export const getTransaksiReport = async (token: string): Promise<Transaksi[]> => {
  try {
    const response = await axios.get("http://localhost:8000/api/getAllTransaksiReport", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.transaksiReport);

    // Assuming response.data.transaksireport is of type TransaksiReport[]
    return response.data.transaksiReport;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

