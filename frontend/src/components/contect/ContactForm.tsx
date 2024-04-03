import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../input/Input";
import BlueButton from "../buttons/BlueButton";
import { ContectForm } from "../../api/api-function/auth-api";

type Inputs = {
  email: string;
  firstname: string;
  lastname: string;
  message: string;
  phoneNo: string;
  countrycode: string;
};
const ContactForm = ({heading , text}:{heading:string; text:string;}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>();

  //functioin for input
  const onSubmit: SubmitHandler<Inputs> = async(data) =>{
    const res = await ContectForm(data);
    if(res?.status == 200 ){
      reset();
    }
  }
  return (
    <div className="flex flex-col justify-center my-[70px] sm: mx-[4px] border rounded-lg sm:p-[30px] p-[10px] ">
      <div className="flex flex-col gap-2 mb-8 ">
        <h1 className="text-center text-[26px] font-bold opacity-80">{heading}</h1>
        <p className="text-center text-[15px] font-[600] opacity-55">{text}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-row justify-between gap-2">
          
          <Input
            InputType={"text"}
            label={"First Name *"}
            placeholder={"Enter first name"}
            {...register("firstname", { required: true })}
          />

          <Input
            InputType={"text"}
            label={"Last Name *"}
            placeholder={"Enter last name"}
            {...register("lastname", { required: true })}
          />
        </div>
        {errors.firstname ? (
          <span className="text-[12px] text-red-600">
            Firstname is required
          </span>
        ) : null}
        {errors.lastname ? (
          <span className="text-[12px] text-red-600">Lastname is required</span>
        ) : null}

        <Input
          InputType={"email"}
          label={"Email *"}
          placeholder={"Enter email"}
          {...register("email", { required: true })}
        />
        {errors.email ? (
          <span className="text-[12px] text-red-600">Email is required</span>
        ) : null}


       <div>
        <label className={`block mb-2 text-[14px] font-medium text-gray-700`}>
          Message *
        </label>

        <textarea
          className="py-3 px-4 w-full border-[1px] border-gray-600 text-[17px] font-[500] rounded-[5px] focus:ring-2 focus:ring-blue-200 focus:outline-none"
          id="message"
          cols={15}
          rows={7}
          placeholder="Enter your message for us"
          {...register("message", { required: true })}
        />
        </div>
        {errors.message ? (
          <span className="text-[12px] text-red-600">
            Your message is empty.
          </span>
        ) : null}

        <BlueButton type={"submit"} text={"Send Message"} className={"mt-5"} />
      </form>
    </div>
  );
};

export default ContactForm;
