import axios from "axios";
import { useState } from "react";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await axios.get("http://localhost:8000/api/category");
    res.data.categories.map((category, index) => {
      console.log(category.categoryname);
    });
  };

  const addCategory = async (nameValue, description, img) => {
    const res = await axios.post("http://localhost:8000/api/category", {
      categoryName: nameValue,
      description: description,
      img: img,
    });
    console.log(res);
  };

  return (
    <div>
      <h1>Categories</h1>
      <button className="btn btn-primary" onClick={getCategories}>
        get categories
      </button>
      <label>
        <input type="text" placeholder="categoryName"></input>
        <input type="text" placeholder="description"></input>
        <input type="text" placeholder="img"></input>
        <button
          className="btn btn-primary mx-10"
          // onClick={addCategory nameValue = {"sos"} description = "help"}
        >
          add category
        </button>
      </label>
    </div>
  );
};
