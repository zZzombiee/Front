import { useEffect, useState } from "react";
import OneRecord from "../components/OneRecord";
import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";
import axios from "axios";

const Records = (prams) => {
  const { selected, myRecords, categories, getRecords } = prams;

  const filteredRecord = myRecords.filter((record) => {
    const category = categories.find(
      (category) => category.categoryid === record.categoryid
    );
    return category.selected;
  });

  const removeRecord = (id) => {
    axios
      .post(`http://localhost:8000/removeTransaction`, { recordid: id })
      .then(function (response) {
        console.log(response);
        getRecords();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          {filteredRecord.map((record, index) => {
            return (
              <OneRecord
                key={index}
                recordname={record.categoryname}
                createdat={record.createdat}
                amount={record.amount}
                transaction_type={record.transaction_type}
                remove={() => removeRecord(record.recordid)}
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
