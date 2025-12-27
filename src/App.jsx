import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AboutPage from "./pages/About";
import SellerLogin from "./pages/Seller/SellerLogin";

import BecomeSeller from "./pages/Seller/Seller";
import SellerNavbar from "./pages/Seller/SellerNavbar";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermCondition from "./pages/TermCondition";
import Cart from "./pages/Cart";
import ProfileSection from "./pages/profile-section/Profile";
import MyBooking from "./pages/profile-section/my-bookings/Mybooking";
import BottomNav from "./components/Sidebar/BottomNav";
import UserRoutes from "./components/Protected/UserRoutes";
import DetailsPage from "./pages/DetailsPage";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed/PaymentFailed";
import BookingHistory from "./pages/profile-section/booking-history/BookingHistory";
import AddressModal from "./pages/profile-section/address/AddressModal";
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <BottomNav />
  </>
);

const SellerLayout = ({ children }) => (
  <>
    <SellerNavbar />
    {children}
  </>
);

/* ---------------- App ---------------- */

export default function App() {
  return (

    <Routes>

      {/* ---------- NORMAL USER ROUTES ---------- */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/contact-page"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />

      <Route
        path="/privacy-policy"
        element={
          <MainLayout>
            <PrivacyPolicy />
          </MainLayout>
        }
      />

      <Route
        path="/terms-and-conditions"
        element={
          <MainLayout>
            <TermCondition />
          </MainLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <MainLayout>
            <UserRoutes Component={Cart} />

          </MainLayout>




        }
      />


      < Route
        path="/profile"
        element={
          <>
            <MainLayout>
              <UserRoutes Component={ProfileSection} />

            </MainLayout>

          </>


        }
      />
      < Route
        path="/profile-section/my-bookings"
        element={
          <>
            <MainLayout>
              <UserRoutes Component={MyBooking} />

            </MainLayout>


          </>
        }
      />

      < Route
        path="/profile-section/booking-history"
        element={
          <>
            <MainLayout>
              <UserRoutes Component={BookingHistory} />

            </MainLayout>


          </>
        }
      />

      < Route
        path="/profile-section/address"
        element={
          <>
            <Navbar />


            <UserRoutes Component={AddressModal} />

            <BottomNav />


          </>
        }
      />


      < Route
        path="/product-details/:id"
        element={
          <>
            <MainLayout>
              <DetailsPage />

            </MainLayout>


          </>
        }
      />

      < Route
        path="/product-details/:id"
        element={
          <>
            <MainLayout>
              <DetailsPage />

            </MainLayout>


          </>
        }
      />
      < Route
        path="/login"
        element={
          < MainLayout >
            <Login />
          </MainLayout >
        }
      />

      < Route
        path="/payment/payu/success"
        element={
          < MainLayout >
            <PaymentSuccess />
          </MainLayout >
        }
      />
      < Route
        path="/payment/payu/failure"
        element={
          < MainLayout >
            <PaymentFailed />
          </MainLayout >
        }
      />
      < Route
        path="/become-seller/login"
        element={
          < MainLayout >
            <SellerLogin />
          </MainLayout >
        }
      />
      < Route
        path="/about"
        element={
          < MainLayout >
            <AboutPage />
          </MainLayout >
        }
      />

      {/* ---------- SELLER ROUTES ---------- */}
      <Route
        path="/become-seller/*"
        element={
          <SellerLayout>
            <BecomeSeller />
          </SellerLayout>
        }
      />

    </Routes >

  );
}
