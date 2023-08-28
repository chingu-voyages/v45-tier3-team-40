import { NextResponse } from "next/server";

export const invalidFieldsError = (fields: string[]): NextResponse => {
  return NextResponse.json(
    {
      error: "INVALID_DATA",
      message: `Invalid data in ${fields.join(", ")} fields`,
      data: fields,
    },
    { status: 400 },
  );
};
