import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Tooltip } from "@mantine/core";

import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => {
  return (
    <Tooltip label={title} withArrow>
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </Tooltip>
  );
};

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    // what handleResize does is to set the screen size to the present screen size.
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    // this is a cleanup function that removes the event listener when the component is unmounted.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  // handle active menu set the active menu toggles.
  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title={"menu"}
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title={"cart"}
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title={"Chat"}
          dotColor={"#03c9D7"}
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <NavButton
          title={"Notification"}
          dotColor={"rgb(254, 201, 15)"}
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <Tooltip>
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              alt="user-profile"
              src={avatar}
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span> {""}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
            </p>
          </div>
        </Tooltip>

        {isClicked.notification && <Notification />}
        {isClicked.cart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
