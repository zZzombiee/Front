import { categoryIconByCategoryName } from "@/util/findCategoryIcon";
import moment from "moment";

const OneRecord = (props) => {
  const { recordname, createdat, amount, transaction_type, remove } = props;

  const icon = categoryIconByCategoryName(props);

  let iconColor = "";
  let color = "";
  let symbol = "";

  if (transaction_type === "EXP") {
    (iconColor = "#FF4545"), (symbol = "-"), (color = "red");
  } else if (transaction_type === "INC") {
    (iconColor = "#0166FF"), (symbol = "+"), (color = "#23E01F");
  }

  return (
    <div className="w-full px-6 py-3 border bg-white border-[#E5E7EB] items-center justify-between flex rounded-xl">
      <div className="flex gap-4">
        <div
          className={`flex justify-center items-center w-10 h-10 rounded-full bg-[${iconColor}]`}
          style={{
            backgroundColor: iconColor,
          }}
        >
          {icon?.image}
        </div>

        <div className="flex flex-col">
          <p className="font-normal text-base">{recordname}</p>
          <p className="font-normal text-xs text-[#6B7280]">
            {moment(createdat).format("llll")}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <p
          className={`font-semibold text-base`}
          style={{
            color: color,
          }}
        >
          {symbol}
          {amount} ₮
        </p>
        <button onClick={remove}>X</button>
      </div>
    </div>
  );
};

export default OneRecord;
