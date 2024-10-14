import axios from "axios";
import { useEffect, useState } from "react";
import Category from "./Category";
import PlusSign from "../../public/Icons/PlusSign";
import AddCategory from "./AddCategory";
const categoryURL = "http://localhost:8000/category";

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

  const removeCategory = (id) => {
    axios
      .post(`http://localhost:8000/removeCategory`, { categoryId: id })
      .then(function (response) {
        console.log(response);
        getCategories();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSelectCategory = (selectedCategory) => {
    const updatedCategories = categories.map((category) => {
      if (category.categoryid === selectedCategory.categoryid) {
        return {
          ...category,
          selected: !category?.selected,
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
              selected={category?.selected}
              key={index}
              onSelect={() => onSelectCategory(category)}
              remove={() => removeCategory(category.categoryid)}
            />
          ))}
        </div>
        <AddCategory getCategories={() => getCategories()} />
      </div>
    </div>
  );
};
