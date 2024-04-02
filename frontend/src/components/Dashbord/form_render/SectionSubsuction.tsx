import { RootState } from '../../../redux/store/Store';
import  { useState } from 'react';
import {  MdDeleteOutline, MdOndemandVideo, MdOutlineDeleteSweep } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../Modal';
import { RxDropdownMenu } from 'react-icons/rx';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {deleteSection, deleteSubsection } from '../../../api/api-function/coures-api';
import { CiEdit } from 'react-icons/ci';
import SubSectionModal from './SubSectionModal';

const SectionSubsuction = ({editSectionFunction}:{editSectionFunction:Function}) => {
    const {course} = useSelector((state:RootState)=>state.course);
    const{token} = useSelector((state:RootState)=>state.auth);
    const dispatch = useDispatch();
    const [deleteSectionModal  , setdeleteSectionModal] = useState<null|object>(null);
    const [subSectionModal  , setSubSectionModal] = useState<any>(null);
    const[viewSubSectionModal , setviewSubSectionModal] = useState<null|object>(null);

  
    //delete section funciton
    const DeleteSection = async(sectionId:string)=>{
      setdeleteSectionModal(null);
      await deleteSection({
         sectionId:sectionId,
         courseId:course._id},
         token, 
         dispatch
      );
    }
   const DeleteSubSection = async(data:any)=>{
    
    setdeleteSectionModal(null);
    await deleteSubsection(
      {subSectionId:data._id, sectionId:data.sectionId ,courseId:course._id},
      dispatch,
      token
    )
   }
   
    return (
    <div className='mt-[20px] bg-blue-50 border rounded-xl' >
        {
            course?.courseContent?.map((data:any,index:any)=>(
              <details id={index}>
                <summary className='flex flex-row justify-between  border-b-gray-400 border-b-[0.4px] gap-1 mx-5 my-2 px-2 py-2'>
                    <p className='text-[16px] font-[500] flex flex-row items-center gap-3'><RxDropdownMenu className='mt-[2px] text-[18px]'/>{' '} {data.sectionName}</p>
                    <div className='flex flex-row gap-3'>
                        {/* edit button */}
                        <button className='text-[20px] text-gray-800 hover:text-blue-500' 
                        onClick={()=> editSectionFunction(data._id,data.sectionName)}
                        ><CiEdit /></button>
                         {/* delete button */}
                        <button className='text-[20px] text-gray-600 hover:text-red-600'
                        onClick={()=>{
                          setdeleteSectionModal({
                            title: "Delete this Sub-Section? All the lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => DeleteSection(data._id),
                            btn2Handler: () => setdeleteSectionModal(null),
                        }) 
                      }}
                        ><MdOutlineDeleteSweep /></button>

                     <div className='w-[1px] bg-slate-300'></div>
                     <RiArrowDropDownLine className='text-[30px] text-gray-600 cursor-pointer'/>
                    </div>
                </summary>
               
               <div className='flex flex-col gap-2 my-[2px] mx-12 border-b-[0.6px] p-3 border-b-gray-300 '>
               {
                data?.subSection?.map((item:any,index:any)=>(
                  <div key={index} className='flex flex-row justify-between border-b-gray-400 border-b-[0.4px] gap-1 px-2 py-2'>
                      <div className='flex flex-row gap-3 items-center text-[14px] font-[500] hover:cursor-pointer'
                      onClick={()=>setviewSubSectionModal(item)}
                     >
                       <MdOndemandVideo className='text-[17px] text-gray-700'/>
                       {item.title}
                      </div>
                      <div>
                      <MdDeleteOutline 
                      className='cursor-pointer text-[20px] text-gray-600 hover:text-red-600' 
                      onClick={()=>{setdeleteSectionModal({
                        title: "Deleting this section will permanently remove the lecture.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => DeleteSubSection({...item, sectionId: data._id}),
                        btn2Handler: () => setdeleteSectionModal(null),
                       }) }}/>
                      </div>
                    </div>
                ))
               }
                <button 
                className='text-blue-500 font-[600] '
                onClick={()=> setSubSectionModal(data)}
                >add section <span className='font-bold text-[17px]'>+</span> </button>
               </div>

              </details>
            ))
        }
         {subSectionModal && <SubSectionModal data={subSectionModal} setSubSectionModal={setSubSectionModal}/>}
         {viewSubSectionModal &&<SubSectionModal data={viewSubSectionModal} setSubSectionModal={setviewSubSectionModal} view={true}/>}
         { deleteSectionModal && <Modal modalData={deleteSectionModal}/> }
    </div>
  );
}

export default SectionSubsuction;
