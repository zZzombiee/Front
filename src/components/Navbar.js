import axios from "axios";
import Logo from "../../public/Icons/Logo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = (props) => {
  const { handleAdd } = props;
  const [img, setImg] = useState("");
  const router = useRouter();
  const [userid, setUserid] = useState("");

  const getUser = () => {
    const userid = localStorage.getItem("userid");
    setUserid(userid);
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
      router.push("/signin");
    }
  };

  useEffect(() => getUser(), [userid]);

  return (
    <div className="bg-white w-full px-[120px] py-4 flex justify-between max-w-screen-xl">
      <div className="flex gap-6 items-center">
        <Logo />
        <p className="cursor-pointer"> Dashboard </p>
        <p className="cursor-pointer"> Records</p>
      </div>
      <div className="flex items-center gap-6">
        <button
          className="bg-[#0166FF] py-1.5 px-3 text-white rounded-3xl text-base"
          onClick={handleAdd}
        >
          + Record
        </button>
        <div className="dropdown">
          <div>
            <img
              tabIndex={0}
              src={`${img}`}
              className="rounded-full btn p-0"
              role="button"
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li
              onClick={() => {
                localStorage.removeItem("userid"), setUserid("");
              }}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
