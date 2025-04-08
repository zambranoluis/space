"use client";

import React, { useState } from "react";

import {
  validateText,
  validateTextWithNumbers,
  validateTextWithSpaces,
  validateTextWithNumbersSpaces,
  validateNumber,
  validateEmail,
  validatePassword,
  validateSkype,
  validateDate,
} from "@/utils/validation";

import { Image } from "@heroui/image";
import Link from "next/link";

import { GrSkype } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import AreaCodeSelector from "@/components/AreaCodeSelector";

import { Spinner } from "@heroui/react";

interface Customer {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  };
  skype: string;
  address: string;
  birthdate: string;
}

interface SectionProps {
  setAreaCode: React.Dispatch<React.SetStateAction<string>>;
  handleCreateAccount: () => void;
  formData: Customer;
  setFormData: React.Dispatch<React.SetStateAction<Customer>>;
  isLoadingCustomer: boolean;
  togglePassword: (source: string) => void;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const Section: React.FC<SectionProps> = ({
  setAreaCode,
  handleCreateAccount,
  formData,
  setFormData,
  isLoadingCustomer,
  togglePassword,
  showPassword,
  showConfirmPassword,
}) => {
  const [errorMessages, setErrorMessages] = useState({
    name: {
      error: "Name can only contain letters and spaces, minimum 1 characters",
      valid: "Name is valid",
      empty: "Name cannot be empty",
      isError: false,
      isEmpty: false,
      isValid: false,
    },
    lastname: {
      error:
        "Last Name can only contain letters and spaces, minimum 1 characters",
      valid: "Last Name is valid",
      empty: "Last Name cannot be empty",
      isError: false,
      isEmpty: false,
      isValid: false,
    },
    email: {
      error: "Email must be valid as mail@example.com",
      valid: "Email is valid",
      empty: "Email cannot be empty",
      isError: false,
      isEmpty: false,
      isValid: false,
    },
    password: {
      error:
        "Password must be minimum 8 characters long and contain numbers, at least one capital letter and only the special caracters _ . $ *",
      valid: "Password is valid",
      empty: "Password cannot be empty",
      match: "Passwords do not match",
      isMatch: false,
      isError: false,
      isEmpty: false,
      isValid: false,
    },
    confirmPassword: {
      error:
        "Password must be minimum 8 characters long and contain numbers, at least one capital letter and only the special caracters _ . $ *",
      valid: "Password is valid",
      empty: "Password Confirmation cannot be empty",
      match: "Passwords do not match",
      isMatch: false,
      isError: false,
      isEmpty: false,
      isValid: false,
    },
    phone: {
      error: "Phone Number can only contain numbers",
      valid: "Phone Number is valid",
      empty: "Phone Number cannot be empty",
      isError: false,
      isEmpty: false,
      isValid: false,
    },
    skype: {
      error: "Skype username can only contain letters and numbers",
      valid: "Skype is valid",
      empty: "Skype username cannot be empty",
      isError: false,
      isEmpty: false,
      isValid: false,
    },
    address: {
      error:
        "Address can only contain letters and numbers and the special character .",
      valid: "Address is valid",
      empty: "Address cannot be empty",
      isError: false,
      isEmpty: false,
      isValid: false,
    },
    birthdate: {
      error: "Birthdate must be valid as MM/DD/YYYY ",
      valid: "Birthdate is valid",
      empty: "Birthdate cannot be empty",
      isError: false,
      isEmpty: false,
      isValid: false,
    },
  });

  const handleBuildPhone = (field: string, value: string) => {
    if (field === "areaCode") {
      setFormData({
        ...formData,
        phone: { ...formData.phone, areaCode: value },
      });
    } else if (field === "number") {
      if (validateNumber(value) === "empty") {
        setErrorMessages({
          ...errorMessages,
          phone: {
            ...errorMessages.phone,
            isError: false,
            isEmpty: true,
            isValid: false,
          },
        });
      } else if (validateNumber(value)) {
        setErrorMessages({
          ...errorMessages,
          phone: {
            ...errorMessages.phone,
            isError: false,
            isEmpty: false,
            isValid: true,
          },
        });
        setFormData({
          ...formData,
          phone: { ...formData.phone, number: value },
        });
      } else {
        setErrorMessages({
          ...errorMessages,
          phone: {
            ...errorMessages.phone,
            isError: true,
            isEmpty: false,
            isValid: false,
          },
        });
      }
    }
  };

  const handleFieldChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (field) {
      case "name":
        if (validateTextWithSpaces(e.target.value) === "empty") {
          setErrorMessages({
            ...errorMessages,
            name: {
              ...errorMessages.name,
              isError: false,
              isEmpty: true,
              isValid: false,
            },
          });
        } else if (validateTextWithSpaces(e.target.value)) {
          setErrorMessages({
            ...errorMessages,
            name: {
              ...errorMessages.name,
              isError: false,
              isEmpty: false,
              isValid: true,
            },
          });
          setFormData({
            ...formData,
            name: e.target.value,
          });
        } else {
          setErrorMessages({
            ...errorMessages,
            name: {
              ...errorMessages.name,
              isError: true,
              isEmpty: false,
              isValid: false,
            },
          });
        }
        break;
      case "lastname":
        if (validateTextWithSpaces(e.target.value) === "empty") {
          setErrorMessages({
            ...errorMessages,
            lastname: {
              ...errorMessages.lastname,
              isError: false,
              isEmpty: true,
              isValid: false,
            },
          });
        } else if (validateTextWithSpaces(e.target.value)) {
          setErrorMessages({
            ...errorMessages,
            lastname: {
              ...errorMessages.lastname,
              isError: false,
              isEmpty: false,
              isValid: true,
            },
          });
          setFormData({
            ...formData,
            lastname: e.target.value,
          });
        } else {
          setErrorMessages({
            ...errorMessages,
            lastname: {
              ...errorMessages.lastname,
              isError: true,
              isEmpty: false,
              isValid: false,
            },
          });
        }
        break;
      case "email":
        if (validateEmail(e.target.value) === "empty") {
          setErrorMessages({
            ...errorMessages,
            email: {
              ...errorMessages.email,
              isError: false,
              isEmpty: true,
              isValid: false,
            },
          });
        } else if (validateEmail(e.target.value)) {
          setErrorMessages({
            ...errorMessages,
            email: {
              ...errorMessages.email,
              isError: false,
              isEmpty: false,
              isValid: true,
            },
          });
          setFormData({
            ...formData,
            email: e.target.value,
          });
        } else {
          setErrorMessages({
            ...errorMessages,
            email: {
              ...errorMessages.email,
              isError: true,
              isEmpty: false,
              isValid: false,
            },
          });
        }
        break;
      case "password":
        if (validatePassword(e.target.value) === "empty") {
          setErrorMessages({
            ...errorMessages,
            password: {
              ...errorMessages.password,
              isError: false,
              isEmpty: true,
              isValid: false,
            },
          });
        } else if (validatePassword(e.target.value)) {
          setErrorMessages({
            ...errorMessages,
            password: {
              ...errorMessages.password,
              isError: false,
              isEmpty: false,
              isValid: true,
            },
          });
          setFormData({
            ...formData,
            password: e.target.value,
          });
        } else {
          setErrorMessages({
            ...errorMessages,
            password: {
              ...errorMessages.password,
              isError: true,
              isEmpty: false,
              isValid: false,
            },
          });
        }
        break;
      case "confirmPassword":
        if (validatePassword(e.target.value) === "empty") {
          setErrorMessages({
            ...errorMessages,
            confirmPassword: {
              ...errorMessages.confirmPassword,
              isError: false,
              isEmpty: true,
              isValid: false,
              isMatch: false,
            },
          });
        } else if (validatePassword(e.target.value)) {
          if (e.target.value === formData.password) {
            setErrorMessages({
              ...errorMessages,
              confirmPassword: {
                ...errorMessages.confirmPassword,
                isError: false,
                isEmpty: false,
                isValid: true,
                isMatch: true,
              },
            });
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            });
          } else {
            setErrorMessages({
              ...errorMessages,
              confirmPassword: {
                ...errorMessages.confirmPassword,
                isEmpty: false,
                isValid: false,
                isMatch: false,
              },
            });
          }
        } else {
          setErrorMessages({
            ...errorMessages,
            confirmPassword: {
              ...errorMessages.confirmPassword,
              isError: true,
              isEmpty: false,
              isValid: false,
              isMatch: false,
            },
          });
        }
        break;
      case "skype":
        if (validateSkype(e.target.value) === "empty") {
          setErrorMessages({
            ...errorMessages,
            skype: {
              ...errorMessages.skype,
              isError: false,
              isEmpty: true,
              isValid: false,
            },
          });
        } else if (validateSkype(e.target.value)) {
          setErrorMessages({
            ...errorMessages,
            skype: {
              ...errorMessages.skype,
              isError: false,
              isEmpty: false,
              isValid: true,
            },
          });
          setFormData({
            ...formData,
            skype: e.target.value,
          });
        } else {
          setErrorMessages({
            ...errorMessages,
            skype: {
              ...errorMessages.skype,
              isError: true,
              isEmpty: false,
              isValid: false,
            },
          });
        }
        break;
      case "address":
        if (validateTextWithNumbersSpaces(e.target.value) === "empty") {
          setErrorMessages({
            ...errorMessages,
            address: {
              ...errorMessages.address,
              isError: false,
              isEmpty: true,
              isValid: false,
            },
          });
        } else if (validateTextWithNumbersSpaces(e.target.value)) {
          setErrorMessages({
            ...errorMessages,
            address: {
              ...errorMessages.address,
              isError: false,
              isEmpty: false,
              isValid: true,
            },
          });
          setFormData({
            ...formData,
            address: e.target.value,
          });
        } else {
          setErrorMessages({
            ...errorMessages,
            address: {
              ...errorMessages.address,
              isError: true,
              isEmpty: false,
              isValid: false,
            },
          });
        }
        break;
      case "birthdate":
        if (validateDate(e.target.value)) {
          setErrorMessages({
            ...errorMessages,
            birthdate: {
              ...errorMessages.birthdate,
              isError: false,
              isEmpty: false,
              isValid: true,
            },
          });
          setFormData({
            ...formData,
            birthdate: e.target.value,
          });
        } else {
          setErrorMessages({
            ...errorMessages,
            birthdate: {
              ...errorMessages.birthdate,
              isError: true,
              isEmpty: false,
              isValid: false,
            },
          });
        }
        break;
      case "default":
        break;
    }
  };

  return (
    <main className="flex h-screen overflow-hidden bgpurple-500">
      <div className="flex w-full max-lg:relative">
        <div
          className="w-[40%] max-lg:w-full max-lg:absolute h-full bgblue-400 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage:
              "url('https://github.com/BPM94/SCCTMD/raw/main/create-account/createAccountBG.webp')",
          }}
        ></div>
        <div className="w-[60%]  bggreen-400 max-lg:w-full z-[100] select-none">
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col h-full bgred-300  lg:bg-white">
              <div className="w-full h-[15%] flex justify-center items-center bggreen-500">
                <Link className="h-[50%] bgrose-400" href="/">
                  <Image
                    src="https://github.com/BPM94/SCCTMD/raw/main/logos/RedezignitLogoWeb.png"
                    alt="logo"
                    className=" h-full max-h-[90px]"
                  />
                </Link>
              </div>
              <div className="flex   bgslate-400 h-[75%] ">
                <form className="flex flex-col hfull  bgcyan-800 w-full bgorange-300">
                  <div
                    id="fields"
                    className="flex flex-col py-8 w-[80%] hfull overflow-y-auto   place-self-center"
                  >
                    <div id="name-lastname" className="flex w-full bgblue-500">
                      <div
                        id="name"
                        className="flex flex-col w-full gap-1 p-2 bgrose-400"
                      >
                        <input
                          id="fieldName"
                          className={`bg-white w-full p-3 text-[#828282] border-2  ${
                            errorMessages.name.isError ||
                            errorMessages.name.isEmpty
                              ? "border-red-500"
                              : errorMessages.name.isValid
                              ? "border-green-500"
                              : "border-[#828282]"
                          } outline-none rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]`}
                          type="text"
                          placeholder="First Name"
                          onChange={(e) => {
                            handleFieldChange("name", e);
                          }}
                        />
                        <div className="text-red-500 text-xs px-4 min-h-[25px]">
                          {errorMessages.name.isError && (
                            <p className="max-lg:bg-white/80 p-1 rounded-md">
                              {errorMessages.name.error}
                            </p>
                          )}
                          {errorMessages.name.isEmpty && (
                            <p className="max-lg:bg-white/80 p-1 rounded-md">
                              {errorMessages.name.empty}
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        id="lastname"
                        className="flex flex-col w-full p-2 gap-1 bgpurple-500"
                      >
                        <input
                          id="fieldLastName"
                          className={`bg-white w-full p-3 text-[#828282] border-2  ${
                            errorMessages.lastname.isError ||
                            errorMessages.lastname.isEmpty
                              ? "border-red-500"
                              : errorMessages.lastname.isValid
                              ? "border-green-500"
                              : "border-[#828282]"
                          } outline-none rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]`}
                          type="text"
                          placeholder="Last Name"
                          onChange={(e) => {
                            handleFieldChange("lastname", e);
                          }}
                        />
                        <div className="text-red-500 text-xs px-4 min-h-[25px]">
                          {errorMessages.lastname.isError && (
                            <p className="max-lg:bg-white/80 p-1 rounded-md">
                              {errorMessages.lastname.error}
                            </p>
                          )}
                          {errorMessages.lastname.isEmpty && (
                            <p className="max-lg:bg-white/80 p-1 rounded-md">
                              {errorMessages.lastname.empty}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div id="email" className="flex w-full p-2 flex-col gap-1">
                      <input
                        id="fieldEmail"
                        className={`bg-white w-full p-3 text-[#828282] border-2  ${
                          errorMessages.email.isError ||
                          errorMessages.email.isEmpty
                            ? "border-red-500"
                            : errorMessages.email.isValid
                            ? "border-green-500"
                            : "border-[#828282]"
                        } outline-none rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]`}
                        type="text"
                        placeholder="Email"
                        onChange={(e) => {
                          handleFieldChange("email", e);
                        }}
                      />
                      <div className="text-red-500 text-xs px-4 min-h-[25px]">
                        {errorMessages.email.isError && (
                          <p className="max-lg:bg-white/80 p-1 rounded-md">
                            {errorMessages.email.error}
                          </p>
                        )}
                        {errorMessages.email.isEmpty && (
                          <p className="max-lg:bg-white/80 p-1 rounded-md">
                            {errorMessages.email.empty}
                          </p>
                        )}
                      </div>
                    </div>
                    <div id="password" className="flex flex-col w-full">
                      <div
                        id="createPassword"
                        className="flex w-full p-2 relative flex-col gap-1"
                      >
                        <input
                          id="fieldPassword"
                          className={`bg-white w-full p-3 text-[#828282] border-2  ${
                            errorMessages.password.isError ||
                            errorMessages.password.isEmpty
                              ? "border-red-500"
                              : errorMessages.password.isValid
                              ? errorMessages.confirmPassword.isMatch
                                ? "border-green-500"
                                : "border-red-500"
                              : "border-[#828282]"
                          } outline-none rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]`}
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder="Create Password"
                          onChange={(e) => {
                            handleFieldChange("password", e);
                          }}
                        />
                        <div className="flex bgred-200 justify-center items-center p-2 absolute right-4 top-3">
                          {showPassword ? (
                            <FaEye
                              className="text-gray-700 text-2xl cursor-pointer"
                              onClick={() => togglePassword("password")}
                            />
                          ) : (
                            <FaEyeSlash
                              className="text-gray-700 text-2xl cursor-pointer"
                              onClick={() => togglePassword("password")}
                            />
                          )}
                        </div>
                        <div className="text-red-500 w[90%] text-xs fontbold px-4 min-h-[25px]  max-lg:rounded-md">
                          {errorMessages.password.isError && (
                            <p className="max-lg:bg-white/80 rounded-md p-1 ">
                              {errorMessages.password.error}
                            </p>
                          )}
                          {errorMessages.password.isEmpty && (
                            <p className="max-lg:bg-white/80 p-1 rounded-md">
                              {errorMessages.password.empty}
                            </p>
                          )}
                        </div>
                      </div>
                      <div
                        id="confirmPassword"
                        className="flex w-full p-2 relative flex-col gap-1"
                      >
                        <input
                          id="fieldConfirmPassword"
                          className={`bg-white w-full p-3 text-[#828282] border-2  ${
                            errorMessages.confirmPassword.isError ||
                            errorMessages.confirmPassword.isEmpty
                              ? "border-red-500"
                              : errorMessages.confirmPassword.isValid
                              ? errorMessages.confirmPassword.isMatch
                                ? "border-green-500"
                                : "border-red-500"
                              : "border-[#828282]"
                          } outline-none rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]`}
                          type={`${showConfirmPassword ? "text" : "password"}`}
                          placeholder="Confirm Password"
                          onChange={(e) => {
                            handleFieldChange("confirmPassword", e);
                          }}
                        />
                        <div className="flex bgred-200 justify-center items-center p-2 absolute right-4 top-3">
                          {showConfirmPassword ? (
                            <FaEye
                              className="text-gray-700 text-2xl cursor-pointer "
                              onClick={() => togglePassword("confirmPassword")}
                            />
                          ) : (
                            <FaEyeSlash
                              className="text-gray-700 text-2xl cursor-pointer "
                              onClick={() => togglePassword("confirmPassword")}
                            />
                          )}
                        </div>
                        <div className="text-red-500 w[90%] text-xs fontbold px-4 min-h-[25px]  max-lg:rounded-md">
                          {errorMessages.confirmPassword.isError && (
                            <p className="max-lg:bg-white/80 rounded-md p-1 ">
                              {errorMessages.confirmPassword.error}
                            </p>
                          )}
                          {errorMessages.confirmPassword.isEmpty && (
                            <p className="max-lg:bg-white/80 p-1 rounded-md">
                              {errorMessages.confirmPassword.empty}
                            </p>
                          )}
                          {!errorMessages.confirmPassword.isMatch && (
                            <p className="max-lg:bg-white/80 p-1 rounded-md">
                              {errorMessages.confirmPassword.match}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div id="phone" className="flex flex-col w-full gap-1 p-2 ">
                      <div className="flex max-sm:flex-col w-full gap-2">
                        <div className="h-full bgred-300 max-sm:h-[50px] ">
                          <AreaCodeSelector
                            setAreaCode={setAreaCode}
                            handleBuildPhone={handleBuildPhone}
                          />
                        </div>
                        <input
                          id="fieldPhone"
                          className={`bg-white w-full p-3 text-[#828282] border-2  ${
                            errorMessages.phone.isError ||
                            errorMessages.phone.isEmpty
                              ? "border-red-500"
                              : errorMessages.phone.isValid
                              ? "border-green-500"
                              : "border-[#828282]"
                          } outline-none rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]`}
                          type="text"
                          placeholder="Phone"
                          onChange={(e) => {
                            handleBuildPhone("number", e.target.value);
                          }}
                        />
                      </div>
                      <div className="text-red-500 w[90%] text-xs fontbold px-4 min-h-[25px]  max-lg:rounded-md">
                        {errorMessages.phone.isError && (
                          <p className="max-lg:bg-white/80 rounded-md p-1 ">
                            {errorMessages.phone.error}
                          </p>
                        )}
                        {errorMessages.phone.isEmpty && (
                          <p className="max-lg:bg-white/80 p-1 rounded-md">
                            {errorMessages.phone.empty}
                          </p>
                        )}
                      </div>
                    </div>
                    <div id="skype" className="flex flex-col w-full p-2 gap-1">
                      <div
                        className={`bg-white flex w-full p-3 text-[#828282] border-2  ${
                          errorMessages.skype.isError ||
                          errorMessages.skype.isEmpty
                            ? "border-red-500"
                            : errorMessages.skype.isValid
                            ? "border-green-500"
                            : "border-[#828282]"
                        } outline-none rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]`}
                      >
                        <div className="flex items-center justify-center w-[70px]">
                          <GrSkype className="text-3xl text-[#08b2f0]" />
                        </div>
                        <div className="flex w-full">
                          <input
                            id="fieldSkype"
                            className="bg-white text-[#828282] w-full h-full outline-none"
                            type="text"
                            placeholder="Skype"
                            onChange={(e) => {
                              handleFieldChange("skype", e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-red-500 w[90%] text-xs fontbold px-4 min-h-[25px]  max-lg:rounded-md">
                        {errorMessages.skype.isError && (
                          <p className="max-lg:bg-white/80 rounded-md p-1 ">
                            {errorMessages.skype.error}
                          </p>
                        )}
                        {errorMessages.skype.isEmpty && (
                          <p className="max-lg:bg-white/80 p-1 rounded-md">
                            {errorMessages.skype.empty}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      id="address"
                      className="flex w-full p-2 flex-col gap-1"
                    >
                      <input
                        id="fieldAddress"
                        className={`bg-white flex w-full p-3 text-[#828282] border-2  ${
                          errorMessages.address.isError ||
                          errorMessages.address.isEmpty
                            ? "border-red-500"
                            : errorMessages.address.isValid
                            ? "border-green-500"
                            : "border-[#828282]"
                        } outline-none rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]`}
                        type="text"
                        placeholder="Address"
                        onChange={(e) => {
                          handleFieldChange("address", e);
                        }}
                      />
                      <div className="text-red-500 w[90%] text-xs fontbold px-4 min-h-[25px]  max-lg:rounded-md">
                        {errorMessages.address.isError && (
                          <p className="max-lg:bg-white/80 rounded-md p-1 ">
                            {errorMessages.address.error}
                          </p>
                        )}
                        {errorMessages.address.isEmpty && (
                          <p className="max-lg:bg-white/80 p-1 rounded-md">
                            {errorMessages.address.empty}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      id="birthdate"
                      className="flex w-[60%] p-2 max-w-[300px] text-[#828282] flex-col gap-1"
                    >
                      <input
                        id="fieldBirthdate"
                        className={`bg-white w-full p-3 text-[#828282] border-2  ${
                          errorMessages.birthdate.isError ||
                          errorMessages.birthdate.isEmpty
                            ? "border-red-500"
                            : errorMessages.birthdate.isValid
                            ? "border-green-500"
                            : "border-[#828282]"
                        } outline-none rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]`}
                        type="date"
                        onChange={(e) => {
                          handleFieldChange("birthdate", e);
                        }}
                      />
                      <div className="text-red-500 text-xs px-4 min-h-[25px]">
                        {errorMessages.birthdate.isError && (
                          <p className="max-lg:bg-white/80 p-1 rounded-md">
                            {errorMessages.birthdate.error}
                          </p>
                        )}
                        {errorMessages.birthdate.isEmpty && (
                          <p className="max-lg:bg-white/80 p-1 rounded-md">
                            {errorMessages.birthdate.empty}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    id="submit"
                    className="flex bgyellow-500 items-center justify-center w-full mt-2 p-2 bgrose-400"
                  >
                    <button
                      className="px-12 py-2 font-bold text-white bg-[#5ea789] rounded-bl-2xl rounded-tr-2xl hover:bg-green-800 max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCreateAccount();
                      }}
                    >
                      {isLoadingCustomer ? (
                        <div className="flex gap-2">
                          <Spinner color="warning" size="sm" />
                          Signing up...
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex items-center justify-center w-full bgblue-400  h-[10%] lg:bg-[#353535]">
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
      </div>
    </main>
  );
};

export default Section;
