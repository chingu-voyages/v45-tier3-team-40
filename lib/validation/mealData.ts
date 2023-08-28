import validator from "validator";

interface MealData {
  title: string;
  description: string;
  ingredients: string[];
  price: string;
  prepTime: string; // integer
  availability: string; // booelan
}

export const validateMealData = (data: MealData): string[] => {
  const { title, description, ingredients, price, prepTime, availability } =
    data;

  const invalidFields = [];
  if (!validator.isLength(title, { min: 2, max: 32 })) {
    invalidFields.push("title");
  }

  if (!validator.isLength(description, { min: undefined, max: 255 })) {
    invalidFields.push("description");
  }

  const isAlphaArray = (arr: string[]) =>
    arr.every((value) => validator.isAlpha(value));
  if (!Array.isArray(ingredients) || !isAlphaArray(ingredients)) {
    invalidFields.push("ingredients");
  }

  if (!validator.isCurrency(price)) {
    invalidFields.push("price");
  }

  if (!validator.isNumeric(prepTime)) {
    invalidFields.push("prepTime");
  }

  if (!validator.isBoolean(availability)) {
    invalidFields.push("availability");
  }

  return invalidFields;
};
