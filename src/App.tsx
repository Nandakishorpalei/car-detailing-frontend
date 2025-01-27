import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { About } from "./Components/About/About";
import { Signin } from "./Components/auth/Signin";
import { Signup } from "./Components/auth/Signup";
import { Contact } from "./Components/Contact/Contact";
import { Home } from "./Components/Home/Home";
import { SuccessPage } from "./Components/Home/SuccessPage";
import { Services } from "./Components/Services/Services";
import { TermsAndCondition } from "./Components/termsCondition/TermsCondition";
import { VerifyUser } from "./Components/verifyUser/VerifyUser";
import { REDIRECT_AFTER_AUTH, RESTRICTED_ROUTES } from "./Constant/auth";
import useAuth from "./Hooks/useAuth";
import { RootState } from "./store/store";
import Loader from "./UI-Components/Loader/Loader";
import { ToastUI } from "./UI-Components/Toast/Toast";

function App() {
  const { isLoading } = useAuth();
  const { pathname } = useLocation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [isVerifiedUser, setVerifiedUser] = useState(
    user?.isMailVerified && user?.isPhoneVerified && isAuthenticated
  );

  useEffect(() => {
    setVerifiedUser(
      user?.isMailVerified && user?.isPhoneVerified && isAuthenticated
    );
  }, [user?.isMailVerified, user?.isPhoneVerified, isAuthenticated]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !RESTRICTED_ROUTES.includes(pathname)) {
        localStorage.setItem(REDIRECT_AFTER_AUTH, pathname);
      } else if (localStorage.getItem(REDIRECT_AFTER_AUTH)) {
        localStorage.removeItem(REDIRECT_AFTER_AUTH);
      }
    }
  }, [isAuthenticated, isLoading, pathname]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <ToastUI />
      <Routes>
        {/* public routes */}
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} /> */}
        {/* <Route path="/success" element={<SuccessPage />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} /> */}
        {/* protected routes  */}
      
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
          

        {/* {isAuthenticated && (
          <>
            <Route path="/verifyuser" element={<VerifyUser />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
