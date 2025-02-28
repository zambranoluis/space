"use client"

import {
  validateTextWithSpaces,
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
  handleBuildPhone: (field:string, value: string) => void;
  handleCreateAccount: () => void;
  formData: Customer;
  setFormData: React.Dispatch<React.SetStateAction<Customer>>;
  isLoadingCustomer: boolean;
  togglePassword: (source: string) => void;
  showPassword: boolean;
  showConfirmPassword: boolean;
}


const Section:React.FC<SectionProps> = ({
  setAreaCode,
  handleBuildPhone,
  handleCreateAccount,
  formData,
  setFormData,
  isLoadingCustomer,
  togglePassword,
  showPassword,
  showConfirmPassword
}) => {
  return (
    <main className='flex w-full min-h-screen bgred-500'>
          <div className='flex w-full max-lg:relative'>
            <div
              className='w-[40%] max-lg:w-full max-lg:absolute h-full bgblue-400 bg-center bg-no-repeat bg-cover'
              style={{
                backgroundImage:
                  "url('https://github.com/BPM94/SCCTMD/raw/main/create-account/createAccountBG.webp')",
              }}></div>
            <div className='w-[60%] h-full bggreen-400 max-lg:w-full z-[100] select-none'>
              <div className='flex flex-col h-full w-full'>
                <div className='flex flex-col lg:h-full lg:bg-white'>
                  <div className='w-full h-[15%] flex justify-center items-center bgred-500'>
                    <Link href='/'>
                      <Image
                        src='https://github.com/BPM94/SCCTMD/raw/main/logos/logoGreen.png'
                        alt='logo'
                        className='h-full'
                      />
                    </Link>
                  </div>
                  <div className='flex  overflow-y-auto bgred-400'>
                    <form className='flex flex-col w-full h-full bgorange-300'>
                      <div
                        id='fields'
                        className='flex flex-col w-[80%] h-full  place-self-center'>
                        <div id='name-lastname' className='flex w-full bgblue-500'>
                          <div id='name' className='flex w-full p-2 bgrose-400'>
                            <input
                              id='fieldName'
                              className='bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'
                              type='text'
                              placeholder='First Name'
                              onChange={(e) => {
                                if (validateTextWithSpaces(e.target.value))
                                  setFormData({ ...formData, name: e.target.value });
                              }}
                            />
                          </div>
                          <div id='lastname' className='flex w-full p-2 bgpurple-500'>
                            <input
                              id='fieldLastName'
                              className='bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'
                              type='text'
                              placeholder='Last Name'
                              onChange={(e) =>
                                setFormData({ ...formData, lastname: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div id='email' className='flex w-full p-2'>
                          <input
                            id='fieldEmail'
                            className='bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'
                            type='text'
                            placeholder='Email'
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                          />
                        </div>
                        <div id='password' className='flex flex-col w-full'>
                          <div id='createPassword' className='flex w-full p-2 relative'>
                            <input
                              id='fieldPassword'
                              className='bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'
                              type={`${showPassword ? "text" : "password"}`}
                              placeholder='Create Password'
                              onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                              }
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
                          </div>
                          <div id='confirmPassword' className='flex w-full p-2 relative'>
                            <input
                              id='fieldConfirmPassword'
                              className='bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'
                              type={`${showConfirmPassword ? "text" : "password"}`}
                              placeholder='Confirm Password'
                              onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value })
                              }
                            />
                            <div className="flex bgred-200 justify-center items-center p-2 absolute right-4 top-3">
                              {
                                showConfirmPassword ? (
                                  <FaEye
                                    className="text-gray-700 text-2xl cursor-pointer "
                                    onClick={() => togglePassword("confirmPassword")}
                                  />
                                ) : (
                                  <FaEyeSlash
                                    className="text-gray-700 text-2xl cursor-pointer "
                                    onClick={() => togglePassword("confirmPassword")}
                                  />
                                )
                              }
                            </div>
                          </div>
                        </div>
                        <div id='phone' className='flex max-sm:flex-col w-full p-2 gap-2'>
                          <div className="h-full bgred-300 max-sm:h-[50px] ">
                            <AreaCodeSelector
                            setAreaCode={setAreaCode}
                            handleBuildPhone={handleBuildPhone}
                            />
                          </div>
                          <input
                            id='fieldPhone'
                            className='bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'
                            type='text'
                            placeholder='Phone'
                            onChange={(e) => {
                              handleBuildPhone("number", e.target.value);
                            }}
                          />
                        </div>
                        <div id='skype' className='flex w-full p-2'>
                          <div className='flex w-full p-2 bgred-300 rounded-full border border-[#828282] max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)] max-lg:bg-white max-w-[350px]'>
                            <div className='flex items-center justify-center w-[70px]'>
                              <GrSkype className='text-3xl text-[#08b2f0]' />
                            </div>
                            <div className='flex w-full'>
                              <input
                                id='fieldSkype'
                                className='bg-white text-[#828282] w-full h-full outline-none'
                                type='text'
                                placeholder='Skype'
                                onChange={(e) =>
                                  setFormData({ ...formData, skype: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div id='address' className='flex w-full p-2'>
                          <input
                            id='fieldAddress'
                            className='bg-white w-full p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'
                            type='text'
                            placeholder='Address'
                            onChange={(e) =>
                              setFormData({ ...formData, address: e.target.value })
                            }
                          />
                        </div>
                        <div id='birthdate' className='flex w-[60%] p-2 max-w-[300px]'>
                          <input
                            id='fieldBirthdate'
                            className='bg-white w-full max-w-[200px] p-3 text-[#828282] border border-[#828282] rounded-full max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'
                            type='date'
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
                        id='submit'
                        className='flex items-center justify-center w-full mt-2 p-2 bgrose-400'>
                        <button
                          className='px-12 py-2 font-bold text-white bg-[#5ea789] rounded-bl-2xl rounded-tr-2xl hover:bg-green-800 max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'
                          onClick={(e) => {
                            e.preventDefault();
                            handleCreateAccount();
                          }}>
                          {isLoadingCustomer ? <div className="flex gap-2"><Spinner color="warning" size="sm"/>Signing up...</div> : "Create Account"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='flex items-center justify-center w-full bgred-300 lg:h-[10%] lg:bg-[#353535]'>
                  <p className='text-white max-lg:drop-shadow-[0px_1.8px_1.8px_rgba(0,0,0,1)]'>
                    Already Registered?{" "}
                    <Link href='/login' className='font-bold'>
                      Login here.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
  );
}
 
export default Section;