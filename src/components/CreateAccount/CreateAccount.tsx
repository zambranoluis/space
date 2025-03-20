"use client";

import React, { useState } from "react";
import Section from "./Section";
import axios from "axios";
import { apiService } from "@/services/apiService";
import { CreateCustomer } from "@/utils/dataInterfaces";
import Swal from "sweetalert2";

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

  const handleCreateAccount = async () => {
    try {
      setIsLoadingCustomer(true);
      console.log("formData to Create User: ", formData);

      if (
        validateTextWithSpaces(formData.name) === "empty" ||
        !validateTextWithSpaces(formData.name) ||
        validateTextWithSpaces(formData.lastname) === "empty" ||
        !validateTextWithSpaces(formData.lastname) ||
        validateEmail(formData.email) === "empty" ||
        !validateEmail(formData.email) ||
        validatePassword(formData.password) === "empty" ||
        !validatePassword(formData.password) ||
        validatePassword(formData.confirmPassword) === "empty" ||
        !validatePassword(formData.confirmPassword) ||
        validateNumber(formData.phone.number) === "empty" ||
        !validateNumber(formData.phone.number) ||
        validateSkype(formData.skype) === "empty" ||
        !validateSkype(formData.skype) ||
        validateTextWithSpaces(formData.address) === "empty" ||
        !validateTextWithSpaces(formData.address) ||
        !validateDate(formData.birthdate)
      ) {
        Swal.fire({
          title: "Please check all the fields and try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
        setIsLoadingCustomer(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          title: "Passwords do not match. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
        setIsLoadingCustomer(false);
        return;
      }

      const response = await apiService.createCustomer(formData);

      if (response.message === "Customer created successfully") {
        Swal.fire({
          title: "Customer created successfully. Redirecting to login...",
          icon: "success",
          confirmButtonText: "Close",
        });
        setIsLoadingCustomer(false);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(
          "Error creating customer:",
          err.response.data?.message || "Unknown error"
        );
      } else {
        console.log("Error creating customer:", err);
      }
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
