import * as React from "react";
import { Link } from "react-router-dom";
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { color } from '../colors/color';
import { IoMdBook } from "react-icons/io";
import CodeBlock from "../components/home/CodeBlock";
import ExploreMore from "../components/home/ExploreMore";
import InstructorSection from "../components/home/InstructorSection";
import LearningSection from "../components/home/LearningSection";
import { FaArrowRightLong } from "react-icons/fa6";

import { LuGraduationCap } from "react-icons/lu";
import { GoShieldCheck } from "react-icons/go";


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";


const Home = () => {

    const review = [
      {
        "review_id": 1,
        "profile_name": "Alice Smith",
        "profile_type": "student",
        "profile_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbG-0Pc_dX0swJiOnUTf58QaSAwwUTpBUi6Q&usqp=CAU",
        "description": "The platform is user-friendly and intuitive. I found it easy to navigate through the various features and resources. The customer support team is also very responsive and helpful. Overall, a great experience! 😍",
        "rating": 5,
        "date": "2024-02-15"
      },
      {
        "review_id": 2,
        "profile_name": "Bob Johnson",
        "profile_type": "instructor",
        "profile_photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISFRgSEhIREhIYGBgSEREREhEREhESGBUZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISGjEkJCE0NDQxMTE0NDQ0MTQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQxNDQ0MTE0NDE0NDQxMTQ0MTQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xAA9EAACAQIEBAQEAwcDAwUAAAABAgADEQQFITESIkFRBmFxgRMykaEjscEHFDNCUmLRcvDxorLhFTWCksL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAgEQEBAAICAwEBAQEAAAAAAAAAAQIRITEDEkEyUWEi/9oADAMBAAIRAxEAPwCoU8At42w9ECLRjF7zYZio6y0G7KItxmGDSL/1Je80fME7w0OUVDLUBvaFLQA2kVPGIToZKtYExkLw41jICL8PvGYGkpKMiRssnKzRlkgI6yB1hjrB3WTVQwyYay6YAaSm5ONZdMANBNMemeXY4iLceNI0YgC5NgNSToAJRfEvjTDJTJw1RK1QmyrzcK/3Npt5dYWyCY29MxTKpuxCjuSAIyyTNcPTu1SvRRRqS1RBYfWcbxONqVCTUqM9yWPESRc+UgDdjf6TL2b+vD6Uy/xnltRuBcZR4tucsgPozACWRHDAFSGU6ggggjyInyUlQ7Rvl+MrpYU6tVADdSlR04D30MWz0+opk5B4e/aNXoAU8WjVxa3xA1qlweoOh08x08yepZZmFPE01rUm4qbC4PUHqCOhEANmTJkAyQ1tjJpDX+UwKuQeNx+OfT9ZXsMNZYPGZvXPp/mIMLvFeznRgw0k+RNasPMEflIiNJmWtaqvr+kYdIy46j2llo7SsZW20s9HaO9Jnb2pBSIW8EMcFTrMngmRG+XGwjdzIWwzdzLi+BFtomr0rGTaqSUjeiw6mDVOIdTHVdBaL6yRTI7igwTNx7mWPCXuIlwNLmj6gtrTTFnkb4Yaxog0i3DDURqi6TVlWhWassnIkbiIBXEHdYXUg7iRVQblA1l0wO0peUbxpnfiilgk4f4ldlulMba6XY9B95cuoiy3LUJv2i+J6VSl+64asHJe2ICqxTgAPLx7HmtoLzmLuP8Aibvf9fKbpSJ6TDLLd26ccdTUDWv/AOZgpmMEwbHpDKGXGL2h+tLcPT/q2+4jfDlbALqb62/SMcvyQObvLLgMipjZYrlDmFIcMnHZai7AAOAdbaTo3gfN8Ph0NF6nCzMOBbE8T2sbW6nT1tI8PlSEWCg9QABKt4typqPDUAsCbi231hjSyx07XTqBgGBuDtJJT/2f5s9aj8Oqxd0+VmN2ZL21PWx6+YlwlpeSDEnlMng2NPKY4V6ch8YG9dvSI8LvHHidr1nijDbyb2c6MraSLDmzqf7hJwNINezA+Y/OOlHRspO0tlHaVDJm0HtLfQ2j+CdtngrQtoMwhCrYTJkyMnHsRT5ZUcxJBPrLpifllNzUamRVwsqOTB2k7iRkSWnxPhV5o3pjURdhl5hGaDaaYMszTDDaOKY0ijDdI4p7TZhWMJC0nIkTiKiBng9SFOIO4k1UFZR80XftFy8XpYkEaj4TpY62uym/uR9Iyyn5veH+MsGtTA1HOhQLUU+YYae+0LN4jG6yjl+WYX4rkHYC4HnHyZcO0WeHWHxJbnUXnJleXdhjNFa4IDpCadADpCiBPAJG2mhGEW1o8wGpt9JX6T2MdZbUuYQVa8sQdd4s8dUQcOxtqLW9bxngdLQLxqhOHNu4H+JvOnNl2Xfs8xI+MVOhKHh7EOFf/wDLTpM434OrmnjaZJ5W4U12HEOEfdhOyS0PIJjzyn0hcDzD5THOyvTj3iP+M8VYfeNPEH8V/WLMPvJvZzo1XaB1d4ag0gdYR0oveQvcL7S64c6Si+G2uq+gl5w50Er4X1M0HaTtIGigrJk8mRk5BXqi0rePphiYTVxum8BeteGj2GfCiRrhReEtUmnFF6n7JaFEcQh/AIup1dRD0eVjNJyuzDDDaN6W0U4fpG9LaaMq9IkbiTESN4UQO4gtQQqpBqkiqgjKvm9428W/+319bci/96ae8UZUeaM/Fqs+DakgBL23PRGV9B1OkLZMbaJjcspI5nkCk1Bb1PpLdicQqi5IA84j8M4a3xGZgpXl2ZrHtpC6+ASozPUdiByqL2v56dzfQTjy1a78dzESuYU/6wZNTrK2xB9DKvi1oobKig7cztf6SXAVUUgjiQjcXuP+YepzLlZ+IDUz2l4gpUmsWueoUMbfSaUcOtRHPE3Khf5bXta4teI3tb8NQo31Cl216kwxxGWS+YLxvhrgH4gv/boJcKy0cdh2FOorKy6kbo24uNxtOT5Gq1AeIMvD1akHS+9jwC6+tiJf/DJJpkonw3uAjjWnZmC7X1BvqB272M0mXOmWWO5uKricO9GoLD8RGFtbDjQgjX1H3nZMPVDqrjZgGt2uLyl5hlavXVXVWZ1FQtzDidQVsBeyrsdr+cumHtwLbbhFvpLjPSWBZj8hhsBzM8h9JU7TenHs7N6j+sW4feMM4P4j/wCowDD7yPqvhsg0glcawyntBMQJV6TFu8LNyL6S94Y6Cc98Jvygf73nQMMdBHOivYgyNpIZG0YrW8yeTIE+ZS7d5ort3hPBpPFpwUGZ37zRne28NanpNTS5ZOz1CxK78Y16yw4ZybRAUsw9Y9wnSXijI+w3SOaO0S4bpHVHaaMq3MjaSGRtAQPUglWF1IJVkVUTZWeePM4BKJboxN//AIxBlh55YM6ps2GPD8wII9wRJzm8Kvx3Xkip4LD2fEC45nDabDiXX73kmKw6spPEST/JqnUXHF5cwm+X2vrozLzA7h1J/RhNqwZSSLEHdSND/gzj27/Ulr4JGsoQnoOIqR9jBjl3AyjTmYbKRyqQW/x7xrVZv6FU9+Jj9rCe4eg5PEbt0110EfsXquXhnKkrYaqoISof4bnXhcbadReKsxyGon4gQLTuVdUBsj31VwdR0PpaPvAWICO1NtC2qsfyhnjNquHUYmm4RncJVUWYMOHluDoRZO3Uyp+dlf1olyLCvTYMlSkdb8NmBHnrLph6BJVTYsWDtb+VEYNf/wCwUe57TnWGzVyQ1qam+pSmVP8A3W+06P4dro9O97ufmYm7N2v/AIGkMLujyyzHhDndF/nptwVEDcJte+x4T5G1veNMnxQq0UqAjmUE224uv3vAc1seJSbXHDftcbxhldJEpKqDhUXsO2s1nbnutDYtzZrIfSMTE+dvZD6S8Wd6cmzQ3dz/AHH84DQ3hmON2b1P5wOjvI+r+G9HaC4kQqhtB8RKvSZ2eeE31t5zo2FOgnMPDD85HmJ0vBNyx49Fexs0abAzx4zRTJ7MjS+cbaTFWbA6T1jYCBxqw5Z4Ryz1m5ZqX5ZFVCuoNR6xxhNhFFQ6+8b4TYS8UZH2F6R1Q2ibC7COaG00ZVuZG0lMiaAgapBaphVSB1pFVG+Wnnlzp4f4lNqfUjS/caj7ylZceeXvK9hHJuaK3WUsU/M6L0mBZOFgwvpa4Ok0xNRQt+k6DmuF+LQenYEsjKL9DbTXprOQLVY3U9wwHbuPtOTyeL1+u/xeb2vQfGZuAxsNAbf8SNM+qKQFuBfVdvzkNKg9mCqhdSfnUsD94blS02BOJVKbAgHlIBB0uPpFqfxXtlb2d4DxalJGZUZqrWRNVCr/AFe+33kNXOq+IFqnG9jcDidwptpa/lNKOBwV1c1KAvqSGW49iY+wmXGrTK4HiaoUt8SwSnTctqbnfl7RT+aLLnnaoviKyG4BXrYrv5To3gvMr4dXsQWdUAPUMNx5iUzOvDlTCpwVKj1arGzO7Frk9FvsNJb8iwhRMPT2APxG3HTT9frHqbHtfXlcFwxq1XuxCqFBAAuSf+I5RAoAGgGgi7J9Q7Hq1r97Af5MZEzaOa14xiDxA/IfSPWMrPiN+RvSXE1zTE7n1MEpbwrEQanvMmhrh9pDiRJsPtI8TL+I+ifDz2qe06ZgG5ROWZQ1qqzpmWvyiPEsuzZGmzyKmZK0YiKZPZkCfOy0habNTBmgqWnnxYw3ZBa084Ba0j+LPDWEA1ait9oxpIIsNYX3jSk+kcKmeGEcUNonw5jegdJbOpTImm5kbGFEDVDA6xhdQwKsZFXG2XHnl8yrYShZd88vmVbCVj0nLs7G05V4mwH7viXI0V/xKfbhdjxAehv7WnVBtKl44wHxaaEaOrHgPqNQfI2mflm8WnhysyiiUQAxI2OphlSmjC/1i5nNMlXHCbaA9D5mDrjHOg66XOms5NV3+0EvjqSkjia40sBa86P4Fx1k4AADe4F7kg9TOWYagoPG2pvf3lw8PY4JsArHXi20O+krUl4Tu2crj4gwwrOjbqNj66e/USCs/wAIWVbs1kQE6s5OgHYTbMceiIABdiQUA1Yk3I9AdYXlWBbiFatq+1NP6FOnEf7j9h7y5GVy40tGAo/DpqnYanux1J+t5OTI6DAi19RuO0kmjJo50lU8TvyN6S1VdpT/ABQ/IZXxF7UCvB6e8IrQdN5m1NMNtI8RNsPtPK8pH1Dgms6nznTcpe6icupGzA+Y/OdMyNrqIYlkfU5M0jQSRpVEQzJkyBPmatTqA7maCnUPUyy4/CWO0ioYTyheDkVisKi9TBXrP3Ms+PwlhtK/XpWMj2X68BPitfc7yzYFyQLmVp01liwGwmmLPJYMKdI6w50iTCnSOcOdJoyqRjI3MkaQuYUQPVMBrGF1DA6xmdXG+XHnl9yo6Cc/y888vuVHQSsek59no2lS8TZqgqphP52VqpPYKQAPU3P0lrZwFuSABuSbATlHjKqUxtPFj+Gb0yfLh0/KT5PzYvxfqUTj8IlUWYWYbMNDK8+X1KRNl+IvQjffXT6x+mIDC4myvrOKWx6FkqulCT/Df6HQx/k+HqEjgTXu9wAe5+8KQRnlj8wEcy5K48HuVZaqfiVD8SqQLuRovkg/lEbUKvEZ4q2T2gX70lJWqOwCrqbzZgCxectRzihRDclbDhXW+nEHext3/wAS+ziHhvFNmGdJWIPDTV3Uf0oo4VH/AFXnTzmBo4h6bH8NlWooJ+Um4NvK6kzTGXKMcr606rHSUnxW/KZaf39XuLEW67g37So+K0fhvwsRfcAkD/Eq42Qty1Ta0gTeT1ZCu8xaj8PtPK8yhMrSomhL6zo3h2pdB6Cc4MvfhapyL6R49ll0ulMyRpBRbSTmUURTJkyBON5gNZHhlkuP3+k0oQyVOgWaAWlSxW5lpzZtJUsQeYzL60nQSpvH2BOgiCqY8wB0E1xZZrFhDpHOGOkR4U6Rxhm0msY0QxkDmSMZC5iogeoYFVMLqTT90J+blH3kVpEGAPPLXh82WmLAFm+giNXRAAoAGxtv7955UU79OoEc4FkonM84qVCFd+S/yDRd/vPMwwq16TU26jQ9VPQj3ivEDY+d4ywNa44eo/LpC8icKjh8S9FjSqXDLp5EdCPKNaOKB6xjnGTpiBe/DUHyuNbeRHUSt1cHXo3414kG9RLlRrYX6r037zDLB0YeT4s9CqGEd5Hh+J79F1lHwOL6R/h82NMXDdJjrVb73FxzTOEpJYkeQnNvEfiB6l0B5ewg2bZs1QnUwbIcirY+oKdMEJf8SqRyoOtu58ptJaxtmMXz9juVlUrYxx85FKmTvwqeYj3J+keZ8fiV0YXsC1K4O/Dw3/6mYe0Y4p6eAwyUaQFwBTor3e3zEdhqT6QN6Ip06ZfVlu2u5ZtST53nX48fXlx55boulSKIeFjcjrrraw1irG5w6XWxubi4tvxH9LCNjU/D4upFxKvRpmtVF/lGp8tZaDR6OGxA4q1LhYJcul0diBrtofeJsR4bDFjhqq1FBF0qEIwv0DbN9pLj8w4ay8Hypdbd76GbO4p8SgaNYqeokZYY5LmWWJY+DqU/4iFex0Kn0YaGD1paFxQpsiknhZQDfUC47HSe4zAUKjBSqoWPK9PkO39J0Mi+L+Knk/qlNLh4UflES5pkNWjzAGpT/qUHiH+penrqIz8KPp7zKSzLlpbLjw6DhjpCoFhDpDekqlEcyezyBOQY+mSYPSpmSYjFAyAYkCXovbhBj8LxRI+VAmPquIBgxcSfWH7UnOTrDEwQUC0KaoJLcWlSRFta0BYRrhjpFgMOwx0lFRLNNHH9Rt+c9LW21PfoJFe/+ZNpzF7cDVRbpc7yJwQdSSPtPe4ntLmHCd+kS0VQDppJ6bXW3USFx0ntJrGAZiUuoMgJZCGX6d4ay3BHvIlW8ALw2LWoLj3HUGRY88RFO3EtQMGF7cQWxt+vtAHQ0zxLt1HlNMVUNlsSeFg/EDqoIt94X/Cn+lOMwrYdwNSpvwk76bg+YmtTF3Fo6xtL4yHn+I3zKGsG4rHZh+sXeHsvatiUp8BIB4qgsbqg0JtvuR9Zjlh/1P8AW8z/AOd/wNh8vNTnqN8On1c2uxH8qA7n8pff2e1TSStVvwYRF4KfGblnU3Zh9fvMzzIaa0yqglkUam51Oyg9NSBbzmiVkq0sNhqIHCiK1QjrUItwnvrxE+06MfHMa58/JcjbLi+LrmvUuKajkQ/yJvr5mwJk+a4ricDpewm2HdaSPY67eZubRLiMRxVEH936zdid5pX+HTsNyLD3EGw1P4NEsfnYfnJ8RR+JUBPyIt/UwPM8Rx2A2tEFdxDa8ULWv8RAT8ym3tB8SkGwtSzW7zPqtNbhlmuKAcG+wH5QjI3Z2bE1DyJZEB24m2+wP1ES4s3cx1j0+DQpUdmP41Qf3OOUH0UD6w3ujWot61A1gNbW9T1P6SJ8pVHNWnoG1qILDm/qFu/WL/DtUunMTp13sTqAe2kseCcsnEfSGUhY0RgtoaIJhxbSFCY1ri1nk9nkA+bXzYyE5sx2vFbtDcrolj8pMdypzGJ/36odlM1fFVbbGWTC5dcfL9pNXykkfLI9qfrFIq5k4MaYLGsyi81zXJnFyBB8IjIACJeNqcpFhw73EfYahwpr8x+w7RTklHi5jstrebdI9xZsunQ39v8Ado7SkDW0I7SASZaliD06+hmlVbQDw6yIHhaSBpFUiMRWW+veQASdDyekieP4TdWmkwGZCCtjrITSA2Asdx3kl54zwBe4KG3TcHylu8EUwA9cLeo5FFWABIAF7+l2H08pWcSAw8xqJePD+GNPAo1OxqFXcMTawLlmt58JH0lY63ynLrgL4nxoQCihu/8AO2ly3Um3t/sQbw/QWkrVCBoDb1MXYgh34j1F97/zNCK2KsnANNNZqj4KfEcSk+8EwHPWX/UJlU8KewEI8MU+KoW6KLwt5EnBvmeI+GOEbneKFfiF++kzOq/E51g9F9Le4j2WkNXY+8WobH3jLEHfz1iwbzOrhrkuD+PiEQ/KWBf/AEKOJvsJLnlf4lV36FjYdl6D6Q7wmnCuIrdUp8C9wXPD+QMV4jYk9TaVjO6VvMH4TGlKQp0wDVc8CcN+IcRAsR10vb1l+y9FFAKrBimjMDe7/wA33vOWpiCjcSnntwq3VAdCfI9Jf/AdQNh2S9yGN/cSc+tnjOTim2oPfQwxYvp6EjsdIwUzPJeLWZMmSTfLFFLkesuuSYEaGwnsyEPJcMNhFA2EIagOwmTII2T5rggQdBKdjcNwzJkqA5yNeGmp7kt97CF1anN6z2ZF9UCflJA27dp6XuoPsfUTJkcFaK2k1ZriZMioTUG6dxNWMyZHCaAzbimTIB4TNWMyZAB6+0t9HFlcHRClhdVRrE2II1Nvr9Z7Ml4doyJvjDjCkAjbXtxtb84RmKKDoLbXnsyX8qf4zGr+H5jUwrwu9kqHrp9ADMmQ+j4XY97u3kbSE1OH9ZkyFOJKxugMW31mTJNOLZkXLhKrf11VQ+gVj+sUY6wKnvxG3TQj/MyZLn5qb+glBONjc8o1Y9bCWb9n9djiSFPChRiV72ItMmSM+l49rvjF4Wv0k9FrqDMmTO/mKn6rbimTJkk3/9k=",
        "description": "As an instructor, I've been using this platform for a few months now, and I'm impressed with its functionality. It offers a wide range of tools for creating courses effectively. The analytics dashboard provides valuable insights into student engagement and performance. Highly recommended for anyone looking to teach online.",
        "rating": 4,
        "date": "2024-02-16"
      },
      {
        "review_id": 3,
        "profile_name": "Eva Martinez",
        "profile_type": "student",
        "profile_photo": "data:image/jpeg;base64,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",
        "description": "I've had a positive experience using this platform for my online courses. The interface is clean and organized, making it easy to access course materials and communicate with instructors. there's room for improvement in terms of expanding the course catalog.",
        "rating": 4,
        "date": "2024-02-17"
      },
      {
        "review_id": 4,
        "profile_name": "Michael Brown",
        "profile_type": "student",
        "profile_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1-qhn6EXFBqptExJB5AOIlXNHTEwm-G83Dw&usqp=CAU",
        "description": "The platform exceeded my expectations. It offers a diverse range of courses catering to various interests and skill levels. I've learned a lot and look forward to exploring more courses. 🔥",
        "rating": 5,
        "date": "2024-02-18"
      },
      {
        "review_id": 5,
        "profile_name": "Sarah Lee",
        "profile_type": "instructor",
        "profile_photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
        "description": "I've been using this platform to teach my courses for over a year, and I'm impressed with its capabilities. The platform's user-friendly interface allows me to easily create and manage course content. ",
        "rating": 4,
        "date": "2024-02-19"
      } 
     ]
  
  
    const perks = [
        {
            name: 'Flexible Learning',
            Icon: <IoMdBook />,
            description:
                'Access your learning materials instantly through our platform. Learn at your own pace and convenience.',
        },
        {
            name: 'Expert-Verified Courses',
            Icon: <GoShieldCheck />,
            description:
                'Every course on our platform is meticulously curated and verified by our team of education experts to ensure the highest quality standards. Not satisfied? We offer a 30-day satisfaction guarantee.',
        },
        {
            name: 'Educating for the Future',
            Icon: <LuGraduationCap />,
            description:
                'We are committed to education and the future. A percentage of our proceeds goes towards initiatives aimed at enhancing and advancing education globally.',
        },
    ];
    
  return (
    <div>
      <MaxWidthWrapper className={'mt-20'}>
        {/* section 01 */}
        <div className="flex justify-center container">
          <div
            className={` py-20 text-center flex flex-col items-center justify-center max-w-3xl gap-7 bg-${color.white}`}
          >
            <h1
              className={`text-4xl font-bold tracking-tight-[1.3em] sm:text-6xl leading-10 text-${color.black}`}
              style={{ lineHeight: "4.4rem" }}
            >
              Unlock Your Potential with Our{" "}
              <span className="text-blue-600">Coding Courses</span>.
            </h1>

            <p className={`mt-6 text-center font-[500] text-lg text-gray-500`}>
              Learn at your own pace, from anywhere in the world, and gain
              access to a wealth of resources. Our courses include hands-on
              projects, and personalized feedback from experienced
              instructors. Start your coding journey today!
            </p>
            <div className=" flex sm:flex-row flex-col gap-3 py-8">
              <a href="/about">
                <button className="bg-blue-600 rounded-md min-w-[200px] py-[10px] text-[15px] text-white font-[500] hover:bg-blue-700 transition-all duration-100">
                  Learn More
                </button>
              </a>
              <Link to={'/about'}>
              <button className="bg-gray-200 rounded-md min-w-[200px] py-[10px] text-[15px] font-[500] hover:bg-slate-200 flex justify-center items-center transition-all duration-300 gap-2">
                Our Quality Promise
                <FaArrowRightLong className="mt-[0.9px]" />
              </button>
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <section className="border-gray-200 bg-gray-900">
        <MaxWidthWrapper>
          <div className="flex py-8 justify-center flex-wrap item-center gap-14">
            {perks.map((item) => (
              <div className="flex flex-col items-center max-w-[300px] gap-3 ">
                <div className="bg-blue-300 rounded-full h-14 w-14 flex items-center justify-center text-blue-600 text-[23px]">
                  {item.Icon}
                </div>
                <p className="text-[17px] font-[500] text-gray-200">
                  {item.name}
                </p>
                <p className="text-[14px] text-center text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section>
        <CodeBlock
          position={"lg:flex-row"}
          heading={"Start coding in seconds "}
          subheading={
            "Immerse yourself in a hands-on learning environment, where you'll actively write real code from your very first lesson, ensuring a comprehensive and engaging experience. "
          }
          btn1={"Try it Yourself"}
          btn1href={"/courses"}
          btn2={"Learn more"}
          btn2href={"/about"}
          codeColor={"text-green-400"}
          code={
            '<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> \n<a href="/one">One</a> <a href="/two">Two</a> \n<a href="/three">Three</a>\n</nav>\n</body>'
          }
          backgroundGradient={"bg-gradient-green"}
          
        />

        <CodeBlock
          heading={"Unlock Your coding potential with our online courses"}
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          btn1={"Start Learning"}
          btn1href={"/courses"}
          btn2={"Learn more"}
          btn2href={"/about"}
          codeColor={"text-yellow-300"}
          code={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
          backgroundGradient={"bg-gradient-yellow"}
          position={"lg:flex-row-reverse"}
        />
      </section>

      <section className="bg-blue-100 overflow-hidden">
        <ExploreMore />
      </section>

      <section>
        <LearningSection />
      </section>

      <section>
       <MaxWidthWrapper>
        <h2 className="text-[26px] mt-[30px] font-bold mb-8 text-center">Educators and Students Reviewes</h2>
         <div >
         <Swiper
         slidesPerView={1}
         spaceBetween={10}
         autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
         loop={true}
         modules={[FreeMode, Pagination,Autoplay]}
         breakpoints={{
          500:{
            slidesPerView:2
          },
          768:{
            slidesPerView:3
          },
           1100: {
             slidesPerView: 4,
           },
         }}
         className="mySwiper"
      >
      {
        
        <ul className="flex justify-center items-center">
           {review.map(review => (
            <SwiperSlide key={review.review_id}>
              <li className="shadow-md items-center border-[1.4px] p-6 border-gray-400 pb-4 mb-4 min-h-[340px] max-w-[290px] cursor-pointer rounded-md">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center">
                  <img src={review.profile_photo} alt={review.profile_name} className="h-full w-full object-cover " />
                  </div>
                  <div className="flex flex-col mb-1 mx-3">
                    <h3 className="text-lg font-bold mr-2">{review.profile_name}</h3>
                    <p className="text-[14px] text-gray-500">{review.profile_type}</p>
                  </div>
                  </div>
                  <p className="text-[14px] font-[500] text-gray-600 min-h-[170px] my-5">{review.description}</p>
              </li>
            </SwiperSlide>
          ))}
      </ul>
      }
      </Swiper>
        </div>
      </MaxWidthWrapper>
      </section>

      <section>
        <InstructorSection />
      </section>
    </div>
  );
}

export default Home;
