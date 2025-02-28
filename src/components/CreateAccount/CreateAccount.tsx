"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import Section from "./Section";
import axios from "axios";
import { apiService } from "@/services/apiService";
import { CreateCustomer } from "@/utils/dataInterfaces";
import Swal from "sweetalert2";

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
      setFormData({
        ...formData,
        phone: { areaCode: value, number: formData.phone.number },
      });
    } else if (field === "number") {
      setFormData({
        ...formData,
        phone: { areaCode: formData.phone.areaCode, number: value },
      });
    }
  };

  const handleCreateAccount = async () => {
    try {
      setIsLoadingCustomer(true);

      const response = await apiService.createCustomer(formData);

      if (response.message === "Customer created successfully") {
        Swal.fire({
          title: "Customer created successfully. Redirecting to login...",
          icon: "success",
          confirmButtonText: "Close",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(
          "Error creating customer:",
          err.response.data?.message || "Unknown error",
        );
      } else {
        console.log("Error creating customer:", err);
      }
    } finally {
      setIsLoadingCustomer(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = (source: string) => {
    if (source === "password") {
      setShowPassword(!showPassword);
    } else if (source === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
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
        togglePassword={togglePassword}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
      />
    </section>
  );
};

export default CreateAccount;
