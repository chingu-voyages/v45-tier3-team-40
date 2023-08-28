import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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
      return NextResponse.json(
        {
          error: "MISSING_FIELDS",
          message: `Missing ${missingFields.join(", ")} fields`,
          data: missingFields,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(requestData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });
  }
}
