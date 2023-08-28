import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { missingFieldsError } from "@/lib/error/missingFields";
import { badRequestError } from "@/lib/error/badResquest";
import { invalidFieldsError } from "@/lib/error/invalidFields";
import { validateRequiredFields } from "@/lib/validation/requiredFields";
import { validateMealData } from "@/lib/validation/mealData";
import { notFoundError } from "@/lib/error/notFound";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const requiredFields = [
      "chefId",
      "title",
      "description",
      "ingredients",
      "price",
      "prepTime",
      "availability",
    ];
    const missingFields = validateRequiredFields(requestData, requiredFields);
    if (missingFields.length > 0) {
      return missingFieldsError(missingFields);
    }

    const invalidFields = validateMealData(requestData);
    if (invalidFields.length > 0) {
      return invalidFieldsError(invalidFields);
    }

    const chefId = Number(requestData.chefId);
    const chefExists = await prisma.chef.findFirst({
      where: {
        id: chefId,
      },
    });
    if (!chefExists) {
      return notFoundError("chefId", chefId);
    }

    const meal = await prisma.meal.create({
      data: {
        chefId,
        title: requestData.title,
        description: requestData.description,
        ingredients: requestData.ingredients,
        price: requestData.price,
        prepTime: Number(requestData.prepTime),
        availability: Boolean(requestData.availability),
      },
    });

    return NextResponse.json(meal);
  } catch (error) {
    console.log(error);
    return badRequestError();
  }
}
