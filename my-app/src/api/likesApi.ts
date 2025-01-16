import axios from "axios";

export const likeVacation = async(LikeData: {
    user_id: number;
    vacation_id: number;
}) => {
    const response = await axios.post("http://127.0.0.1:5000/like/", LikeData);
    return response.data;
};
export const unlikeVacation = async(user_id:number, vacation_id:number)=>{
    const response = await axios.delete(`http://127.0.0.1:5000/like/${user_id}/${vacation_id}`);
    return response.data;
};

export const getLikesbyUserId = async(user_id:number)=>{
    const response = await axios.get(`http://127.0.0.1:5000/likes/${user_id}`);
    return response.data;
};
