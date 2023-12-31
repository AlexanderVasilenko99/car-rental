import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LocationItemModel } from "../../../../../Models/LocationItemModel";
import Accordion from "./Accordion/Accordion";
import "./LocationItem.css";

function LocationItem(props: LocationItemModel): JSX.Element {
    const [accordionActive, setAccordionActive] = useState(false)
    useEffect(() => {
        setAccordionActive(!accordionActive)
    }, [])
    return (
        <NavLink to={'#'} className={accordionActive ? "LocationItem" : "LocationItemActive"}>
            <div className="row" onClick={() => { setAccordionActive(!accordionActive) }}>
                <img src={require("../../../../../Assets/Images/Locations/" + props.locationImageName)} alt="broken-city-photo" />
                <div className="row-text">
                    <h2>{props.locationCity}</h2>
                    <h3>{props.locationSvgComponent}{props.locationStreet}</h3>
                </div>
            </div>
            <div className={accordionActive ? "" : "accordion-div"} onClick={() => setAccordionActive(!accordionActive)}>
                <Accordion city={props.locationCity} address={props.locationStreet} email={props.locationMail} redirectPath={props.locationRedirectPath} />
            </div>
        </NavLink>
    );
}

export default LocationItem;
