import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import FoodExpense from "../../public/Icons/FoodExpenseIcon";
import Drink from "../../public/Icons/Drink";
import Gift from "../../public/Icons/Gift";
import Shopping from "../../public/Icons/Shopping";
import Taxi from "../../public/Icons/Taxi";
import RentIcon from "../../public/Icons/RentIcon";
import axios from "axios";

const AddRecord = (props) => {
  const { onCloseModal } = props;
  const [incomeExpense, setIncomeExpense] = useState("EXP");
  const [categories, setCategories] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [description, setDescription] = useState();
  const [categoryId, setCategoryId] = useState([]);

  const getCategories = () => {
    axios
      .get("http://localhost:8000/category")
      .then(function (response) {
        const categoryName = response.data.categories.map(
          (category) => category.categoryname
        );
        const categoryId = response.data.categories.map((category) => category);
        setCategories(categoryName);
        setCategoryId(categoryId);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postTransaction = () => {
    axios
      .post("http://localhost:8000/transaction", {
        userID: localStorage.getItem("userid"),
        recordName: categories,
        amount: amount,
        transaction_type: incomeExpense,
        description: description,
        categoryID: selectedCategory,
      })
      .then(function (response) {
        console.log(response.data.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(selectedCategory);

  useEffect(() => getCategories(), []);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleIncomeOrExpense = (props) => {
    const { name } = props;
    setIncomeExpense(name);
    if (incomeExpense === "EXP") {
      setIncomeExpense("INC");
    } else {
      setIncomeExpense("EXP");
    }
  };

  const handleAdd = () => {
    onCloseModal;
    postTransaction();
  };

  const Expensebackground = incomeExpense === "EXP" ? "#0166FF" : "#F3F4F6";
  const Incomebackground = incomeExpense === "INC" ? "#16A34A" : "#F3F4F6";
  const buttonColor = incomeExpense === "INC" ? "#16A34A" : "#0166FF";
  const textColorIncome = incomeExpense === "INC" ? "text-white" : "text-base";
  const textColorExpense = incomeExpense === "EXP" ? "text-white" : "text-base";

  return (
    <div className="w-[792px] flex flex-col rounded-xl  border-b border-[#E2E8F0] bg-slate-200">
      <div className="py-5 px-6 flex justify-between">
        <p className="font-semibold text-xl">Add Record</p>
        <IoClose size={24} onClick={onCloseModal} />
      </div>
      <div className="flex w-full">
        <div className="px-6 pt-5 pb-6 flex flex-col gap-5">
          <div className="rounded-[100px] bg-[#F3F4F6] flex gap-1">
            <div
              onClick={() => handleIncomeOrExpense("EXP")}
              className={`py-2 px-[55.5px] ${textColorExpense} font-normal text-base rounded-3xl bg-[${Expensebackground}]`}
              style={{ backgroundColor: Expensebackground }}
            >
              Expense
            </div>
            <div
              onClick={() => handleIncomeOrExpense("INC")}
              className={`py-2 px-[55.5px] ${textColorIncome} font-normal text-base rounded-3xl bg-[${Incomebackground}]`}
              style={{ backgroundColor: Incomebackground }}
            >
              Income
            </div>
          </div>
          <div className="flex flex-col mb-3 gap-[22px]">
            <div className="flex flex-col py-3 px-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-xl">
              <p className="font-normal text-base"> Amount </p>
              <input
                value={amount}
                onChange={handleAmount}
                type="number"
                placeholder="₮ 000.00"
                className="font-normal text-xl bg-[#F3F4F6]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p> Category </p>
              <select
                className="bg-[#F9FAFB] py-3 px-4 text-base font-normal border border-[#D1D5DB] rounded-lg"
                value={selectedCategory}
                onChange={handleSelectedCategory}
              >
                <option disabled>Find or choose category</option>
                {categoryId.map((category, index) => {
                  return (
                    <option key={index} value={category.categoryid}>
                      {category.categoryname}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            onClick={() => handleAdd()}
            className={`bg-[${buttonColor}] flex items-center justify-center py-2 rounded-3xl text-white`}
            style={{ backgroundColor: buttonColor }}
          >
            Add Record
          </button>
        </div>
        <div className="flex flex-col gap-2 px-6 pb-6 pt-[18px] w-full ">
          <p className="text-[#1F2937]">Description</p>
          <textarea
            value={description}
            onChange={handleDescription}
            placeholder="Write here"
            className="bg-[#F3F4F6] pt-4 pl-4 border border-[#D1D5DB] w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AddRecord;
