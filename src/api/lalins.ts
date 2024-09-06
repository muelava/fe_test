import apiClient from "./AppClient";

export const getLalins = async (tanggal:any = '') => {
    return apiClient.get(`/lalins?tanggal=${tanggal ? tanggal.toISOString() : ''}`);
};