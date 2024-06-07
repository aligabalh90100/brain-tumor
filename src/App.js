import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import LandingPage from "./pages/landingPage/LandingPage";
import { useEffect } from "react";
import OnBoarding from "./pages/boardingPage/OnBoardingPage";
import PersonalInformationPage from "./pages/pesonalInforation/PersonalInformationPage";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      const users = [];
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/boarding/:id" element={<OnBoarding />} />
          <Route
            path="/personal-inforamtion/:username"
            element={<PersonalInformationPage />}
          />
          <Route path="/userprofile/:username" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
