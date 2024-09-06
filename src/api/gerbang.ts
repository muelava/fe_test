import axios from "axios";
import apiClient from "./AppClient";

export const getGerbangs = async () => {
  return apiClient.get('/gerbangs');
};

export const createGerbang = async (data: { id: number; IdCabang: number; NamaGerbang: string; NamaCabang: string }) => {
  try {
    const response = await apiClient.post('/gerbangs', data);
    return response.data;
  } catch (error) {
    console.error('Error creating gerbang:', error);
    throw error;
  }
};


export const deleteGerbang = async (data: {id:number; IdCabang:number;}) => {

  const url = `http://localhost:8080/api/gerbangs`;
  try {
    const response = await axios.delete(url, {
      data: {
        id: data.id,
        IdCabang: data.IdCabang
      },
    });

    if (response.status === 200) {
      return 'Gerbang deleted successfully'
    } else {
      console.error('Failed to delete gerbang:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting gerbang:', error);
  }
};


export const editGerbang = async (data: {id:number; IdCabang:number; NamaCabang:string; NamaGerbang:string}) => {

  const url = `http://localhost:8080/api/gerbangs`;
  try {
    const response = await axios.put(url, {
        id: data.id,
        IdCabang: data.IdCabang,
        NamaGerbang: data.NamaGerbang,
        NamaCabang: data.NamaCabang
    });

    if (response.status === 200) {
      return 'Gerbang edited successfully'
    } else {
      console.error('Failed to edited gerbang:', response.statusText);
    }
  } catch (error) {
    console.error('Error editing gerbang:', error);
  }
};