import axios from 'axios';

const API_URL = 'https://api-colombia.com';


export const getAllPresidents = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/President`);
        return response.data;
    } catch (error) {
        console.error('Error getting presidents:', error);
        throw error;
    }
};

export const getAllAirports = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/Airport`);
        return response.data;
    } catch (error) {
        console.error('Error getting airports:', error);
        throw error;
    }
};

export const getAllTouristicAttractions = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/TouristicAttraction`);
        return response.data;
    } catch (error) {
        console.error('Error getting touriscAttraction:', error);
        throw error;
    }
};