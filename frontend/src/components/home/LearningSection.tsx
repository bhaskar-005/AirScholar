import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Compare_with_others from '../../assets/Compare_with_others.png';
import Know_your_progress from '../../assets/Know_your_progress.png';
import Plan_your_lessons from '../../assets/Plan_your_lessons.png'

const LearningSection = () => {
  return (
    <div className="my-20">
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center gap-6">
          <div>
            <h2 className="text-center text-[29px] font-bold">Your Swiss Knife for <span className="text-blue-700">learning any language</span></h2>
          </div>
          <div>
            <p className="text-center text-[17px] font-[500] text-gray-700">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </p>
          </div> 
          <div className="flex sm:flex-row flex-col justify-center items-center sm:mt-[40px] mt-[10px]">
          <img src={Know_your_progress} alt="know your progress" className="-mr-20 object-contain sm:w-[40%] w-[80%] " />
            <img src={Compare_with_others} alt="compare with other" className="sm:-mr-20 -mt-20 -ml-10 object-contain sm:w-[40%] w-[80%] " />
            <img src={Plan_your_lessons} alt=" plan you lessons" className="sm:-ml-20 -mt-20 object-contain sm:w-[40%] w-[80%] "/>
          </div>
        </div>
      </MaxWidthWrapper>
    </div> 
  );
};

export default LearningSection;
