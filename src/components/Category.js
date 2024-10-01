import { useState } from "react";
import EyeIcon from "../../public/Icons/EyeIcon";
import ClosedEyeIcon from "../../public/Icons/ClosedEyeIcon";

const MyCategories = (props) => {
  const { categoryName, ischecked } = props;
  const [checked, setChecked] = useState("true");
  const handleClick = () => {
    if (checked === "true") {
      setChecked("false");
    } else {
      setChecked("true");
    }
  };
  const icon = checked === "true" ? <EyeIcon /> : <ClosedEyeIcon />;
  return (
    <div
      onClick={() => handleClick()}
      className="w-full pl-3 py-1.5 flex gap-2 items-center"
    >
      {icon}
      <p className="font-normal text-base text-[#1F2937]">{categoryName}</p>
    </div>
  );
};

export default MyCategories;
