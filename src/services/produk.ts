import axios from "axios";

export type jenisProduk = {
  id: number;
  jenisproduk: string;
};

export type Produk = {
  idproduk: string;
  namaproduk: string;
  idjenis_produk: number;
  jenis_produk: jenisProduk;
  value: string;
};

export const getProduk = async (token: string): Promise<Produk[]> => {
  try {
    const response = await axios.get("http://localhost:8000/api/getProduk", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.produk);

    return response.data.produk;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data produk`);
  }
};

export const deleteProduk = async (token: string, idproduk: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/deleteProduk/${idproduk}`,
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

export const addProduk = async (
  token: string,
  namaproduk: string,
  jenisproduk: string,
  value: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/tambahproduk`,
      {
        namaproduk,
        jenisproduk,
        value,
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

export const getJenisProduk = async (token: string): Promise<jenisProduk[]> => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/getJenisProduk",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data.jenisproduk);

    return response.data.jenisproduk;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data produk`);
  }
};

export const deleteJenisProduk = async (token: string, id: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/deleteJenisProduk/${id}`,
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

export const addJenisProduk = async (token: string, jenisproduk: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/tambahJenisProduk`,
      {
        jenisproduk,
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
