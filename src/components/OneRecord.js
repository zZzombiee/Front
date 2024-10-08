import moment from "moment";

const OneRecord = (props) => {
  const { recordname, image, createdat, amount, transaction_type } = props;
  let iconColor = "";
  let color = "";
  let symbol = "";
  if (transaction_type === "EXP") {
    (iconColor = "#FF4545"), (symbol = "-"), (color = "#F54949");
  } else {
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
          {image}
        </div>

        <div className="flex flex-col">
          <p className="font-normal text-base">{recordname}</p>
          <p className="font-normal text-xs text-[#6B7280]">
            {moment({ createdat }).format("llll")}
          </p>
        </div>
      </div>
      <p className={`font-semibold text-base text-[${color}]`}>
        {symbol}
        {amount}$
      </p>
    </div>
  );
};

export default OneRecord;
