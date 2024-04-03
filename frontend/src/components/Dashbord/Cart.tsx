import ReactStars from "react-stars";
import IconButton from "../buttons/IconButton";
import { MdOutlineDelete } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/Store";
import { LuShoppingCart } from "react-icons/lu";
import { removeCart } from "../../redux/slice/cartSlice";
import { buyCourse } from "../../api/api-function/payment-api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {cart} = useSelector((state:RootState)=> state.cart);
  const {totalMoney} = useSelector((state:RootState)=> state.cart);
  const {totalItems} = useSelector((state:RootState)=> state.cart);
  const {token} = useSelector((state:RootState)=>state.auth);
  const {User} = useSelector((state:RootState)=>state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const removeCartItem = (courseData:any)=>{
      dispatch(removeCart(courseData));
  }
  
  const buyCart = async()=>{
    const courseId: (string | number)[] = [];
    cart.forEach((course:any) => {
       courseId.push(course._id);
    });
    await buyCourse(courseId ,token,User,dispatch,navigate);
    
  }

  return (
    <div className="mb-[100px]">
    <div className="mt-[30px] mb-[20px] ">
      <h2 className="text-[27px] font-bold my-[10px]">Your Cart</h2>
      <div className="text-[18px] font-[600] text-slate-600">Total items in your cart {totalItems}</div>
    </div>
    {/* checkout  */}
      <div className={`${cart?.length == 0 ? 'hidden':null}rounded-md lg:hidden flex w-full justify-between bg-sky-50 p-3 mb-5 border-[0.3px] border-gray-300`}>
          <div className="flex items-center">
            <p className="text-[18px] font-[600]">Total: ₹{totalMoney}</p>
          </div>
          <IconButton
            text={'Buy Now'}
            childern={<BiLock />}
            onClick={() => buyCart()}
          />
     </div>
    {totalItems !== 0 ? (
      <div className="flex flex-col sm:flex-row gap-4 overflow-x-auto">
        <div className="flex flex-col gap-8 flex-grow overflow-x-auto">
          {cart.map((item: any) => (
            <div key={item._id} className="flex w-full flex-row justify-between border items-center rounded-md">
              <div className="sm:h-[170px] h-[100px] sm:w-[430px] w-[250px]">
                <img
                  src={item.thumbnail}
                  alt="thumbnail"
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
              <div className="flex sm:flex-row flex-col w-full items-center sm:mx-0 mx-4">
                <div className="flex sm:flex-col flex-row gap-1 w-full mx-6 ">
                  <div className="flex flex-col ">
                    <ReactStars
                      count={5}
                      value={3}
                      edit={false}
                      size={24}
                      color2={"#ffd700"}
                    />
                    <div className="flex flex-col sm:gap-3 gap-1">
                      <div>
                        <h2 className=" sm:text-[19px] text-[15px] font-[500]">
                          {item.couresName.slice(0, 60)}..
                        </h2>
                        <p className="sm:block hidden font-[400] text-[14px] text-gray-500">
                          {item.courseDescription.slice(0, 90)} ...
                        </p>
                      </div>
                      <p className="text-gray-600 font-[500] sm: text-[12px]">
                        By: <span className="text-black">{item.instructor.firstName}{" "}{item.instructor.lastName}</span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* button and price */}
                <div className="flex mb-[2px] gap-3 sm:justify-center justify-between items-center w-full sm:flex-col flex-row mx-5">
                  <div className="text-center sm:font-[600] font-[700] sm:text-[21px] text-[16px]">
                    <span className="text-gray-800 ">Rs.</span> {item.price}
                  </div>
                  <div>
                    <IconButton
                      text={"remove"}
                      childern={<MdOutlineDelete />}
                      onClick={() => removeCartItem(item)}
                      className={
                        " border-[2px] py-2 border-red-500 bg-red-400 hover:bg-red-200 hover:text-red-700 sm:flex hidden"
                      }
                    />
                    <div
                      onClick={() => removeCartItem(item)}
                      className="sm:hidden block bg-red-200 p-[4px] text-red-800 rounded-md">
                      <MdOutlineDelete className="text-[20px] " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* checkout components */}
        <div className="lg:flex hidden  flex-col gap-3 min-w-[260px] p-[20px] bg-blue-200 bg-opacity-60 border rounded-[5px] py-8">
          <h2 className="text-[20px] text-blue-700 items-center font-[500]">Checkout</h2>
          <div className="mb-[5px]">
            <p className="text-[16px]">Total :</p>
            <h2 className="text-[23px] font-bold">Rs. {totalMoney}</h2>
          </div>
          <IconButton
            text={'Buy Now'}
            childern={<BiLock />}
            onClick={() => buyCart()}
          />
        </div>
      </div>
    ) : (
      <div className="border w-full h-[400px] flex flex-col justify-center gap-4 items-center bg-gray-100 rounded-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-500 text-center">Browse our courses and add items to your cart.</p>
        <IconButton path={'/Courses'} text={'Explore Courses'} childern={<LuShoppingCart />} />
      </div>
    )}
  </div>
  
  );
};

export default Cart;
