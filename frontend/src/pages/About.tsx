import BlueButton from "../components/buttons/BlueButton";
import ContactForm from "../components/contect/ContactForm";
import about from '../assets/about.png';
import { CgLoadbarDoc } from "react-icons/cg";
import {  MdSupport } from "react-icons/md";
import { ImBubbles4 } from "react-icons/im";
import { VscFeedback } from "react-icons/vsc";

const About = () => {
  const items = [
    {
        icon: <CgLoadbarDoc />,
        title: "Interactive Learning",
        description: "Engage with interactive learning materials and multimedia content tailored to your learning needs."
    },
    {
        icon: <VscFeedback />,
        title: "Personalized Feedback",
        description: "Receive personalized feedback and assessment to track your progress and improve your skills."
    },
    {
        icon: <ImBubbles4 />,
        title: "24/7 Access",
        description: "Access course materials anytime, anywhere, allowing you to learn at your own pace and convenience."
    },
    {
        icon: <MdSupport />,
        title: "Community Support",
        description: "Connect with a supportive community of learners and instructors to share knowledge and collaborate on projects."
    }
];


  return (
    <>
      {/* top </div> */}
      <div>
        <section className="div-gradien">
          <div className=" flex lg:flex-col flex-row justify-center items-center sm: mx-2">
            <div className="w-[1200px] mt-[100px] flex sm:flex-row flex-col items-center justify-between gap-3">
              <div className="space-y-10 w-full h-auto">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-blue-900 opacity-80">ABOUT</p>
                  <h1 className="sm:text-5xl text-3xl font-[600] text-blue-900">
                    <span className="text-blue-600">Who</span> We Are ?
                  </h1>
                  <p className="sm:text-[16px] text-base font-[400] text-gray-400 mt-4  ">
                    Welcome to out education website, where we believe that
                    learning is a lifelong journey that should be accessible to
                    all
                  </p>
                </div>
                <img
                  src={about}
                  alt="aboutImg"
                  className="sm:h-[330px] h-[280px]"
                />
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-3 w-full h-full">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`group cursor-pointer shadow-lg border-gray-200 border-[0.4px] ${
                      index === 0 ? "bg-blue-600" : "bg-white hover:bg-blue-600"
                    } p-4 h-[200px] relative overflow-hidden rounded-xl`}
                  >
                    <div
                      className={`h-[150px] w-[150px] ${
                        index === 0 ? "block" : "hidden group-hover:block"
                      } bg-blue-500 rounded-full absolute -right-16 -top-16 shadow-xl opacity-50`}
                    ></div>
                    <div className="bg-blue-100 group-hover:bg-white rounded-full h-[60px] w-[60px] flex justify-center items-center text-blue-600 text-[24px]">
                      {item.icon}
                    </div>
                    <div className="mt-4">
                      <h1
                        className={`text-lg ${
                          index === 0
                            ? "text-gray-100"
                            : "text-gray-800 group-hover:text-gray-100"
                        }`}
                      >
                        {item.title}
                      </h1>
                      <p
                        className={`text-sm mt-1  ${
                          index === 0
                            ? "text-gray-300"
                            : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" flex flex-col justify-center items-center">
            <ContactForm
              heading={"Get In Touch"}
              text={"We'd love to here for you, Please fill out this form."}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
