import { lazy, useEffect, Suspense } from "react";
import { Routes, Route, NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Register = lazy(() => import("./pages/Register.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));
const ViewNote = lazy(() => import("./pages/ViewNote.tsx"));
import Mail from "./components/Mail.tsx";
import PinkCloudOverlay from "./components/PinkCloudOverlay.tsx";
import { resetSession, getSession } from "./state/userSlice.ts";
const SubmitNotepage = lazy(() => import("./pages/SubmitNote.tsx"));
const LoadingSpinner = lazy(() => import("./components/Loading.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
import Navbar from "./components/Nav.tsx";

function App() {
    const { userDetail, error } = useSelector(state => state.user);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            (location.pathname === "/login" ||
                location.pathname === "/register")
        ) {
            dispatch(resetSession());
        }else{
          dispatch(getSession())
        }
    }, [location, dispatch]);
    
   

    return (
        <div className="">
            <PinkCloudOverlay />
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route
                        element={
                            <div>
                                <Navbar />
                                <Outlet />
                            </div>
                        }
                    >
                        <Route path="/u/:id" element={<SubmitNotepage />} />
                        <Route path="/note/:id" element={<ViewNote />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
