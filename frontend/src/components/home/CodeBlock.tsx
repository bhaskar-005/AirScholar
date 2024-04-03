import { TypeAnimation } from 'react-type-animation';
import BlueButton from '../buttons/BlueButton';
import SecondaryButton from '../buttons/SecondaryButton';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { color } from '../../colors/color';

const CodeBlock = ({
  heading,
  subheading,
  btn1,
  btn2,  
  btn2href,
  btn1href,
  backgroundGradient,
  codeColor,
  code,
  position
}: {
  heading: string;
  subheading: string;
  btn1: string;
  btn1href: string;
  btn2href: string;
  btn2: string;  
  backgroundGradient: string;
  codeColor: string; 
  code:string;
  position ?:string;
}) =>{
  return (
    <MaxWidthWrapper>
  <div className={`flex sm: flex-col ${position} gap-20 justify-between sm:my-20 my-12 items-center`}>

        <div className="flex flex-col gap-6 sm: px-4">
          <h1 className="text-[30px] text-blue-500 font-bold ">{heading}</h1>
          <p className={`text-${color.darkWhite} font-[500] text-[15px] `}>
            {subheading}
          </p>
          <div className="flex  gap-3 py-5">
            <BlueButton text={btn1} href={btn1href} className={"max-w-auto"} />
            <SecondaryButton
              href={btn2href}
              text={btn2}
              className={"max-w-auto"}
            />
          </div>
        </div>

        {/* code section */}
        <aside
          className={`bg-black p-6 rounded-lg w-full max-w-lg min-h- font-mono ${backgroundGradient} ${codeColor}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 text-red-500">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <p className="text-sm">code</p>
          </div>
          <div className={`flex flex-row mt-3 gap-2`}>
            <div className="font-bold sm:text-[13px] text-[11px] text-gray-300 text-center">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
            </div>
            <div className=" font-[600] sm:text-[13px] text-[11px]">
              <TypeAnimation
                sequence={[code, 1000, ""]}
                cursor={true}
                repeat={Infinity}
                style={{ display: "block", whiteSpace: `pre-line` }}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </aside>
      </div>
    </MaxWidthWrapper>
  );
}

export default CodeBlock;
