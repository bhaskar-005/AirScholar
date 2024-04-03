import  { useEffect, useState } from 'react';
import { instructorDashboard } from '../../api/api-function/coures-api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';
import { GiTakeMyMoney } from 'react-icons/gi';
import { PiStudentBold } from 'react-icons/pi';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { MdOutlineRateReview } from 'react-icons/md';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

const InstructorDashboard = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const { User } = useSelector((state: RootState) => state.profile);
  const [courses, setCourse] = useState<any>([]);

  const InstructorFunction = async () => {
    const res = await instructorDashboard(token);
    setCourse(res);
  };

  useEffect(() => {
    InstructorFunction();
  }, []);

  let money = 0;
  let student = 0;
  let reviewes = 0;
  if (courses) {
    courses?.forEach((course: any) => (money += course.totalAmountGenerated));
    courses?.forEach((course: any) => (student += course.totalStudents));
    courses?.forEach((course: any) => (reviewes += course.totalReviews));
  }

  // Doughnut chart data
  const lineChartData = {
    labels: courses.map((course: any) =>course.courseName.slice(0,15)+".."),
    datasets: [
      {
        data: courses.map((data:any)=> data.totalAmountGenerated ),
        label: 'Courses Earning',
        backgroundColor: ['#e0e0e0','#5194F6'],
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  const sortedCourses = courses?.slice(0,5).sort((a:any, b:any) => b.totalStudents - a.totalStudents);
  
  
  return (
    <div className="flex justify-center mt-[30px] mb-[90px]">
      <div className="max-w-[1200px] w-[95%]">
        <h1 className="text-[23px] text-gray-700 font-[600] ">
          hi <span className="text-gray-900">{User?.firstName} {User?.lastName}</span> 👋
        </h1>
        <p className="text-[13px] font-[500] text-gray-500 mb-6">
          Explore how your courses are performing and Monitor your earnings.
        </p>
        <div className="mb-4 p-1 bg-gradient-to-r from-blue-400 to-blue-600 sm:py-5 py-2 sm:px-5 px-2 rounded-md shadow-md flex flex-wrap items-center justify-between gap-1">
          <div className="flex flex-col items-center sm:min-w-[200px] min-w-[130px] sm:py-10 py-6 bg-blue-50 hover:bg-blue-100 cursor-pointer duration-300 rounded-lg border">
            <div className="flex flex-row items-center sm:text-[26px] text-[18px] gap-4 font-[600]">
              <GiTakeMyMoney /> {`₹${money}`}
            </div>
            <div className="sm:text-[14px] text-[10px] font-[500]">Total Amount Generated</div>
          </div>

          <div className="flex flex-col items-center sm:min-w-[200px] min-w-[130px] sm:py-10 py-6 bg-blue-50 hover:bg-blue-100 cursor-pointer duration-300 rounded-lg border">
            <div className="flex flex-row items-center sm:text-[26px] text-[18px] gap-4 font-[600]">
              <PiStudentBold /> {student}
            </div>
            <div className="sm:text-[14px] text-[10px] font-[500]">Total Students Enrolled</div>
          </div>

          <div className="flex flex-col items-center sm:min-w-[200px] min-w-[130px] sm:py-10 py-6 bg-blue-50 hover:bg-blue-100 cursor-pointer duration-300 rounded-lg border">
            <div className="flex flex-row items-center sm:text-[26px] text-[18px] gap-4 font-[600]">
              <HiMiniComputerDesktop /> {courses?.length}
            </div>
            <div className="sm:text-[14px] text-[10px] font-[500]">Total Courses</div>
          </div>

          <div className="flex flex-col items-center sm:min-w-[200px] min-w-[130px] sm:py-10 py-6 bg-blue-50 hover:bg-blue-100 cursor-pointer duration-300 rounded-lg border">
            <div className="flex flex-row items-center sm:text-[26px] text-[18px] gap-4 font-[600]">
              <MdOutlineRateReview /> {reviewes}
            </div>
            <div className="sm:text-[14px] text-[10px] font-[500]">Total Review</div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap">
          <div className="lg:w-[70%] w-[100%]">
            {/* Doughnut Chart */}
            <div className="bg-white p-6 h-[360px]">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Earning Overview</h2>
              <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
            
            <div className='flex flex-col gap-1 mt-5 lg:w-auto w-full '>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Top Selling</h2>
                {
                  sortedCourses.map((data:any)=>(
                    <div key={data._id} className='flex flex-row gap-4 cursor-pointer border-[0.1px] rounded-[8px] p-1'>
                        <div className='h-[50px] w-[70px] rounded-[8px] overflow-hidden'>
                            <img src={data.Image} className='w-full h-full object-cover justify-center' alt="sortedCourse" />
                        </div>
                        <div>
                            <h2 className='text-[16px] font-[500] text-gray-800'>{data.courseName.slice(0,25)}..</h2>
                            <p className='text-[12px] font-[400] text-gray-600'>{data.courseDescription.slice(0,30)}..</p>
                        </div>
                    </div>
                  ))   
                }
            </div>

        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
