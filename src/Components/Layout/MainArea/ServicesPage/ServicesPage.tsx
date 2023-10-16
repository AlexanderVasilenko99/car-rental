import appConfig from "../../../../Utils/AppConfig";
import "./ServicesPage.css";
import SingleService from "./SingleService/SingleService";

function ServicesPage(): JSX.Element {
    return (
        <div className="ServicesPage">
            <div className="image-container">
                {/* <img src={require("../../../../Assets/Images/road2.png")} /> */}
                <div>
                    <SingleService serviceHeader="Business Rental" serviceImageName="handshake2.png" serviceParagraph="Discover a unique program built exclusively for businesses of all scales." destinationUrl={appConfig.homePagePath} />
                </div>
                <div>
                    <SingleService serviceHeader="Monthly Rental" serviceImageName="calendar.png" serviceParagraph="Looking to rent for a while? We got you covered!" destinationUrl="#" />
                </div>
                <div>
                    <SingleService serviceHeader="Chauffeur Services" serviceImageName="chauffeur.png" serviceParagraph="We offer a variety of chauffer services at any time all year around." destinationUrl="#" />
                </div>
                <div>
                    <SingleService serviceHeader="Group Car Rental" serviceImageName="group.png" serviceParagraph="Discover the best prices and discounts for groups renting 3 cars or more!" destinationUrl="#" />
                </div>
                <div>
                    <SingleService serviceHeader="One Day Car Rental" serviceImageName="oneday.png" serviceParagraph="Learn about our affordable one day rental program." destinationUrl="#" />
                </div>
                <div>
                    <SingleService serviceHeader="One Way Car Rental" serviceImageName="destination.png" serviceParagraph="Learn about our affordable one way rental program." destinationUrl="#" />
                </div>

            </div>

        </div>
    );
}

export default ServicesPage;