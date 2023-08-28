import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { missingFieldsError } from "@/lib/errors/missingFields";
import { badRequestError } from "@/lib/errors/badResquest";

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
    const missingFields = [];

    for (const field of requiredFields) {
      if (!requestData[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return missingFieldsError(missingFields);
    }

    return NextResponse.json(requestData);
  } catch (error) {
    console.log(error);
    return badRequestError();
  }
}
