import { useEffect, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import { RootState } from "../../../redux/store/Store";
import { BsUpload } from "react-icons/bs";
import { profilePhotoUpdate } from "../../../api/api-function/profile-api";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import IconButton from "../../buttons/IconButton";

export default function ChangeProfilePicture() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { User } = useSelector((state: RootState) => state.profile);
  // const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = async () => {
    setLoading(true);
    try {
      if (!imageFile) {
        toast.error("No Image Selected");
      } else {
      const formData = new FormData();
      formData.append("ProfilePicture", imageFile); 

      console.log("formData", formData);
        await profilePhotoUpdate(formData, token);
      }
    } catch (error) {
      console.error("Error occurred while uploading:", error);
      toast.error("An error occurred while uploading.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-gray-300 bg-sky-50 p-8 sm:px-12 px-2 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || User?.profilePhoto}
            alt={`profile-${User?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover border-2 border-gray-400"
          />
          <div className="space-y-2">
            <p className="font-[500] text-gray-800">Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="text-sm cursor-pointer rounded-md bg-gray-100 border-gray-400 border-[0.4px] py-2 px-5 font-semibold text-gray-700"
              >
                Select
              </button>
              <IconButton
                className={loading ? "bg-blue-400 text-sm sm:px-3 px-[6px]" : "text-sm sm:px-3 px-2"}
                text={loading ? "Uploading" : "Upload"}
                onClick={handleFileUpload}
                childern = {loading ? <AiOutlineLoading className="text-lg text-gray-200 animate-spin" /> : <BsUpload />}
              >
                </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
