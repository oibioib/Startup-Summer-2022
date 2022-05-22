import { SpinnerCircularFixed } from "spinners-react";


const Spinner = () => {
    return (
        <div className="spinner-wrapper">
            <SpinnerCircularFixed
                size={70}
                thickness={85}
                speed={100}
                color="rgba(0, 100, 235, 1)"
                secondaryColor="rgba(0, 0, 0, 0.1)" />
        </div>
    )
}

export default Spinner;