import IncomeLogo from "../../public/Icons/IncomeLogo";
import ExpenseLogo from "../../public/Icons/ExpenseLogo";
import Navbar from "@/components/Navbar";
import Income from "@/components/Income";
import axios from "axios";
import { useEffect, useState } from "react";
import OneRecord from "@/components/OneRecord";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const getRecords = () => {
    const userid = localStorage.getItem("userid");
    axios
      .post("http://localhost:8000/gettransaction", {
        userID: userid,
      })
      .then(function (response) {
        console.log(response);
        setRecords(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => getRecords(), []);

  return (
    <div className="bg-[#F3F4F6] flex flex-col gap-8 items-center h-full">
      <Navbar />
      <div className="flex flex-col gap-6 w-full max-w-screen-xl">
        <div className="flex gap-6">
          <div className="w-full rounded-[18px] bg-[#0166FF]"></div>
          <Income
            color={"#84CC16"}
            title={"Your Income"}
            money={"1,200,000₮"}
            text={"Your Income Amount"}
            description={"32% from last month"}
            icon={<IncomeLogo />}
          />
          <Income
            color={"#0166FF"}
            title={"Your Expense"}
            money={"-1,200,000₮"}
            text={"Your Expense Amount"}
            description={"32% from last month"}
            icon={<ExpenseLogo />}
          />
        </div>
      </div>
      <div className="px-6"></div>
      <div className="flex w-full gap-6 max-w-screen-xl h-60">
        <div className="w-1/2 bg-white rounded-xl">
          <div className="py-4 pl-6">
            <p className="font-semibold text-base"> Income - Expense</p>
          </div>
          <div className="pt-8 py-6"></div>
        </div>
        <div className="w-1/2 bg-white rounded-xl ">
          <div className="px-6 py-4 justify-between flex">
            <p className="font-semibold text-base">Income - Expense</p>
            <p className="font-normal text-base">Jun 1 - Nov 30</p>
          </div>
          <div className="px-4 py-6">
            <div className="w-20 h-20 bg-red-400 rounded-full flex justify-center items-center">
              <div className="w-10 h-10 rounded-full bg-white"></div>
            </div>
            <div> </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-xl bg-white rounded-xl">
        <p className="font-semibold text-base p-4 border-b-2 border-[#F3F4F6]">
          last Records
        </p>
        {records.map((record, index) => {
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
    </div>
  );
};

export default Dashboard;
