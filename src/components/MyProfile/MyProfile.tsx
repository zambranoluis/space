"use client";

import { area, option } from "framer-motion/client";
import { FaUserCircle } from "react-icons/fa";
import { Image } from "@nextui-org/image";

const areaCodes = [
  {
    id: 1,
    name: "Argentina",
    code: "+54",
    abreviation: "AR",
    flag: "/flags/argentina.png",
  },
  {
    id: 2,
    name: "Aruba",
    code: "+297",
    abreviation: "AW",
    flag: "/flags/aruba.png",
  },
  {
    id: 3,
    name: "Australia",
    code: "+61",
    abreviation: "AU",
    flag: "/flags/australia.png",
  },
  {
    id: 4,
    name: "Bahamas",
    code: "+1242",
    abreviation: "BS",
    flag: "/flags/bahamas.png",
  },
  {
    id: 5,
    name: "Barbados",
    code: "+1246",
    abreviation: "BB",
    flag: "/flags/barbados.png",
  },
  {
    id: 6,
    name: "Bolivia",
    code: "+591",
    abreviation: "BO",
    flag: "/flags/bolivia.png",
  },
  {
    id: 7,
    name: "Brazil",
    code: "+55",
    abreviation: "BR",
    flag: "/flags/brazil.png",
  },
  {
    id: 8,
    name: "Canada",
    code: "+1",
    abreviation: "CA",
    flag: "/flags/canada.png",
  },
  {
    id: 9,
    name: "Chile",
    code: "+56",
    abreviation: "CL",
    flag: "/flags/chile.png",
  },
  {
    id: 10,
    name: "Colombia",
    code: "+57",
    abreviation: "CO",
    flag: "/flags/colombia.png",
  },
  {
    id: 11,
    name: "Costa Rica",
    code: "+506",
    abreviation: "CR",
    flag: "/flags/costa-rica.png",
  },
  {
    id: 12,
    name: "Cuba",
    code: "+53",
    abreviation: "CU",
    flag: "/flags/cuba.png",
  },
  {
    id: 13,
    name: "Ecuador",
    code: "+593",
    abreviation: "EC",
    flag: "/flags/ecuador.png",
  },
  {
    id: 14,
    name: "El Salvador",
    code: "+503",
    abreviation: "SV",
    flag: "/flags/el-salvador.png",
  },
  {
    id: 15,
    name: "Guatemala",
    code: "+502",
    abreviation: "GT",
    flag: "/flags/guatemala.png",
  },
  {
    id: 16,
    name: "Haiti",
    code: "+509",
    abreviation: "HT",
    flag: "/flags/haiti.png",
  },
  {
    id: 17,
    name: "Honduras",
    code: "+504",
    abreviation: "HN",
    flag: "/flags/honduras.png",
  },
  {
    id: 18,
    name: "Jamaica",
    code: "+1876",
    abreviation: "JM",
    flag: "/flags/jamaica.png",
  },
  {
    id: 19,
    name: "Mexico",
    code: "+52",
    abreviation: "MX",
    flag: "/flags/mexico.png",
  },
  {
    id: 20,
    name: "Nicaragua",
    code: "+505",
    abreviation: "NI",
    flag: "/flags/nicaragua.png",
  },
  {
    id: 21,
    name: "Panama",
    code: "+507",
    abreviation: "PA",
    flag: "/flags/panama.png",
  },
  {
    id: 22,
    name: "Paraguay",
    code: "+595",
    abreviation: "PY",
    flag: "/flags/paraguay.png",
  },
  {
    id: 23,
    name: "Peru",
    code: "+51",
    abreviation: "PE",
    flag: "/flags/peru.png",
  },
  {
    id: 24,
    name: "Puerto Rico",
    code: "+1939",
    abreviation: "PR",
    flag: "/flags/puerto-rico.png",
  },
  {
    id: 25,
    name: "Suriname",
    code: "+597",
    abreviation: "SR",
    flag: "/flags/suriname.png",
  },
  {
    id: 26,
    name: "Trinidad and Tobago",
    code: "+1868",
    abreviation: "TT",
    flag: "/flags/trinidad-and-tobago.png",
  },
  {
    id: 27,
    name: "United States",
    code: "+1",
    abreviation: "US",
    flag: "/flags/united-states.png",
  },
  {
    id: 28,
    name: "Uruguay",
    code: "+598",
    abreviation: "UY",
    flag: "/flags/uruguay.png",
  },
  {
    id: 29,
    name: "Venezuela",
    code: "+58",
    abreviation: "VE",
    flag: "/flags/venezuela.png",
  }


]

const MyProfile = () => {
  return (
    <section className="flex flex-col wfull  bgred-500 max-w-[500px] justify-center items-center w-[80%] place-self-center py4 gap6">
      <div className="text-center text-[#6d786f]  bg-white w-full sticky top-0">
        <div className="flex justify-center items-center">
          < FaUserCircle className="text-[100px] " />
        </div>
        <div>
          <h1 className="font-bold">arkweb@gmail.com</h1>
          <h2 className="">Claudia Alves</h2>
          <p className="">Client</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 py-6 bgred-200 w-full">
        <form className="bg-[#f3f3f3] rounded-3xl flex flex-col w-full justify-center items-center gap-4  p-8">
          <div className="flex w-full" id="firstName">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="First Name"/>
          </div>
          <div className="flex w-full" id="lastName">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Last Name" />
          </div>
          <div className="flex w-full" id="email">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Email" />
          </div>
          <div className="flex max-md:flex-col w-full gap-2" id="phone">
            <div id="areaCode" className="bgred-300 rounded-full border border-[#6d786f] w-[100px] h-[50px]">
              <select className="w-full h-full rounded-full bg-white border border[#6d786f] text-[#6d786f]" name="" id="" >
                {
                  areaCodes.map((code) => (
                    <option className="text-[#6d786f]" key={code.id} value={code.code} >
                      <p>{code.code}</p>
                      <Image src={code.flag} alt="" />
                    </option>

                  ))
                }
              </select>
            </div>
            <div id="number" className="w-full md:w-[calc(100%-100px)] flex">
              <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Phone Number" />
            </div>
          </div>
          <div className="flex w-full" id="adress">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Adress" />
          </div>
          <div className="flex justify-center items-center">
            <button onClick={(e) => {e.preventDefault();}} className="bg-[#6d786f] text-sm text-white rounded-tl-2xl rounded-br-2xl px-4 py-2">
              Save Changes
            </button>
          </div>
        </form>

        <form className="bg-[#f3f3f3] rounded-3xl flex flex-col w-full justify-center items-center gap-4  p-8">
          <div className="flex w-full" id="currentPassword">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Current Password" />
          </div>
          <div className="flex w-full" id="newPassword">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="New Password" />
          </div>
          <div className="flex w-full" id="confirmPassword">
            <input className="bg-white text-black pl-8 border border-[#6d786f] outline-none h-[50px] rounded-full w-full" type="text" placeholder="Confirm Password" />
          </div>
          <div className="flex justify-center items-center">
            <button onClick={(e) => {e.preventDefault();}} className="bg-[#6d786f] text-sm text-white rounded-tl-2xl rounded-br-2xl px-4 py-2">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MyProfile;