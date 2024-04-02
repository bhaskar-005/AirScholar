const BASE_URL = import.meta.env.VITE_SERVER_URL;

// AUTH ENDPOINTS
export const endpoints = {
  refreshToken: BASE_URL+'/refresh-token',
  SENDOTP_API: BASE_URL + "/sendOtp",
  SIGNUP_API: BASE_URL + "/signup",
  LOGIN_API: BASE_URL + "/login",
  RESETPASSTOKEN_API: BASE_URL + "/forgotPasswordToken",
  RESETPASSWORD_API: BASE_URL + "/forgotPassword",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/instructorDashboard",
}

// STUDENTS ENDPOINTS   
export const paymentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/verifyPayment",
}


// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/getCourse",
  COURSE_DETAILS_API: BASE_URL + "/getcourseDetail",

  EDIT_COURSE_API: BASE_URL + "/editCourse",


  COURSE_CATEGORIES_API: BASE_URL + "/allcategories",
  CREATE_COURSE_API: BASE_URL + "/createCourse",


  CREATE_SECTION_API: BASE_URL + "/createSection",
  CREATE_SUBSECTION_API: BASE_URL + "/createSubsection",

  UPDATE_SECTION_API: BASE_URL + "/updateSection",

  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/instructorCourse",


  DELETE_SECTION_API: BASE_URL + "/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/deleteSubsection",
//   __todo
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
 

  GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL + "/fullaccesscourse",

  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",



  CREATE_RATING_API: BASE_URL + "/createRatingReview",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
  CREATE_RATING_API: BASE_URL + "/createRatingReview",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/allcategories",
}

// CATALOG PAGE DATA     
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/categoryFind",
}

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contectUs",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/updateProfilePicture",
  UPDATE_PROFILE_API: BASE_URL + "/updateProfile",
  
}