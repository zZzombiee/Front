import axios from "axios";
import { useEffect, useState } from "react";
import Category from "./Category";
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

export const Categories = (props) => {
  const { categories, hadnleCategories } = props;

  const getCategories = () => {
    axios
      .get(categoryURL)
      .then(function (response) {
        const categories = response.data.categories.map((category) => {
          return {
            ...category,
            selected: true,
          };
        });
        hadnleCategories(categories);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => getCategories(), []);

  const onSelectCategory = (selectedCategory) => {
    const updatedCategories = categories.map((category) => {
      if (category.categoryid === selectedCategory.categoryid) {
        return {
          ...category,
          selected: !category.selected,
        };
      }

      return category;
    });

    hadnleCategories(updatedCategories);
  };

  return (
    <div className="flex gap-3 flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="font-semibold text-base">Category</p>
          <p className="font-normal text-base opacity-20"> Clear </p>
        </div>
        <div className="flex flex-col gap-2">
          {categories.map((category, index) => (
            <Category
              categoryName={category.categoryname}
              selected={category.selected}
              key={index}
              onSelect={() => onSelectCategory(category)}
            />
          ))}
        </div>
        <AddCategory />
      </div>
    </div>
  );
};

// const categories = [
//   {
//     categoryid: 1,
//     categoryname: "Food",
//     description: "This is a food",
//     createdat: "2024-09-26T19:56:35.338Z",
//     updatedat: "2024-09-26T19:56:35.338Z",
//     category_img: "Icon",
//     selected:true
//   },
// ];

// const categories = response.data.categories.map((category) => {
//   return {
//     ...category,
//     selected: true,
//   };

// const numbers = [1, 1, 2];

// const filteredNumbers = numbers.filter((number) => {
//   const category = formattedCategories.find(
//     (category) => category.id === number.categoryId
//   );
//   return category.selected;
// });
