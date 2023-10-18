import { useEffect } from "react";
import FullCity from "../FullCity/FullCity";
import "./BenGurion.css";
import locationsmapenum, { LocationsEnum } from "../../../../../Enums/LocationsMapEnum";

function BenGurion(): JSX.Element {
    useEffect(() => {
        const coords = locationsmapenum.locations[LocationsEnum.BEN_GURION]
        console.log(coords);
    }, []);
    return (
        <div className="BenGurion">
            <FullCity city={"Ben Gurion Airport (TLV)"} email='vasirental@bgu.co.il' locationId={LocationsEnum.BEN_GURION}
                address="Ben Gurion Airport 7015001" redirectPath="#" phoneNumber="" aboutLocation="The Ben Gurion branch is
                        located in Terminal 3 on the 1st floor. The location is perfect for you if you wish to start your rental
                        right after your arrival to Israel and have a headache-free beggining to your trip. The airport is
                        located in the geographic heart of Israel. It is 20 kilometers away from Tel Aviv, 60 kilometers from Jerusalem, 100 kilometers from Haifa, and
                        100 kilometers from Be'er Sheva." reachOfficeInstructions="Our office is located at Ben Gurion Airport
                        Terminal 3 floor 1. After passing border control and customs, you can find us at the northern side of the
                        arrivals hall (your right side). From there our agents will point you to the parking location."/>
        </div>
    );
}

export default BenGurion;
