import MaxWidthWrapper from '../MaxWidthWrapper';
import BlueButton from '../buttons/BlueButton';
import teacher from '../../assets/teacher.png'

const InstructorSection = () => {
  return (
    <div>
       <MaxWidthWrapper>
          <div className='flex sm:flex-row flex-col items-center justify-between sm:my-20 my-10 gap-9 '> 
            <div className='sm:w-[100%] w-[100%]'>
                <img src={teacher} alt="" className='object-cover ' />
            </div>
            <div className='flex flex-col gap-6 sm: mx-4'>
                <h2 className='text-[28px] font-[700] '>Become an <span className='text-blue-600'>Instructor</span></h2>
                <p className='text-[16px] font-[500] text-gray-600'>At AirScholar, our community of instructors empowers millions of students . Our platform equips you with the necessary tools and expertise to share your passion and knowledge with the world.</p>
             <div>
             <BlueButton text='Learn more' href='/signup' />
             </div>
            </div>
          </div>
       </MaxWidthWrapper>
    </div>
  );
}

export default InstructorSection;
