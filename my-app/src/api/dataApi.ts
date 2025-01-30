import axios from "axios";

// Only if you need to fetch additional user data later
export const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found in localStorage');
        return null;
    }

    try {
        console.log('Making initial request to /user-data');
        const response = await axios.get("http://127.0.0.1:5000/user-data", {
            headers: {
                "Authorization": `Bearer ${token.trim()}`,
                "Content-Type": "application/json"
            }
        });

        console.log('Initial response status:', response.status);
        console.log('Initial response data:', response.data);

        if (response.status === 200) {
            // Get the user_id from the initial response
            const { user_id } = response.data;
            console.log('Extracted user_id:', user_id);
            
            // Make second API call to get full user info
            try {
                console.log(`Making second request to /user/${user_id}`);
                const userResponse = await axios.get(`http://127.0.0.1:5000/user/${user_id}`, {
                    headers: {
                        "Authorization": `Bearer ${token.trim()}`,
                        "Content-Type": "application/json"
                    }
                });
                
                console.log('User response status:', userResponse.status);
                console.log('User response data:', userResponse.data);
                
                if (userResponse.status === 200) {
                    console.log('Returning user data:', userResponse.data);
                    return userResponse.data;  // Return the full user data
                }
                console.log('User response status was not 200');
            } catch (error) {
                console.error("Error fetching full user info:", error);
                return null;
            }
        }

        if (response.status === 422 || response.status === 401) {
            console.log('Authentication failed:', response.data);
            localStorage.removeItem('token');
            return null;
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