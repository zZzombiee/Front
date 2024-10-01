import Logo from "../../public/Icons/Logo";

const Navbar = () => {
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
        <div className="rounded-full w-10 h-10 bg-[url('/images/Profile.jpeg')]"></div>
      </div>
    </div>
  );
};

export default Navbar;
