import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store/Store";
import BlueButton from "../../buttons/BlueButton";
import { updateProfileInfo } from "../../../api/api-function/profile-api";
import toast from "react-hot-toast";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];
type Inputs = {
    firstName : string,
    lastName:string,
    dob:Date,
    about:string,
    phonenumber:number,
    gender:string

  }
  
export default function EditProfile() {
  const { User } = useSelector((state: RootState) => state.profile);
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  
  const submitProfileForm = async (data:Inputs) => {
    if (User.firstName == data.firstName &&
        User.lastName == data.lastName &&
        User.dob == data.dob &&
        User.phonenumber == data.phonenumber &&
        User.gender == data.gender &&
        User.about == data.about ) {
      toast.error('no changes !')
    }
    try {
     await updateProfileInfo( data,token , dispatch)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error)
    }
  };
 
  

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)} className="my-10">
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-gray-300 bg-sky-100 bg-opacity-40 p-8 px-12">
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <div>
                <label
                  className="block mb-2 text-[14px] font-medium text-gray-700"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="py-3 px-4 w-full border-[1px] border-gray-400 text-[16px] font-[400] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  placeholder="Enter first name"
                  type="text"
                  id="firstName"
                  {...register("firstName", { required: true })}
                  defaultValue={User?.firstName}
                />
              </div>
              {errors.firstName && (
                <span className="text-red-400">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <div>
                <label
                  className="block mb-2 text-[14px] font-medium text-gray-700"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="py-3 px-4 w-full border-[1px] border-gray-400 text-[16px] font-[400] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  placeholder="Enter last name"
                  type="text"
                  id="lastName"
                  {...register("lastName", { required: true })}
                  defaultValue={User?.lastName}
                />
              </div>
              {errors.lastName && (
                <span className="text-red-400">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <div>
                <label
                  className="block mb-2 text-[14px] font-medium text-gray-700"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth
                </label>
                <input
                  className="py-3 px-4 w-full border-[1px] border-gray-400 text-[16px] font-[400] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  type="date"
                  id="dateOfBirth"
                  {...register("dob", {
                    required: {
                      value: true,
                      message: "Please enter your Date of Birth.",
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date of Birth cannot be in the future.",
                    },
                  })}
                  defaultValue={User?.moreInfo?.dob}
                />
              </div>
              {errors.dob && (
                <span className="text-red-400">
                  {errors?.dob.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <div>
                <label
                  className="block mb-2 text-[14px] font-medium text-gray-700"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  className="py-3 px-4 w-full border-[1px] border-gray-400 text-[16px] font-[400] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  id="gender"
                  {...register("gender", { required: true })}
                  defaultValue={User?.moreInfo?.gender}
                >
                  {genders.map((ele, i) => (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
              {errors.gender && (
                <span className="text-red-400">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <div>
                <label
                  className="block mb-2 text-[14px] font-medium text-gray-700"
                  htmlFor="contactNumber"
                >
                  Contact Number
                </label>
                <input
                  className="py-3 px-4 w-full border-[1px] border-gray-400 text-[16px] font-[400] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  type="tel"
                  id="contactNumber"
                  placeholder="Enter contact number"
                  {...register("phonenumber", {
                    required: {
                      value: true,
                      message: "Please enter your Contact Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Contact Number" },
                    minLength: { value: 10, message: "Invalid Contact Number" },
                  })}
                  defaultValue={User?.moreInfo?.phonenumber}
                />
              </div>
              {errors.phonenumber && (
                <span className="text-red-400">
                  {errors.phonenumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <div>
                <label
                  className="block mb-2 text-[14px] font-medium text-gray-700"
                  htmlFor="about"
                >
                  About
                </label>
                <input
                  className="py-3 px-4 w-full border-[1px] border-gray-400 text-[16px] font-[400] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  type="text"
                  id="about"
                  placeholder="Tell us about yourself"
                  {...register("about", { required: true })}
                  defaultValue={User?.moreInfo?.about}
                />
              </div>
              {errors.about && (
                <span className="text-red-400">
                  Please tell us something about yourself.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="border-2 px-4 rounded-md hover:bg-slate-200 font-[500]"
          >
            Cancel
          </button>
          <BlueButton type="submit" text="Save" />
        </div>
      </form>
    </>
  );
}

