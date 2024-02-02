import axios from "axios";

export type Karyawan = {
  idkaryawan: string;
  nama: string;
  handphone: string;
  status: string;
  user_id: number;
  alamat?: string;
  email?: string;
  foto?: string;
  image_url?: string;
};

export const getKaryawan = async (token: string): Promise<Karyawan> => {
  try {
    const response = await axios.get("http://localhost:8000/api/getKaryawan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.karyawan);

    return response.data.karyawan;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data karyawan`);
  }
};

export type Transaksi = {
  receiptID: string;
  jumlah: string;
  id_produk: string;
  tanggal_transaksi: string;
  tanggal_expired: string;
  jenis_transaksi: string;
  kode_produksi: string;
  produk: Produk;
};

export type Produk = {
  idproduk: string;
  namaproduk: string;
  jenisproduk: string;
  value: string;
};

export const getTransaksibyKaryawan = async (
  token: string
): Promise<Transaksi[]> => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/getTransaksibyKaryawan",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Server responded with status code ${response.status}`);
    }

    console.log(response.data.transaksi);

    return response.data.transaksi;
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error getting Transaksi data:", error.message);
      throw new Error(
        `Terjadi kesalahan dalam mendapatkan data transaksi: ${error.message}`
      );
    } else {
      // Handle the case where error is not an Error object
      throw new Error("An unknown error occurred.");
    }
  }
};

export const updateProfileKaryawan = async (
  token: string,
  alamat: string,
  email: string,
  handphone: string,
  foto: File | null
) => {
  try {
    const formData = new FormData();
    formData.append("alamat", alamat);
    formData.append("email", email);
    formData.append("handphone", handphone);

    if (foto) {
      formData.append("foto", foto);
    }

    const response = await axios.post(
      "http://localhost:8000/api/updateProfileKaryawan",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Server responded with status code ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error updating profile:", error.message);
      throw new Error(
        `Terjadi kesalahan dalam memperbarui profil: ${error.message}`
      );
    } else {
      // Handle the case where error is not an Error object
      throw new Error("An unknown error occurred.");
    }
  }
};
