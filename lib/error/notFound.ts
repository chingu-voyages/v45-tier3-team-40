import { NextResponse } from "next/server";

export const notFoundError = (field: string, value: any): NextResponse => {
  return NextResponse.json(
    {
      error: "NOT_FOUND",
      message: `Resource ${field} with the value of ${value} not found`,
      data: {
        field,
        value,
      },
    },
    { status: 400 },
  );
};
