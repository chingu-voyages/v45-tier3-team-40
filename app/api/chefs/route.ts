import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { missingFieldsError } from "@/lib/errors/missingFields";
import { badRequestError } from "@/lib/errors/badResquest";
import { invalidFieldsError } from "@/lib/errors/invalidFields";
import { validateChefData } from "@/lib/validation/chefData";
import { validateRequiredFields } from "@/lib/validation/requiredFields";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const requiredFields = [
      "name",
      "phone",
      "picture",
      "bio",
      "specialties",
      "address",
    ];
    const missingFields = validateRequiredFields(requestData, requiredFields);
    if (missingFields.length > 0) {
      return missingFieldsError(missingFields);
    }

    const invalidFields = validateChefData(requestData);
    if (invalidFields.length > 0) {
      return invalidFieldsError(invalidFields);
    }

    return NextResponse.json(requestData);
  } catch (error) {
    console.log(error);
    return badRequestError();
  }
}
