import CareerBenefitModel from "../../../../../Models/CareerBenefitModel";
import "./CareerBenefit.css";

function CareerBenefit(props: CareerBenefitModel): JSX.Element {
    return (
        <div className="CareerBenefit">
            <div>
                <img src={require("../../../../../Assets/Images/" + props.benefitImgSrc)} />
                <h2 className="career-benefit-header">
                    {props.benefitHeader}
                </h2>
                <div className="career-benefit-text">{props.benefitText}</div>
            </div>
        </div>
    );
}

export default CareerBenefit;
