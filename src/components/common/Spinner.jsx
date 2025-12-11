import "../../assets/css/spinner.css"
import spinner from "../../assets/images/spinner.png"

export default function Spinner(props) {
    const {message} = props;
    return (
        <div className={"spinner-container"}>
            <div className="spinner-ring">
                <img src={spinner} className="spinner-base" alt="Loading…"/>
                <img src={spinner} className="spinner-outer" alt="" aria-hidden="true"/>
            </div>
            <p>{message}</p>
        </div>

    );
}