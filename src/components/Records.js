import { useEffect, useState } from "react";
import OneRecord from "../components/OneRecord";
import { FaChevronLeft, FaAngleRight } from "react-icons/fa6";
import axios from "axios";

const Records = (prams) => {
  const { records, categories, getRecords, sort, sortText } = prams;
  const x = "x";
  const filteredRecord = records.filter((record) => {
    const category = categories.find(
      (category) => category.categoryid === record.categoryid
    );
    return category?.selected;
  });

  const removeRecord = (id) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/removeTransaction`, {
        recordid: id,
      })
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
        <button
          className=" py-3 px-4 rounded-lg font-semibold text-base bg-[#E5E7EB] text-[#1F2937] border border-[#D1D5DB] btn"
          value={sort}
          onClick={sort}
        >
          {sortText}
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-base"> Transactions </p>
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
                x={x}
              />
            );
          })}
        </div>
        {/* <p className="font-semibold text-base"> Yesterday </p> */}
      </div>
    </div>
  );
};
export default Records;
