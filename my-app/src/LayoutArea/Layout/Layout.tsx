import css from "./Layout.module.css";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../../Routing/Routing";
import { AuthProvider } from "../../Context/AuthContext"
export function Layout() {
    return (
        <AuthProvider>
            <div className={css.Layout}>
                <header>
                    <Header />
                </header>
                <aside>
                    <Menu />
                </aside>
                <main>
                    <Routing />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </AuthProvider>
    );
}
