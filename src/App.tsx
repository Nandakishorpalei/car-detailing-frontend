import { useEffect } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Signin } from "./Components/auth/Signin";
import { Signup } from "./Components/auth/Signup";
import { Home } from "./Components/Home/Home";
import { SuccessPage } from "./Components/Home/SuccessPage";
import { Product } from "./Components/Product/Product";
import { REDIRECT_AFTER_AUTH, RESTRICTED_ROUTES } from "./Constant/auth";
import useAuth from "./Hooks/useAuth";
import { RootState } from "./store/store";
import Loader from "./UI-Components/Loader/Loader";
import { useSelector } from "react-redux";
import { VerifyUser } from "./Components/verifyUser/VerifyUser";
import { TermsAndCondition } from "./Components/termsCondition/TermsCondition";
import { useState } from "react";
import { ToastUI } from "./UI-Components/Toast/Toast";
import { ProductUpload } from "./Components/ProductUpload/ProductUpload";
import { Files } from "./Components/Files/Files";
import { MyProducts } from "./Components/MyProducts/MyProducts";
import { ProductDetails } from "./Components/ProductDetails/ProductDetails";

function App() {
  const { isLoading } = useAuth();
  const { pathname } = useLocation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  console.log("user:", user);
  const [isVerifiedUser, setVerifiedUser] = useState(
    user?.isMailVerified && user?.isPhoneVerified && isAuthenticated
  );

  useEffect(() => {
    console.log({ homepage: true });
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
    <div className="bg-brand-gradient">
      <ToastUI />
      <Routes>
        {/* public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />
        {/* protected routes  */}
        {isVerifiedUser && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/files" element={<Files />} />
            <Route path="/products/:productid" element={<ProductDetails />} />
            <Route path="/products" element={<Product />} />
            <Route path="/myproducts" element={<MyProducts />} />
            <Route path="/productupload" element={<ProductUpload />} />
            <Route path="*" element={<Link to="/signup">Hello world</Link>} />
          </>
        )}

        {isAuthenticated && (
          <>
            <Route path="/verifyuser" element={<VerifyUser />} />
            <Route path="*" element={<Navigate to="/verifyuser" />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}

export default App;
