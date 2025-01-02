import { AuthProvider } from "./Context/AuthContext";
import { Layout } from "./LayoutArea/Layout/Layout";

function App() {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
}

export default App;
