import { isValidPhoneNumber } from "libphonenumber-js";
import validator from "validator";

interface ChefData {
  name: string;
  phone: string;
  picture: string;
  bio: string;
  specialties: string[];
  address: string;
}

export const validateChefData = (data: ChefData): string[] => {
  const { name, phone, picture, bio, specialties, address } = data;

  const invalidFields = [];
  if (!validator.isLength(name, { min: 2, max: 32 })) {
    invalidFields.push("name");
  }

  if (!isValidPhoneNumber(phone)) {
    invalidFields.push("phone");
  }

  if (!validator.isURL(picture)) {
    invalidFields.push("picture");
  }

  if (!validator.isLength(bio, { min: undefined, max: 255 })) {
    invalidFields.push("bio");
  }

  const isAlphaArray = (arr: string[]) =>
    arr.every((value) => validator.isAlpha(value));
  if (!Array.isArray(specialties) || !isAlphaArray(specialties)) {
    invalidFields.push("specialties");
  }

  if (!validator.isLength(address, { min: undefined, max: 255 })) {
    invalidFields.push("address");
  }

  return invalidFields;
};
