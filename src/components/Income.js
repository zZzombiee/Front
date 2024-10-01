const Income = (props) => {
  const { color, title, money, text, description, icon } = props;
  return (
    <div className="flex flex-col rounded-xl bg-white w-full">
      <div className="flex gap-2 py-6 pl-6 items-center">
        <div className={`bg-[${color}] w-2 h-2 rounded-full`}></div>
        <p className="font-semibold text-base text-[#0F172A]"> {title} </p>
      </div>
      <div className="flex flex-col py-6 pl-6">
        <p className="font-semibold text-4xl mb-1"> {money} </p>
        <p className="font-normal text-lg text-[#64748B] mb-4"> {text} </p>
        <div className="flex gap-2 items-center">
          {icon}
          <p className="font-normal text-lg"> {description} </p>
        </div>
      </div>
    </div>
  );
};
export default Income;
