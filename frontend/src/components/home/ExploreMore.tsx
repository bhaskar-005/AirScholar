import girlimg from '../../assets/girlimg.png'
import MaxWidthWrapper from '../MaxWidthWrapper';
import { LiaCheckCircleSolid } from 'react-icons/lia';

const ExploreMore = () => {
    const edTechPlatformFeatures = [
        { id: 1, description: "Interactive Lessons" },
        { id: 2, description: "Personalized Learning Paths" },
        { id: 3, description: "Real-time Progress Tracking" },
        { id: 4, description: "Collaborative Study Groups" },
        { id: 5, description: "Adaptive Assessment Tools" }
      ];
      
      
  return (
    <MaxWidthWrapper>
  <div className='flex sm:flex-row flex-col py-10 items-center justify-between sm:gap-[100px] gap-8 sm: mx-3'>
  <div className='flex flex-col gap-2'>
    <h2 className='text-[28px] font-[700] '>
      Get the Skills you need for a <span className='text-blue-600'>Job that is in demand</span>
    </h2>
    <p className='text-[14px] font-[500] text-gray-600 '>
      The modern AirScholar is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
    </p>
    <div className='flex flex-col gap-3 mt-4'>
      {edTechPlatformFeatures.map((item) => (
        <div className='flex gap-3 items-center' key={item.id}>
          <LiaCheckCircleSolid className='text-[23px] text-green-600' />
          <h3 className='text-[16px] font-[600] text-gray-700'>{item.description}</h3>
        </div>
      ))}
    </div>
  </div>
  <div className='border-gray-500 rounded-lg overflow-hidden'>
    <img src={girlimg} alt="image" className='object-cover w-full h-full' />
  </div>
</div>

    </MaxWidthWrapper>
  );
}

export default ExploreMore;
