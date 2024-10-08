import { useEffect, useState } from "react";
import OneRecord from "../components/OneRecord";
import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";

const Records = (prams) => {
  const { selected, myRecords } = prams;
  console.log(myRecords);

  return (
    <div className="w-[894px] flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="w-8 h-8 rounded-lg p-1.5 bg-[#E5E7EB]">
            <FaChevronLeft />
          </div>
          <p className="font-normal text-base"> Last 30 Days</p>
          <div className="w-8 h-8 rounded-lg p-1.5 bg-[#E5E7EB]">
            <FaAngleRight />
          </div>
        </div>
        <select className="w-[180px] py-3 px-4 rounded-lg font-semibold text-base text-[#1F2937] border border-[#D1D5DB]">
          <option value={selected}>Newest First</option>
          <option> Latest First </option>
        </select>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-base"> Today </p>
        <div className="flex flex-col gap-3 mb-3">
          {myRecords.map((record, index) => {
            return (
              <OneRecord
                key={index}
                recordname={record.categoryname}
                image={record.category_img}
                createdat={record.createdat}
                amount={record.amount}
                transaction_type={record.transaction_type}
              />
            );
          })}
        </div>
        <p className="font-semibold text-base"> Yesterday </p>
      </div>
    </div>
  );
};
export default Records;
