import axios from "axios";

export type Rak = {
  idrak: string;
  kapasitas: string;
  kapasitas_sisa: string;
  status: string;
};

export const getRak = async (token: string): Promise<Rak[]> => {
  try {
    const response = await axios.get("http://localhost:8000/api/getrak", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.raks);

    return response.data.raks;
  } catch (error) {
    console.log(error);
    throw new Error(`Terjadi kesalahan dalam mendapatkan data rak`);
  }
};

export type RakSlot = {
  id_rakslot: string;
  Xcoordinate: string;
  Ycoordinate: string;
  Zcoordinate: string;
  status: string;
};

export const showRakSlotByID = async (token: string, idrak: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/rak/${idrak}/rakslots`,
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
