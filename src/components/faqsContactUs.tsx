'use client'
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { useState } from "react";

import { Image } from "@nextui-org/image";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { GrSkype } from "react-icons/gr";
import { RiWhatsappFill } from "react-icons/ri";

import { MdOutlineEmail } from "react-icons/md";



const FaqsContactUsEmail = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex">
      <div className="flex flex-col bgred-300 ">
              <MdOutlineEmail className="text-5xl bgblue-300" />
              <div className="flex text-left">
                <p className="text-lg font-semibold leading-4 ">For more information write to us.</p>
              </div>
              <div className="flex ">
                <button className=" bg-white text-[#6b776d] rounded-lg mt-2"
                onClick={onOpen}
                >
                  <p className="text-xs px-3 py-2  ">Press here</p>
                </button>
                <div className="bggreen-300 ">
                  <Modal
                    className="bgred-300 absolute z-[5000]  top-[150px] sm:top-[80px] "
                    size="sm"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                  >
                    <ModalContent className=''>
                      {(onClose) => (
                        <div className="flex flex-col p-4">
                          {/* <ModalHeader className="flex  bgred-400">
                            <p className="text-sm font-medium text-left">
                            Write any particular question you may have directly to us by email before or after you pay for any of our services.</p>
                          </ModalHeader> */}
                          <ModalBody>
                            <form className="flex flex-col gap-4" onSubmit={(e) => {e.preventDefault();}}>
                              <div className="flex flex-col">
                                <h2>Our Email: </h2>
                                <p className="text-[#6b776d] font-black">space-creation@space-creation.net</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                  <h2>Your Name: </h2>
                                  <input className="border-2 border-gray-300 rounded-md p-2" type="email" name="email" id="email" placeholder="John Doe" required />
                                </div>
                                <div className="flex flex-col">
                                  <h2>Your Email: </h2>
                                  <input className={`border-2  border-gray-300 rounded-md p-2`} type="email" name="email" id="email" placeholder="john.doe@email.com" required />
                                </div>
                              </div>
                              <div className="flex">
                                <textarea className=" w-full h-[250px] border-2 border-gray-300 rounded-md p-4" name="" id="" placeholder="Let us know your questions here..."></textarea>
                              </div>
                              <div className="flex">
                                <button className="bg-[#6b776d] text-white rounded-lg px-4 py-2 hover:bg-green-950">
                                  send
                                </button>
                              </div>
                            </form>
                          </ModalBody>
                          {/* <ModalFooter>
                          </ModalFooter> */}
                        </div>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </div>
    </div>
  );
}

const FaqsContactUsSkype = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>

            <div className="flex flex-col">
              <div className="flex">
                <p className="">Get in touch with us by Skype.</p>
              </div>
              <div className="flex ">
                <button
                className="bg-blue-500"
                onClick={onOpen}
                >
                  <GrSkype className="text-5xl" />
                </button>
                <Modal
                  size="xl"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                >
                  <ModalContent className=''>
                    {(onClose) => (
                      <div className="flex p-8">
                        <ModalHeader>
                          Write any particular question you may have directly to us before or after you pay for any of our services and we will get back to you as soon as possible
                        </ModalHeader>
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                      </div>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>

          
    </div>
  );
}

const FaqsContactUsWhatsapp = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex">

            <div className="flex flex-col">
              <div className="flex">
                <p className="">Get in touch with us by Whatsapp.</p>
              </div>
              <div className="flex ">
                <button
                className="bg-green-400"
                onClick={onOpen}
                >
                  <RiWhatsappFill className="text-5xl" />
                </button>
                <Modal
                  size="xl"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                >
                  <ModalContent className=''>
                    {(onClose) => (
                      <div className="flex p-8">
                        <ModalHeader>
                          Write any particular question you may have directly to us before or after you pay for any of our services and we will get back to you as soon as possible
                        </ModalHeader>
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                      </div>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>
    </div>
  );
}

export { FaqsContactUsEmail, FaqsContactUsSkype, FaqsContactUsWhatsapp };