import axios from "axios";

interface LikeData {
    user_id: number;
    vacation_id: number;
}

export const likeVacation = async(likeData: LikeData) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/like/", likeData);
        return response.data;
    } catch (error) {
        console.error("Error liking vacation:", error);
        throw error;
    }
};

export const unlikeVacation = async(user_id: number, vacation_id: number) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:5000/like/${user_id}/${vacation_id}`);
        return response.data;
    } catch (error) {
        console.error("Error unliking vacation:", error);
        throw error;
    }
};

export const getLikesbyUserId = async(user_id: number) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/likes/${user_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user likes:", error);
        throw error;
    }
}; 