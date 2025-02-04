"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

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
  },
];

interface AreaCodeSelectorProps {
  setAreaCode: (code: string) => void;
  handleBuildPhone: (field:string, value: string) => void
}
const AreaCodeSelector: React.FC<AreaCodeSelectorProps> = ({setAreaCode, handleBuildPhone}) => {
  const [selectedCode, setSelectedCode] = useState<number>(26);
    const [isListVisible, setIsListVisible] = useState<boolean>(false);
  
    const selectRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const handleShowCodesList = () => {
      setIsListVisible(!isListVisible);
    };

    const handleSelectCode = (id: number, code: string) => {
      setSelectedCode(id);
      setAreaCode(code);
      handleBuildPhone("areaCode", code);
      setIsListVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            selectRef.current &&
            !selectRef.current.contains(event.target as Node) &&
            listRef.current &&
            !listRef.current.contains(event.target as Node)
          ) {
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

  return (
    <div
      id='areaCode'
      className='flex h-full bgred-400 w-[120px] items-center justify-center text-[#828282] bg-white border border-[#828282] rounded-full  max-lg:bg-white max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] relative z-[500]'>
      <div
        tabIndex={0}
        ref={selectRef}
        id='selected'
        className='flex gap-1 p-1 items-center justify-center w-[120px] h-full  rounded-3xl cursor-pointer z-[10]'
        onClick={handleShowCodesList}>
        <p className='text-xs'>{areaCodes[selectedCode].code}</p>
        <Image
          className='w-[35px] rounded-md'
          src={areaCodes[selectedCode].flag}
          alt=''
        />
        <IoMdArrowDropdown className='text-xl' />
      </div>
      {isListVisible && (
        <div
          ref={listRef}
          id='list'
          tabIndex={0}
          className='flex  flex-col w-[140px] absolute top-[55px] bg-white rounded-md px-2 py-4 gap-4 max-h-[180px] overflow-y-scroll border border-[#6d786f]'>
          {areaCodes.map((country) => (
            <div
              key={country.id}
              className='flex gap-1 cursor-pointer border-b border-[#828282] items-center w-full hover:bg-primary hover:text-white justify-between p-2'
              onClick={() => {
                handleSelectCode(country.id - 1, country.code);
              }}>
              <Image
                className='w-[35px] rounded-md'
                src={country.flag}
                alt=''
              />
              <p className='text-sm'>{country.code}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AreaCodeSelector;