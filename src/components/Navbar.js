import axios from "axios";
import Logo from "../../public/Icons/Logo";
import { useEffect } from "react";
const Navbar = () => {
  // const getUser = () => {
  //   axios
  //     .get("/user", { userid: 4 })
  //     .then(function (response) {
  //       console.log(userid);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => getUser(), []);
  return (
    <div className="bg-white w-full px-[120px] py-4 flex justify-between max-w-screen-xl">
      <div className="flex gap-6 items-center">
        <Logo />
        <p> Dashboard </p>
        <p> Records</p>
      </div>
      <div className="flex items-center gap-6">
        <button className="bg-[#0166FF] py-1.5 px-3 text-white rounded-3xl text-base">
          + Record
        </button>
        <div className="rounded-full w-10 h-10">
          <img src={`${""}`} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
