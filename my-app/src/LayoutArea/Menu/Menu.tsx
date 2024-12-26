import {Link} from "react-router-dom"
import css from "./Menu.module.css"
export function Menu():JSX.Element{

    return(
        <nav  className={css.Menu}>
            <Link className={css.link} to="/">Home</Link>
            <Link className={css.link} to="/login">Login</Link>
            <Link className={css.link} to="/products">Products</Link>
            <Link className={css.link} to="/register">Register</Link>

        </nav>
    )
}
