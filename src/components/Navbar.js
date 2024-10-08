import axios from "axios";
import Logo from "../../public/Icons/Logo";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [img, setImg] = useState("");

  const getUser = () => {
    const userid = localStorage.getItem("userid");
    if (userid) {
      axios
        .post(`http://localhost:8000/user`, {
          userid: userid,
        })
        .then(function (response) {
          setImg(response.data.message[0].avatar_img);
        })
        .catch(function (error) {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.warn("user not found");
    }
  };

  useEffect(() => getUser(), []);

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
          <img src={`${img}`} className="rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
