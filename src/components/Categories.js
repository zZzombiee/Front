import axios from "axios";
import { useEffect, useState } from "react";
import MyCategories from "./Category";
import PlusSign from "../../public/Icons/PlusSign";
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
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
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

  const addCategory = async () => {
    await axios
      .post(categoryURL, {
        categoryName: categoryName,
        description: description,
        img: img,
      })
      .then(function (response) {
        console.log(response);
        getCategories();
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(categoryName, description);
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
        <label className="flex gap-4 flex-col">
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="categoryName"
            onChange={(e) => setCategoryName(e.target.value)}
          ></input>
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            placeholder="img"
            onChange={(e) => setImg(e.target.value)}
          ></input>
        </label>
        <div className="flex gap-2 py-1.5 pl-3 items-center">
          <button className="btn mx-10" onClick={addCategory}>
            <PlusSign color={"#0166FF"} />
            add category
          </button>
        </div>
      </div>
    </div>
  );
};
