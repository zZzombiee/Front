import IncomeLogo from "../../public/Icons/IncomeLogo";
import ExpenseLogo from "../../public/Icons/ExpenseLogo";
import Navbar from "@/components/Navbar";
import Income from "@/components/Income";

const Dashboard = () => {
  return (
    <div className="bg-[#F3F4F6] flex flex-col gap-8 items-center">
      <Navbar />
      <div className="flex flex-col gap-6 w-full px-[120px]">
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
      <div className="px-6">
        <div className="w-full">
          <p className="font-semibold text-base py-4"> last Records </p>
        </div>
      </div>
      {/* <div className="flex gap-6 px-[120px]">
        <div className="w-full bg-white">
          <div className="py-4 pl-6">
            <p className="font-semibold text-base"> Income - Expense</p>
          </div>
          <div className="pt-8 py-6">
            <img src="/images/Income.png" />
          </div>
        </div>
        <div className="w-full bg-white">
          <div className="px-6 py-4 justify-between flex">
            <p className="font-semibold text-base">Income - Expense</p>
            <p className="font-normal text-base">Jun 1 - Nov 30</p>
          </div>
          <div className="pt-8 py-6">
            <img src="/images/Expense.png" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
