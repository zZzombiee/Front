import { useState } from "react";
import EyeIcon from "../../public/Icons/EyeIcon";
import ClosedEyeIcon from "../../public/Icons/ClosedEyeIcon";

const Category = (props) => {
  const { categoryName, selected, onSelect } = props;

  const icon = selected ? <EyeIcon /> : <ClosedEyeIcon />;
  return (
    <div
      onClick={onSelect}
      className="w-full pl-3 py-1.5 flex gap-2 items-center cursor-pointer"
    >
      {icon}
      <p className="font-normal text-base text-[#1F2937]">{categoryName}</p>
    </div>
  );
};

export default Category;
