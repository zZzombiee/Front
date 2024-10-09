import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import PlusSign from "../../public/Icons/PlusSign";
import AddRecord from "@/components/AddRecord";
import { Categories } from "@/components/Categories";
import Records from "../components/Records";
import RentIcon from "../../public/Icons/RentIcon";
import FoodExpense from "../../public/Icons/FoodExpenseIcon";
import axios from "axios";

// const records = [
//   [
//     {
//       color: "#23E01F",
//       image: <RentIcon />,
//       createdat: "14:00",
//       description: "Lending & Renting",
//       amount: "+ 1,000₮",
//       iconColor: "#0166FF",
//     },
//   ],
//   [
//     {
//       color: "#23E01F",
//       image: <FoodExpense />,
//       createdat: "14:00",
//       description: "Lending & Renting",
//       amount: "+ 1,000₮",
//       iconColor: "#FF4545",
//     },
//   ],
// ];

// - [ ] Category img
// - [ ] Record createdat
// - [ ] Record type
// - [ ] Record amount
// - [ ] Record name
// - [ ] Category name

// const record = {
//   amount: 150000,
//   categoryid: 1,
//   createdat: "2024-10-06T18:37:51.150Z",
//   description: "weekly fod",
//   recordid: 10,
//   recordname: "food",
//   transaction_type: "EXP",
//   userid: 2,
// };
const Home = () => {
  const [myRecords, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [categories, setCategories] = useState([]);

  const hadnleCategories = (category) => {
    setCategories(category);
  };

  const getRecords = () => {
    const userid = localStorage.getItem("userid");

    axios
      .post("http://localhost:8000/gettransaction", {
        userID: userid,
      })
      .then(function (response) {
        setRecords(response.data.data);
        setFilteredRecords(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => getRecords(), []);

  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState("All");

  const handleExpense = () => {
    const filtered = myRecords.filter((record) =>
      record.transaction_type.includes("EXP")
    );
    setFilteredRecords(filtered);
  };
  const handleIncome = () => {
    const filtered = myRecords.filter((record) =>
      record.transaction_type.includes("INC")
    );
    setFilteredRecords(filtered);
  };
  const handleAll = () => {
    setFilteredRecords(myRecords);
  };
  const handleChange = (option) => {
    setSelected(option);
  };

  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div>
      {showAdd && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <AddRecord onCloseModal={handleAdd} />
        </div>
      )}
      <div className={`bg-[#F3F4F6] flex flex-col gap-8 items-center relative`}>
        <Navbar />
        <div className="flex gap-6">
          <div className="bg-white flex flex-col px-6 py-4 w-[282px] gap-6 rounded-xl h-fit border border-[#E5E7EB]">
            <div className="flex flex-col gap-6">
              <p> Records </p>
              <button
                onClick={() => handleAdd()}
                className="flex gap-1 w-[225px] bg-[#0166FF] rounded-3xl text-white items-center justify-center"
              >
                <PlusSign color="white" /> Add
              </button>
            </div>
            <input
              placeholder="Search"
              className="border border-[#D1D5DB] rounded-lg px-4 py-1"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-[#1F2937] mb-3">
                Types
              </p>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <input
                  type="checkbox"
                  checked={"All" === selected}
                  className="checkbox"
                  onChange={() => handleChange("All")}
                  onClick={() => handleAll()}
                />
                All
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <input
                  type="checkbox"
                  checked={"Income" === selected}
                  className="checkbox"
                  onChange={() => handleChange("Income")}
                  onClick={() => handleIncome()}
                />
                Income
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <input
                  type="checkbox"
                  checked={"Expense" === selected}
                  className="checkbox"
                  onChange={() => handleChange("Expense")}
                  onClick={() => handleExpense()}
                />
                Expense
              </div>
            </div>
            <Categories
              hadnleCategories={hadnleCategories}
              categories={categories}
            />
          </div>
          <Records
            selected={selected}
            myRecords={filteredRecords}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
