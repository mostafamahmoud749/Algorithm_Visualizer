export default function Axis({ children }) {
  return (
    <div className="relative h-full w-full ">
      {/* bars */}
      <div className="h-full  w-full flex justify-evenly items-end">
        {children}
      </div>
      {/* X-axis */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black">
        <div className="absolute -right-2 -top-[4.5px] w-0 h-0 border-t-[5px] border-b-[5px] border-r-[5px] border-l-10 border-t-transparent border-b-transparent border-r-transparent border-l-black"></div>
      </div>

      {/* Y-axis */}
      <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-black">
        <div className="absolute -top-3 -left-1 w-0 h-0 border-l-[5px] border-t-[5px] border-r-[5px] border-b-10 border-l-transparent border-r-transparent border-t-transparent border-b-black"></div>
      </div>
    </div>
  );
}
