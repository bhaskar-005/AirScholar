import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from './pages/ForgotPassword'
import Dashbord from "./pages/Dashbord";
import MyProfile from "./components/Dashbord/MyProfile";
import NoPage from "./pages/NoPage";
import EnrolledCourses from "./components/Dashbord/EnrolledCourses";
import Cart from "./components/Dashbord/Cart";
import MyCourses from "./components/Dashbord/MyCourses";
import OtpValidation from "./pages/OtpValidation";
import ResetPassword from "./pages/ResetPassword";
import ViewCourse from "./pages/viewCourse";
import AddCourse from "./components/Dashbord/AddCourse";
import { useEffect } from "react";
import { getCategory, refreshToken } from "./api/api-function/auth-api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store/Store";
import Courses from "./pages/Courses";
import CategoryPage from "./pages/CategoryPage";
import CourseDetail from "./pages/CourseDetail";
import InstructorDashboard from "./components/Dashbord/InstructorDashboard";
import EditCourse from "./components/Dashbord/EditCourse";
import Settings from "./components/Dashbord/Settings";

function App() {
  const {token} = useSelector((state:RootState)=>state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getCategory(dispatch)
    if (localStorage.getItem('token')) {
      refreshToken(token, dispatch);
    }
  }, [token]);

  return (
      <>
      <Navbar/>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<OtpValidation />} />
        <Route path="/update-password/:id" element={<ResetPassword />} />
       
         <Route path="/dashboard" element={token? <Dashbord />:<Login />} >
           <Route path="profile" element={token? <MyProfile />:<Login />} />
           <Route path="enrolled-courses" element={token? <EnrolledCourses />:<Login />} />
           <Route path="cart" element={token? <Cart />:<Login />} />
           <Route path="my-courses" element={token? <MyCourses />:<Login />} />
           <Route path="add-course" element={token? <AddCourse />:<Login />} />
           <Route path="/dashboard/instructor" element={token? <InstructorDashboard />:<Login />} />
           <Route path="/dashboard/Settings" element={token? <Settings/>:<Login />}/>
           <Route path="/dashboard/edit/:id" element={token? <EditCourse/>:<Login />}/>
        </Route>
        <Route path="/viewCourse/:id" element={token?<ViewCourse />:<Login/>} />
     

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/Catalog/:id" element={<CategoryPage />} />
        
        </Routes>
        </>
    )
   }


export default App;
