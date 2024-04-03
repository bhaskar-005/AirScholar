import IconButton from '../../buttons/IconButton';
import { TbEdit } from 'react-icons/tb';

const About = ({about}:{about:string}) => {
  return (
    <div className='bg-blue-100 bg-opacity-30 sm:px-[50px] px-[30px] py-8 rounded-lg border-[0.4px] sm:border-gray-300 border-gray-400 flex items-center justify-between min-h-[160px]'>
    <div className='flex flex-row items-center gap-3'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-[20px] font-[500]'>About</h2>
        {
            about != null ? (
              <h4 className='text-[14px] font-[400]'>{about}</h4>
            ):(
              <h4 className='text-[14px] font-[400]'>Write Something about Yourself</h4>
            )
           }
       </div>
    </div>
    <div className='sm:flex hidden'>
      <IconButton 
      text={'Edit'} 
      path={'/dashboard/settings'}
      childern={<TbEdit />} 
      />
    </div>
</div>
  );
}

export default About;
