import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { fetchCities } from "../../api/cityApi";
import { ICity } from "../../models/index";

export function Register() {
    const { register } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cityId, setCityId] = useState<number>(0);
    const [birthday, setBirthday] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [cities, setCities] = useState<ICity[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Fetch cities on component mount
    useEffect(() => {
        const loadCities = async () => {
            try {
                const cityData = await fetchCities();
                setCities(cityData);
            } catch (err) {
                setError("Failed to load cities. Please try again.");
            }
        };
        loadCities();
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!email || !password || !cityId || !birthday || !address) {
            setError("All fields are required.");
            return;
        }

        try {
            await register(email, password, cityId, new Date(birthday), address);
            setSuccess("Registration successful!");
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Register</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>City:</label>
                    <select
                        value={cityId}
                        onChange={(e) => setCityId(Number(e.target.value))}
                        required
                    >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Birthday:</label>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <button onClick={handleRegister}>Register</button>
        </div>
    );
}
