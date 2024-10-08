import axios from "axios";
import { useState } from "react";
import PlusSign from "../../public/Icons/PlusSign";
import Shopping from "../../public/Icons/Shopping";
import Taxi from "../../public/Icons/Taxi";
const categoryURL = "http://localhost:8000/category";

const AddCategory = (props) => {
  const {} = props;
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

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

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        <PlusSign color={"#0166FF"} />
        add category
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">Add Category</h3>
          <label className="flex gap-4">
            <select
              className="bg-[#F9FAFB] py-3 w-20 px-4 text-base font-normal border border-[#D1D5DB] rounded-lg"
              onChange={(e) => setImg(e.target.value)}
            >
              <option value="" disabled selected>
                Icons
              </option>
              <option value="shopping">Shopping</option>
              <option value="taxi">Taxi</option>
            </select>

            <input
              className="input input-bordered w-full "
              type="text"
              placeholder="Category Name"
              onChange={(e) => setCategoryName(e.target.value)}
            />

            {/* <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            /> */}
          </label>
          <div className="pt-8">
            <button className="btn w-full" onClick={addCategory}>
              add
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AddCategory;
