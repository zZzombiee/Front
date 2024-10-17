import FoodExpense from "../../public/Icons/FoodExpenseIcon";
import RentIcon from "../../public/Icons/RentIcon";
import Shopping from "../../public/Icons/Shopping";
import Drink from "../../public/Icons/Drink";
import Gift from "../../public/Icons/Gift";
import Taxi from "../../public/Icons/Taxi";

const icons = [
  {
    image: <RentIcon />,
    name: "Lending & Renting",
  },
  {
    image: <FoodExpense />,
    name: "Food & Drinks",
  },
  {
    image: <Shopping />,
    name: "Shopping",
  },
  {
    image: <Drink />,
    name: "Transportation",
  },
  {
    image: <Gift />,
    name: "Life & Entertainment",
  },
];

export const categoryIconByCategoryName = (props) => {
  const icon = icons.find((icon) => icon.name === props.recordname);
  return icon;
};

export default icons;
