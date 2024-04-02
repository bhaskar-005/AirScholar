import React from "react";
import FormRender from "./FormRender";

const AddCourse = () => {
  return (
    <div className="flex flex-col mb-[100px]">
      <h1 className="text-[25px] font-[600] my-7">Create Course</h1>
      <div className="flex justify-between gap-4">
        
          {/* form card */}
        <div className="sm:w-[60%] w-full">
        <FormRender/>
        </div>
            
        
        {/* checkout components */}
        <div className="sm:block hidden">
          <div className="flex flex-col gap-3 max-w-[360px] p-[20px] bg-blue-100 bg-opacity-60 border border-gray-300 rounded-[5px] py-8">
            <p className="mb-3 text-[20px] ">
              ⚡ Course Upload Tips
            </p>
            <ul className="ml-5 list-item list-disc space-y-2 text-[13px] text-gray-800">
              <li>Set the Course Price option or make it free.</li>
              <li>Please ensure the course price is below ₹40,000.</li>
              <li>Standard size for the course thumbnail is 1024x576.</li>
              <li>Video section controls the course overview video.</li>
              <li>Course Builder is where you create & organize a course.</li>
             
              <li>
                Information from the Additional Data section shows up on the
                course single page.
              </li>
              <li>Make Announcements to notify any important</li>
              <li>Notes to all enrolled students at once.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
