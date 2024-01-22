import axios from "axios";

export type Produk = {
  idproduk: string;
  namaproduk: string;
  jenisproduk: string;
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
}
