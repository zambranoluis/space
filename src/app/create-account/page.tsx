'use client'

import {
  validateText,
validateTextWithSpaces,
validateNumber,
validateEmail,
validatePassword
} from "@/utils/validation";

import React, { useState, useRef, useEffect, useCallback } from "react";

import axios from "axios";
import { apiService } from "@/services/apiService";



import { Image } from "@nextui-org/image";
import Link from "next/link";

import { IoMdArrowDropdown } from "react-icons/io";
import { GrSkype } from "react-icons/gr";

import { DatePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone, DateValue, } from "@internationalized/date";




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

interface Customer {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  }[];
  skype: string;
  address: string;
  birthdate: string;
}

const CreateAccount = () => {


  const [formData, setFormData] = useState<Customer>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: [
      {
        areaCode: "",
        number: "",
      }
    ],
    skype: "",
    address: "",
    birthdate: "",
  });


  const [selectedCode, setSelectedCode] = useState<number>(26);
  const [areaCode, setAreaCode] = useState<string>("+1");
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

  const handleSelectCode = (id: number, code: string) => {
    setSelectedCode(id);
    setAreaCode(code);
    setIsListVisible(false);
  }

  const handleBuildPhone = (phoneNumber: string) => {
    setFormData({ ...formData, phone: [{ areaCode: areaCode, number: phoneNumber }] });
  }

  
  const [isLoadingCustomer, setIsLoadingCustomer] = useState<boolean>(false); // Estado de carga
  const [errorCustomer, setErrorCustomer] = useState<string | null>(null); // Estado de error


  const handleCreateAccount = async () => {
    try {
      setIsLoadingCustomer(true);
      setErrorCustomer(null);
      const response = await apiService.createCustomer(formData);
      console.log("response peticion createCustomer en create account", response);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorCustomer(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else {
        setErrorCustomer("Error: No se pudo obtener los extras.");
      }
    } finally {
      setIsLoadingCustomer(false);
    }
  };


  return (
    <main className="flex w-full min-h-screen bgred-500">
      <div className="flex w-full max-lg:relative">
        <div
          className="w-[40%] max-lg:w-full max-lg:absolute h-full bgblue-400 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('https://github.com/BPM94/SCCTMD/raw/main/opt/createAccountBG.webp')" }}
        >
        </div>
        <div className="w-[60%] h-full bggreen-400 max-lg:w-full z-[100]">
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col lg:h-full lg:bg-white">
              <div className="w-full h-[15%] flex justify-center items-center bgred-500">
                <Link href="/">
                  <Image
                    src="https://github.com/BPM94/SCCTMD/raw/main/logoGreen.png"
                    alt="logo"
                    className="h-full"
                  />
                </Link>
              </div>
              <div className="flex  overflow-y-auto bgred-400">
                <form
                  className="flex flex-col w-full h-full bgorange-300"
                >
                  <div id="fields" className="flex flex-col w-[80%] h-full  place-self-center"
                  >
                    <div id="name-lastname" className="flex w-full bgblue-500">
                      <div id="name" className="flex w-full p-2 bgrose-400">
                        <input
                          id="fieldName"
                          className="bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                          type="text"
                          placeholder="First Name"
                          onChange={(e) => {if (validateTextWithSpaces(e.target.value)) setFormData({ ...formData, name: e.target.value })}}
                        />
                      </div>
                      <div id="lastname" className="flex w-full p-2 bgpurple-500">
                        <input
                          id="fieldLastName"
                          className="bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                          type="text"
                          placeholder="Last Name"
                          onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        />
                      </div>
                    </div>
                    <div id="email" className="flex w-full p-2">
                      <input
                        id="fieldEmail"
                        className="bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div id="password" className="flex flex-col w-full">
                      <div id="createPassword" className="flex w-full p-2">
                        <input
                          id="fieldPassword"
                          className="bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                          type="text"
                          placeholder="Create Password"
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                      <div id="confirmPassword" className="flex w-full p-2">
                        <input
                          id="fieldConfirmPassword"
                          className="bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                          type="text"
                          placeholder="Confirm Password"
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>
                    <div id="phone" className="flex w-full p-2 gap-2">
                      <div id="areaCode" className="flex bgred-400 w-[120px] items-center justify-center text-[#828282] border border-[#828282] rounded-full  max-lg:bg-white max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] relative z-[500]" >
                        <div ref={selectRef} id="selected" className="flex gap-1 p-1 items-center justify-center w-[120px] h-full cursor-pointer" onClick={handleShowCodesList} >
                          <p className="text-xs">{areaCodes[selectedCode].code}</p>
                          <Image className="w-[35px] rounded-md" src={areaCodes[selectedCode].flag} alt="" />
                          <IoMdArrowDropdown className="text-xl" />
                        </div>
                        {isListVisible && (
                          <div ref={listRef} id="list" className="flex  flex-col w-[140px] absolute top-[55px] bg-white rounded-md px-2 py-4 gap-4 max-h-[180px] overflow-y-scroll border border-[#6d786f]">
                            {areaCodes.map((country) => (
                              <div
                                key={country.id}
                                className="flex gap-1 cursor-pointer border-b border-[#828282] items-center w-full hover:bg-primary hover:text-white justify-between p-2"
                                onClick={() => {handleSelectCode(country.id - 1, country.code);}}
                              >
                                <Image className="w-[35px] rounded-md" src={country.flag} alt="" />
                                <p className="text-sm">{country.code}</p>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                      <input
                        id="fieldPhone"
                        className="bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                        type="text"
                        placeholder="Phone"
                        onChange={(e) => {handleBuildPhone(e.target.value)}}
                      />
                    </div>
                    <div id="skype" className="flex w-full p-2">
                      <div className="flex w-full p-2 bgred-300 rounded-full border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] max-lg:bg-white max-w-[350px]">
                        <div className="flex items-center justify-center w-[70px]">
                          <GrSkype className="text-3xl text-[#08b2f0]" />
                        </div>
                        <div className="flex w-full">
                          <input
                            id="fieldSkype"
                            className="bg-white text-[#828282] w-full h-full outline-none"
                            type="text"
                            placeholder="Skype"
                            onChange={(e) => setFormData({ ...formData, skype: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    <div id="address" className="flex w-full p-2">
                      <input
                        id="fieldAddress"
                        className="bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                        type="text"
                        placeholder="Address"
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div id="birthdate" className="flex w-[60%] p-2 max-w-[300px]">
                      <input
                        id="fieldBirthdate"
                        className="bg-white w-full max-w-[200px] p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                        type="date"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            birthdate: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div
                    id="submit"
                    className="flex items-center justify-center w-full mt-2 p-2 bgrose-400"
                  >
                    <button
                      className="px-12 py-2 font-bold text-white bg-[#5ea789] rounded-bl-2xl rounded-tr-2xl hover:bg-green-800 max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCreateAccount();
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex items-center justify-center w-full bgred-300 lg:h-[10%] lg:bg-[#353535]">
              <p className="text-white max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]">
                Already Registered?{" "}
                <Link href="/login" className="font-bold">
                  Login here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateAccount;
