import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import PlusSign from "../../public/Icons/PlusSign";
import AddRecord from "@/components/AddRecord";
import { Categories } from "@/components/Categories";
import Records from "../components/Records";
import axios from "axios";

const Home = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState(true);
  const [sortText, setSortText] = useState("Newest First");

  const hadnleCategories = (category) => {
    setCategories(category);
  };

  const getRecords = () => {
    const userid = localStorage.getItem("userid");

    if (sort === true) {
      axios
        .post("http://localhost:8000/gettransaction", {
          userID: userid,
        })
        .then(function (response) {
          setRecords(response.data.data);
          setFilteredRecords(response.data.data);
          setSortText("Latest First");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:8000/gettransactionlatest", {
          userID: userid,
        })
        .then(function (response) {
          setRecords(response.data.data);
          setFilteredRecords(response.data.data);
          setSortText("Newest First");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => getRecords(), [sort]);

  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState("All");

  const handleExpense = () => {
    const filtered = records.filter((record) =>
      record.transaction_type.includes("EXP")
    );
    setFilteredRecords(filtered);
  };
  const handleIncome = () => {
    const filtered = records.filter((record) =>
      record.transaction_type.includes("INC")
    );
    setFilteredRecords(filtered);
  };
  const handleAll = () => {
    setFilteredRecords(records);
  };
  const handleChange = (option) => {
    setSelected(option);
  };
  const handleSort = (option) => {
    setSort(!option);
  };
  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div>
      {showAdd && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <AddRecord
            getRecords={() => getRecords()}
            onCloseModal={() => handleAdd()}
          />
        </div>
      )}
      <div className={`bg-[#F3F4F6] flex flex-col gap-8 items-center relative`}>
        <Navbar handleAdd={() => handleAdd()} />
        <div className="flex gap-6">
          <div className="bg-white flex flex-col px-6 py-4 w-[282px] gap-6 rounded-xl h-fit border border-[#E5E7EB]">
            <div className="flex flex-col gap-6">
              <p> Records </p>
              <button
                onClick={() => handleAdd()}
                className="flex gap-1 w-[225px] btn min-h-10 h-10 bg-[#0166FF] hover:bg-[#0130ff] rounded-3xl text-white items-center justify-center"
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
            records={filteredRecords}
            categories={categories}
            getRecords={() => getRecords()}
            sort={() => handleSort(sort)}
            sortText={sortText}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
