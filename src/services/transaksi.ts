import axios from "axios";

export type Transaksi = {
  receiptID: string;
  id_produk: string;
  id_rak: string;
  id_slotrak: string;
  id_karyawan: string;
  jumlah: string;
  tanggal_transaksi: string;
  jenis_transaksi: string;
  karyawan: Karyawan;
};

export type Karyawan = {
  idkaryawan: string;
  nama: string;
  alamat?: string;
  email?: string;
  handphone?: string;
  status: string;
  foto: null;
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
