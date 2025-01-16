"use client";
import React, { useEffect, useState, useRef } from "react";
import { area, option } from "framer-motion/client";
import { FaUserCircle } from "react-icons/fa";
import { Image } from "@nextui-org/image";
import { IoMdArrowDropdown } from "react-icons/io";

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
  const [selectedCode, setSelectedCode] = useState<number>(26);
  const [isListVisible, setIsListVisible] = useState<boolean>(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node) &&
          listRef.current && !listRef.current.contains(event.target as Node)) {
        setIsListVisible(false); // Cerrar la lista si se hace clic fuera
      }
    };

    // Agregar el event listener al hacer clic fuera
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowCodesList = () => {
    setIsListVisible(!isListVisible);
  }

  const handleSelectCode = (id: number) => {
    setSelectedCode(id);
    setIsListVisible(false);  // Cerrar la lista después de seleccionar
  }
  
  return (
    <section className="flex flex-col wfull  bgred-500 max-w-[500px] justify-center items-center w-[80%] place-self-center py4 gap6">
      <div className="text-center text-[#6d786f]  bg-white w-full sticky top-0 z-[100]">
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
            <div id="areaCode" className="w-[120px] relative h-[50px] rounded-full bg-white border border-[#6d786f]  text-[#6d786f]  noScrollBar"  >
              <div ref={selectRef} id="selected" className="flex gap-1 p-1 items-center justify-center w-[120px] h-full cursor-pointer" onClick={handleShowCodesList}>
                <p className="text-xs">{areaCodes[selectedCode].code}</p>
                <Image className="w-[35px] rounded-md" src={areaCodes[selectedCode].flag} alt="" />
                <IoMdArrowDropdown className="text-xl" />
              </div>
              {isListVisible && (
                <div ref={listRef} id="list" className="flex flex-col w-[140px] absolute top-[55px] bg-white rounded-md px-2 py-4 gap-4 max-h-[180px] overflow-y-scroll border border-[#6d786f]">
                  {areaCodes.map((country) => (
                    <div
                      key={country.id}
                      className="flex gap-1 border-b cursor-pointer border-[#828282] items-center w-full hover:bg-primary hover:text-white justify-between p-2"
                      onClick={() => handleSelectCode(country.id - 1)}
                    >
                      <Image className="w-[35px] rounded-md" src={country.flag} alt="" />
                      <p className="text-sm">{country.code}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div id="number" className="w-full md:w-[calc(100%-120px)] flex">
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