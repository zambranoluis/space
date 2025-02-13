"use-client"

const projectType = [
  {
    name: "1 Area Basic Frontyard",
    time: "8 hrs"
  },
  {
    name: "1 Area Basic Backyard",
    time: "10 hrs"
  },
  {
    name: "1 Area Pro Frontyard",
    time: "12 hrs"
  },
  {
    name: "1 Area Pro Backyard",
    time: "14 hrs"
  },

  {
    name: "2 Area Basic",
    time: "16 hrs"
  },
  {
    name: "2 Area Pro",
    time: "18 hrs"
  },
]


const WorkCalendar = () => {
  return (
    <section className="bgred-300 w-[90%] place-self-center p-4 gap-4 flex flex-col overflow-y-auto noScrollBar">
      <div id="calendarHeader" className="flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
        <div className="flex max-sm:border-b-2 max-sm:border-b-[#d5d5d5] sm:border-r-2 sm:border-r-[#d5d5d5] p-2 flex-col sm:w-[50%] justify-center items-center bgblue-300">
          <div className="text-xl font-black text-center text-[#6d786f]">Work Calendar</div>
          <div className="text-xs text-center text-black">Here you can see your Work Calendar</div>
        </div>
        <div className="flex p-2 sm:w-[50%] bggreen-300 max-sm:text-center justify-center items-center text-[#909c9d] text-xs">
          Here you can see a refference table with the assigned hours for each project type
        </div>
      </div>
      <div id="Packages" className="flex flex-col bgred-400">
        <div className="flex border-2 py-4 border-[#6d786f] text-[#6d786f] text-xl font-black justify-center items-center">Packages</div>
        <div className="flex flex-col w-[90%] place-self-center bgyellow-400">
          <div id="packagesType" className="bgred-300 justifycenter items-center flex flex-col gap-1 p-2 overflow-y-scroll h-[215px] ">
            {
              projectType.map((item, index) => (
                <div key={index} className="flex gap-1  w-full bgblue-300 justify-center items-center max-sm:flex-col">
                  <div className={`${index % 2 === 0 ? "bg-[#f3f3f3]" : "bg-[#f1efea]"} text-black py-4 max-sm:w-full text-xs max-sm:text-center w-full w[40%] flex justify-center items-center`}>{item.name}</div>
                  <div className={`${index % 2 === 0 ? "bg-[#f3f3f3]" : "bg-[#f1efea]"} text-black py-4 max-sm:w-full text-xs max-sm:text-center w-[30%] flex justify-center items-center`}>{item.time}</div>
                </div>
              ))
            }
          </div>
          <div id="projectNumber" className="flex w-full gap-2  bgred-200 place-self-center p-2 max-md:flex-col ">
            <div className="max-md:w-full w-[30%] h-[60px] bgblue-300 text-black text-sm p-2 flex justify-center items-center max-sm:text-center">type your project number here</div>
            <div className="max-md:w-full  w-[70%] h-[60px] bggreen-400 p2">
              <input className="h-full w-full text-black bg-white border-3 border-[#f3f3f3] " type="text" />
            </div>
          </div>
          <div className="flex w-full bgred-800 justify-end gap-2 p-2">
            <button className="w-[150px] border-2 border-[#727d74] text-white flex justify-center items-center py-2 bg-[#727d74] font-bold">Submit</button>
          </div>
        </div>

      </div>
      <div id="Hours" className="flex flex-col gap-8">
        <div className="flex py-4 bg-[#99a09a] drop-shadow-xl text-white text-xl font-black justify-center items-center text-center px-2">Worked Hours 01/01/2025 - 15/01/2025</div>
        <div className="flex flex-col gap-2">
          <div className="border-2 border-[#727d74] min-h-[100px] w-[90%] place-self-center rounded-3xl">

          </div>
          <div className="flex w-[90%] bgred-300 place-self-center justify-end gap-2">
            <div className="w-[150px] border-2 border-[#727d74] text-[#c6caca] flex justify-center items-center py-2">Total</div>
            <div className="flex justify-center items-center text-black text-sm p-2 font-bold">
              20 hrs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkCalendar;