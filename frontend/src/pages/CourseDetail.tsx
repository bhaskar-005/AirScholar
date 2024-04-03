import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCourseDetail } from "../api/api-function/coures-api";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { PiShareNetworkFill } from "react-icons/pi";
import { buyCourse } from "../api/api-function/payment-api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/Store";
import { addToCart } from "../redux/slice/cartSlice";
import Loading from "../components/Loading";
import { CgDisplayFullwidth } from "react-icons/cg";
import { LuAward } from "react-icons/lu";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { averageRating } from "../util/averageRating";
import toast from "react-hot-toast";
import ReactStars from "react-stars";

const CourseDetail = () => {
  const courseId = useParams();
  const [course, setcourse] = useState<any>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const { User } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCourseDetail = async () => {
    const res = await getCourseDetail(courseId.id);
    setcourse(res);
  };
  useEffect(() => {
    fetchCourseDetail();
  }, []);

  const buyCourseHandler = async () => {
    if(!User){
      toast.error('You are not logged in.')
      return 
    }
    await buyCourse([courseId.id], token, User, dispatch, navigate);
  };
  
  if (!course) {
    return <Loading />;
  }
  if (course) {
    return (
      <div className=" overflow-hidden ">
        <div
          className={`banner flex justify-center items-center mb-[70px] mt-[64px]`}
        >
          {/* Hero Section */}
          <div className="w-[1160px]  flex flex-col-reverse justify-between relative">
            <div
              className={`z-30 lg:w-[700px] my-5 mx-5 xl:mx-6 flex flex-col justify-center gap-7 py-8 text-lg text-gray-800 `}
            >
              <div>
                <p className="text-xl font-bold text-white sm:text-3xl">
                  {course.couresName}
                </p>
                <p className={`text-gray-200 sm:text-lg text-sm mt-3`}>
                  {course.courseDescription}
                </p>
              </div>
              <div className="text-md flex flex-wrap items-center gap-2 text-gray-200">
                <span className="text-yellow-400">{course.ratingAndReviews.length !== 0 ? averageRating(course.ratingAndReviews)+'.0' : '0.0'}</span>
                <ReactStars
                  count={5}
                  edit={false}
                  value={averageRating(course.ratingAndReviews)}
                  size={18}
                  
                />
                <span className="text-sm">{`(${course.ratingAndReviews.length} reviews)`}</span>
                <span className="flex items-center gap-1 text-sm bg-white px-2 py-[0.4px] rounded-sm text-black">
                  <IoPeopleSharp className="text-base" />
                  {`${course.studentsEnrolled.length} students enrolled`}
                </span>
              </div>
              <div>
                <p className="sm:text-base text-sm text-slate-200 font-[500]">
                  Course Creator:{" "}
                  <span className="font-[600] hover:underline cursor- text-white">{`${course.instructor.firstName} ${course.instructor.lastName}`}</span>
                </p>

                <div className="flex flex-wrap mt-2 gap-5  text-slate-200">
                  <p className="flex items-center text-sm font-[600] gap-2">
                    {" "}
                    <BiInfoCircle className="sm:text-lg text-sm" /> Created:{" "}
                    <span className=" sm:text-base text-sm">
                      {" "}
                      {new Date(course.createdAt).toString().slice(0, 15)}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-sm font-[500] text-white">
                    {" "}
                    <HiOutlineGlobeAlt className="text-lg" /> English
                  </p>
                </div>
              </div>
            </div>
            <div>
              {/* course card */}
              <div className=" xl:absolute m-4 top-8 right-1 border lg:w-[350px] w-auto overflow-hidden rounded-2xl border-black border-opacity-20 shadow-box">
                <div className="w-auto">
                  <img
                    src={course.thumbnail}
                    className="w-full h-full"
                    alt="course thumbnail"
                  />
                </div>
                <div className="flex flex-col gap-3 p-[12px] px-5 pb-7 xl:bg-white bg-blue-100">
                  <div className="flex justify-between">
                    <div className="flex gap-3 items-end">
                      <p className="text-[22px] font-[700]">
                        {" "}
                        ₹ {course.price}
                      </p>
                      <p className="text-[19px] line-through font-[600] text-gray-500">
                        {" "}
                        {course?.actualPrice}
                      </p>
                    </div>
                    <div className="flex flex-row gap-1 items-center font-[700] text-blue-600">
                      <p className="text-[16px] font-bold">share</p>
                      <PiShareNetworkFill className="text-[16px]" />
                    </div>
                  </div>
                  <div className="pb-3">
                    <div className="text-gray-600 text-[16px] font-bold">
                      What you will get:
                    </div>
                    <span className="font-[500] text-gray-500 flex gap-2 items-center mt-1">
                      <CgDisplayFullwidth className="text-lg" />
                      {course.courseContent.length} section content
                    </span>
                    <span className="font-[500] text-gray-500 flex gap-2 items-center">
                      <LuAward className="text-lg" />
                      Certificate of completion
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {course.studentsEnrolled.includes(User?._id) ? (
                      <>
                        <div className="font-[500] text-gray-600">
                          You are already enrolled in this course.
                        </div>
                        <Link to={"/viewCourse/" + course._id}>
                          <button className="bg-blue-500 w-full py-2 hover:shadow-md hover:shadow-blue-300 duration-500  rounded-xl text-[15px] font-[600] text-white">
                            view course
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 py-2 hover:shadow-md hover:shadow-blue-300 duration-500   rounded-xl text-[15px] font-[600] text-white"
                          onClick={() => buyCourseHandler()}
                        >
                          buy now
                        </button>
                        <button
                          onClick={() => dispatch(addToCart(course))}
                          className="bg-blue-500 py-2 hover:shadow-md hover:shadow-blue-300 duration-500  rounded-xl text-[15px] font-[600] text-white"
                        >
                          add to cart
                        </button>
                      </>
                    )}
                  </div>

                  <div className="w-full flex justify-end mt-3">
                    <img
                      className="w-[80px]"
                      src="https://learn.piyushgarg.dev/_next/static/media/razorpay.a3c741da.svg"
                      alt="razorpay"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1200px]">
          <div className="mx-auto max-w-maxContentTab lg:mx-3 xl:max-w-[600px]">
            {/* What will you learn section */}
            <div className="my-4 border border-gray-400 rounded-md bg-blue-50 bg-opacity-50 p-6">
              <p className="text-2xl font-semibold">What you'll learn</p>
              <div className="mt-4">{course.whatYouWillLearn}</div>
            </div>
            {/* Course Content Section */}
            <div className="max-w-[830px] ">
              <div className="max-w-[830px] ">
                <div className="flex flex-col gap-3 mt-10">
                  <p className="text-2xl font-semibold text-gray-800">
                    Course Content
                  </p>
                  <div className="border-gray-400 rounded-md border-[0.4px]">
                    {course.courseContent.map((section:any, index:any) => (
                      <details
                        key={index}
                        className={`border-b-gray-600 border-b-[0.4px]  group [&_summary::-webkit-details-marker]:hidden `}
                        >
                        <summary className=" py-6 flex cursor-pointer items-center justify-between gap-1.5 bg-blue-50 bg-opacity-50 p-4 text-gray-900">
                          <h2 className="font-[600] text-lg">
                            {section.sectionName}
                          </h2>
                          <svg
                            className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        {section.subSection.map((item:any) => (
                          <div key={item._id} className=" bg-white px-8 py-4 flex w-full justify-between">
                            <div className="flex gap-2 items-center text-gray-700 text-lg font-[500]">
                              <MdOndemandVideo />
                              {item.title}
                            </div>
                            <div className="text-sm font-[500] text-gray-500">
                              {item.timeDuration}
                            </div>
                          </div>
                        ))}
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Details */}
              <div className="py-4">
                <p className="text-2xl font-semibold">Author</p>
                <div className="flex items-center gap-4 py-4">
                  <img
                    src={
                      course.instructor.profilePhoto
                        ? course.instructor.profilePhoto
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${course.instructor.firstName} ${course.instructor.lastName}`
                    }
                    alt="Author"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <p className="text-lg">{`${course.instructor.firstName} ${course.instructor.lastName}`}</p>
                </div>
                <p className="text-gray-700">
                  {course.instructor?.moreInfo?.about}
                </p>
              </div>
              <div className="my-6 mb-20">
                <div className="text-2xl font-semibold my-2">Reviews</div>
              {
                course.ratingAndReviews.map((data:any,index:any)=>(
                  <div key={index} className="border-b-gray-300 border-b-[0.5px] my-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full overflow-hidden w-12 h-12">
                      <img
                        src={data?.user.profilePhoto}
                        alt="profilephoto"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-[500]">{data?.user.firstName} {data?.user.lastName}</h2>
                      <div className="-mt-2">
                        <ReactStars
                          count={5}
                          value={data.rating}
                          edit={false}
                          size={18}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="my-2 px-3 pb-3 text-gray-700">{data?.review}</div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CourseDetail;
