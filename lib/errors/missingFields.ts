import { NextResponse } from "next/server";

export const missingFieldsError = (fields: string[]): NextResponse => {
  return NextResponse.json(
    {
      error: "MISSING_FIELDS",
      message: `Missing ${fields.join(", ")} fields`,
      data: fields,
    },
    { status: 400 },
  );
};
