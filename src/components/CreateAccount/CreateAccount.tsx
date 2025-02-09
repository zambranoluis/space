"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import Section from "./Section";
import axios from "axios";
import { apiService } from "@/services/apiService";
import { CreateCustomer } from "@/utils/dataInterfaces";

const CreateAccount = () => {
  const [areaCode, setAreaCode] = useState<string>("+1");
  const [formData, setFormData] = useState<CreateCustomer>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: {
      areaCode: areaCode,
      number: "",
    },
    skype: "",
    address: "",
    birthdate: "",
  });

  const [isLoadingCustomer, setIsLoadingCustomer] = useState<boolean>(false);

  const handleBuildPhone = (field: string, value: string) => {
    if (field === "areaCode") {
      setFormData({ ...formData, phone: { areaCode: value, number: formData.phone.number } });
    } else if (field === "number") {
      setFormData({ ...formData, phone: { areaCode: formData.phone.areaCode, number: value } });
    }
  };

  const handleCreateAccount = async () => {
    try {
      setIsLoadingCustomer(true);
  
      const response = await apiService.createCustomer(formData);
  
      if (response.message === "Customer created successfully") {
        redirect("/login");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error creating customer:", err.response.data?.message || "Unknown error");
      } else {
        console.error("Error creating customer:", err);
      }
    } finally {
      setIsLoadingCustomer(false);
    }
  };

  return (
    <section>
      <Section
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