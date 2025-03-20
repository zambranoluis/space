// utils/validation.js

export const validateText = (text) => {
  const regex = /^[A-Za-z]{1,256}$/;
  if (text === "" || text === null || text === undefined) return "empty";
  return regex.test(text);
};

export const validateTextWithNumbers = (text) => {
  const regex = /^[0-9A-Za-z]{1,256}$/;
  if (text === "" || text === null || text === undefined) return "empty";
  return regex.test(text);
};

export const validateTextWithSpaces = (text) => {
  const regex = /^[A-Za-z\s]{1,256}$/;
  if (text === "" || text === null || text === undefined) return "empty";
  return regex.test(text);
};

export const validateTextWithNumbersSpaces = (text) => {
  const regex = /^[0-9A-Za-z.\s]{1,256}$/;
  if (text === "" || text === null || text === undefined) return "empty";
  return regex.test(text);
};

export const validateNumber = (number) => {
  const regex = /^[0-9]{1,256}$/;
  if (number === "" || number === null || number === undefined) return "empty";
  return regex.test(number);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,256}$/;
  if (email === "" || email === null || email === undefined) return "empty";
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[0-9A-Za-z._$*]{8,}$/;
  if (password === "" || password === null || password === undefined)
    return "empty";
  return regex.test(password);
};

export const validateSkype = (skype) => {
  const regex = /^[A-Za-z0-9]{1,256}$/;
  if (skype === "" || skype === null || skype === undefined) return "empty";
  return regex.test(skype);
};

export const validateDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (date === "" || date === null || date === undefined) return false;
  return regex.test(date);
};
