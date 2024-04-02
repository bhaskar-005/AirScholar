import { RootState } from "../../redux/store/Store";
import { useSelector } from "react-redux";
import CourseDetails from "./form_render/CourseDetails";
import CourseBuld from "./form_render/CourseBuld";
import Publish from "./form_render/Publish";
import { LuCheck } from "react-icons/lu";

const FormRender = () => {
  const step = [
    {
      id: 1,
      title: "Course details",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  
  const {steps} = useSelector((state:RootState)=>state.course);

  return (
    <div className="w-full  my-3">
      <div className="flex flex-row justify-between">
        {step.map((item) => (
         
            <li key={item.id} className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
              <div className="min-w-[28px] min-h-[28px] flex flex-col items-center md:w-full md:inline-flex  md:flex-row text-xs align-middle">
                <span className={` w-8 h-8 text-[13px] ml-2 flex justify-center items-center flex-shrink-0  font-medium rounded-full
                  ${item.id == steps && 'text-blue-700 border-2 border-blue-500 text-[700]' } 
                  ${item.id < steps && 'bg-blue-500 border-[#3f77ef]'}
                  ${item.id > steps && 'text-gray-500 border-2 border-gray-300 bg-slate-100'} `}>
                    
                  {item.id < steps ?<LuCheck className="text-white text-[17px]" />: item.id }
                </span>
                 <div className={`mt-2 sm:block hidden w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 group-last:hidden border-gray-400 border-[1.4px] border-dashed `}></div>
              </div>
              <div className="grow md:grow-0 md:mt-3 pb-5">
                <span className="block text-sm font-medium text-gray-800">
                  {item.title}
                </span>
              </div>
            </li>
          
        ))}
      </div>

     {/* render form */}
      { steps==1 && <CourseDetails/>}
      { steps==2 && <CourseBuld/>}
      { steps==3 && <Publish/>}
      
    </div>
  );
};

export default FormRender;
