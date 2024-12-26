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


const FaqsContactUsEmail = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div className="flex flex-col">
              <div className="flex">
                <p className="text-sm md:text-xs md:hidden lg:block">Let us know any particular questions you may have before or after you pay for any of our services and we will get back to you as soon as possible.</p>
              </div>
              <div className="flex w-full">
                <button className="bgred-500 place-self-start"
                onClick={onOpen}
                >
                  <MdEmail className="text-5xl" />
                </button>
                <Modal
                
                  size="xl"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                >
                  <ModalContent className=''>
                    {(onClose) => (
                      <div className="flex flex-col w-full p-10">
                        <ModalHeader className="flex w-full bgred-400">
                          <p className="text-sm font-medium text-left">
                          Write any particular question you may have directly to us before or after you pay for any of our services and we will get back to you as soon as possible
                          </p>
                        </ModalHeader>
                        <ModalBody>
                          <form onSubmit={(e) => {e.preventDefault();}}>
                            <div>
                              <h2>Our Email: </h2>
                              <p>space-creation@space-creation.net</p>
                            </div>
                            <div>
                              <h2>Your Email: </h2>
                              <input className="border-2 border-gray-300 rounded-md p-2" type="email" name="email" id="email" placeholder="Enter your email" required />
                              
                            </div>
                            <div>
                              <textarea className="w-full max-w-[500px] h-[250px] border-2 border-gray-300 rounded-md p-4" name="" id="" placeholder="Let us know your questions here..."></textarea>
                            </div>
                            <div>
                              <button>
                                send
                              </button>
                            </div>
                          </form>
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

const FaqsContactUsSkype = () => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>

            <div className="flex flex-col">
              <div className="flex">
                <p className="">Get in touch with us by Skype.</p>
              </div>
              <div className="flex w-full">
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
              <div className="flex w-full">
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