import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { missingFieldsError } from "@/lib/error/missingFields";
import { badRequestError } from "@/lib/error/badResquest";
import { invalidFieldsError } from "@/lib/error/invalidFields";
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

    const chef = await prisma.chef.create({
      data: {
        ...requestData,
      },
    });

    return NextResponse.json(chef);
  } catch (error) {
    console.log(error);
    return badRequestError();
  }
}
