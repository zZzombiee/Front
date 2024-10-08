import axios from "axios";
import { useEffect, useState } from "react";
import MyCategories from "./Category";
import PlusSign from "../../public/Icons/PlusSign";
import AddCategory from "./AddCategory";
const categoryURL = "http://localhost:8000/category";

// const categories = [
//   "Food & Drinks",
//   "Lending & Renting",
//   "Shopping",
//   "Housing",
//   "Transportation",
//   "Vehicle",
//   "Life & Entertainment",
//   "Communication, PC",
//   "Financial expenses",
//   "Investments",
//   "Income",
//   "Others",
// ];

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [selectedEyes, setSelectedEyes] = useState("true");
  const [checkedCategories, setCheckedCategories] = useState(categories);
  const [selectedCategories, setSelectedCategories] = useState(categories);

  const handleCategory = (input, index) => {
    let myCategories = [...selectedEyes];
    if (input == "true") {
      myCategories[index] = "false";
    } else {
      myCategories[index] = "true";
    }
    setSelectedEyes(myCategories);
    let filteredCategories = [];
    for (let i = 0; i < categories.length; i++) {
      if (selectedEyes[i] == "true") {
        filteredCategories.push(selectedCategories[i]);
      }
    }
    setCheckedCategories();
  };

  const getCategories = () => {
    axios
      .get(categoryURL)
      .then(function (response) {
        const categoryName = response.data.categories.map(
          (category) => category.categoryname
        );
        setCategories(categoryName);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => getCategories(), []);

  return (
    <div className="flex gap-3 flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="font-semibold text-base">Category</p>
          <p className="font-normal text-base opacity-20"> Clear </p>
        </div>
        <div className="flex flex-col gap-2">
          {categories.map((category1, index) => {
            return (
              <div
                key={index}
                onClick={() => handleCategory(selectedEyes[index], index)}
              >
                <MyCategories categoryName={category1} />
              </div>
            );
          })}
        </div>

        <AddCategory />
      </div>
    </div>
  );
};
