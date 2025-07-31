import Menu from "../Components/Menu";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Menu />
            <Outlet />
        </div>
    )

}
export default Layout
