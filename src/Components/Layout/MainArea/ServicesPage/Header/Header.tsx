import { NavLink } from "react-router-dom";
import appConfig from "../../../../../Utils/AppConfig";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1>
                <NavLink to={appConfig.servicesPagePath} className="Header">
                    Back To All Services
                </NavLink>
            </h1>
        </div>
    );
}

export default Header;
