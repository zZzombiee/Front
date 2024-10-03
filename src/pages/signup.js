import Link from "next/link";
import { useState } from "react";
import Logo from "../../public/Icons/Logo";
import axios from "axios";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const signUpClick = () => {
    if (password !== rePassword) {
      setMessage("RePassword is wrong");
      setMessageColor("#F54949");
      setRePassword("");
    } else if (password.length < 8) {
      setMessage("Password must at least have 8 characters");
      setMessageColor("#F54949");
      setRePassword("");
      setPassword("");
    } else {
      console.log(email, name, password);
      axios
        .post("http://localhost:8000/signup", {
          email: email,
          firstName: name,
          password: password,
          img: "https://i.pravatar.cc/300",
        })
        .then(function (response) {
          console.log(response);
          router.push("/signin");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRePassword = (event) => {
    setRePassword(event.target.value);
  };
  return (
    <div className="flex w-screen h-screen">
      <div className="w-3/5 bg-[#FFFFFF] flex  justify-center items-center">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex gap-[10px] items-center justify-center">
            <Logo />
            <p className="text-black font-bold text-xl"> Geld</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-[#0F172A] font-semibold text-2xl">
              Create Geld account
            </p>
            <p className="text-[#334155] font-normal text-base">
              Sign up below to create your Wallet account
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <input
              onChange={handleName}
              value={name}
              className="px-4 py-3 w-full rounded-lg bg-[#F3F4F6] border border-[#D1D5DB]"
              placeholder="Name"
            />
            <input
              onChange={handleEmail}
              value={email}
              className="px-4 py-3 w-full rounded-lg bg-[#F3F4F6] border border-[#D1D5DB]"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={handlePassword}
              type="password"
              className="px-4 py-3 w-full rounded-lg bg-[#F3F4F6] border border-[#D1D5DB]"
              placeholder="Password"
            />
            <input
              value={rePassword}
              onChange={handleRePassword}
              type="password"
              className="px-4 py-3 w-full rounded-lg bg-[#F3F4F6] border border-[#D1D5DB]"
              placeholder="Re-password"
            />
            <p style={{ color: messageColor }}>{message}</p>
            <button
              onClick={() => signUpClick()}
              className="bg-[#0166FF] justify-center font-normal text-xl flex items-center text-white text-center py-2.5 w-full rounded-3xl"
            >
              Sign up
            </button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <p className="text-[#0F172A] font-normal text-base">
              Already have account?
            </p>
            <Link href={"./signin"}>
              <p className="text-[#0166FF] font-normal text-base">Sign in</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-2/5 bg-[#0166FF]"> </div>
    </div>
  );
};

export default SignUp;
