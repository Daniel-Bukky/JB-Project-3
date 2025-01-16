import axios from "axios";

// Only if you need to fetch additional user data later
export const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found in localStorage');
        return null;
    }

    try {
        const response = await axios.get("http://127.0.0.1:5000/user-data", {
            headers: {
                "Authorization": `Bearer ${token.trim()}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200) {
            // Log the response to see what we're getting
            console.log('User data response:', response.data);
            return response.data;  // This should now contain the full user object
        }

        if (response.status === 422 || response.status === 401) {
            console.log('Authentication failed:', response.data);
            localStorage.removeItem('token');
        }
        
        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('Error response:', error.response?.data);
            if (error.response?.status === 422 || error.response?.status === 401) {
                localStorage.removeItem('token');
            }
        }
        console.error("Error fetching user data:", error);
        return null;
    }
};