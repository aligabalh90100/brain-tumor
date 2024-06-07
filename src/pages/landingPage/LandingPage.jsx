import logo from "../../Assests/logo.jpg";
import landingCss from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={landingCss.container}>
      <img src={logo} alt="brain logo" />

      <Link to="/boarding/1">Brain Tumor</Link>
    </div>
  );
};

export default LandingPage;
