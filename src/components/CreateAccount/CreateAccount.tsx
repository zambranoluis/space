"use client";




import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";



import Section from "./Section";

import axios from "axios";
import { apiService } from "@/services/apiService";




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

const CreateAccount = () => {
  
  const [formData, setFormData] = useState<Customer>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: {
      areaCode: "",
      number: "",
    },
    skype: "",
    address: "",
    birthdate: "",
  });

  const [areaCode, setAreaCode] = useState<string>("+1");

  const router = useRouter();


  const handleBuildPhone = (field:string, value: string) => {
    if (field === "areaCode") {
      setFormData({ ...formData, phone: { areaCode: value, number: formData.phone.number } });
    } else if (field === "number") {
      setFormData({ ...formData, phone: { areaCode: formData.phone.areaCode, number: value } });
    }
  };

  const [isLoadingCustomer, setIsLoadingCustomer] = useState<boolean>(false); // Estado de carga
  const [errorCustomer, setErrorCustomer] = useState<string | null>(null); // Estado de error

  const handleCreateAccount = async () => {
    try {
      setIsLoadingCustomer(true);
      setErrorCustomer(null);

      console.log("Form Data: ", formData);

      // Enviar la contraseña y confirmPassword en texto plano
      const response = await apiService.createCustomer({
        ...formData,
        // Se envían los valores tal cual, sin hash
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response) {
        if (response.status === 201) {
          router.push("/login");
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorCustomer(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else {
        setErrorCustomer("Error: No se pudo crear la cuenta.");
      }
    } finally {
      setIsLoadingCustomer(false);
      
    }
  };

  return (
    <section>
      <Section
        areaCode={areaCode}
        setAreaCode={setAreaCode}
        handleBuildPhone={handleBuildPhone}
        handleCreateAccount={handleCreateAccount}
        formData={formData}
        setFormData={setFormData}
        isLoadingCustomer={isLoadingCustomer}
      />
      
    </section>
  );
};

export default CreateAccount;
