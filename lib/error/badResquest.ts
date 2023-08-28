import { NextResponse } from "next/server";

export const badRequestError = (): NextResponse => {
  return NextResponse.json(
    { error: "BAD_REQUEST", message: "Bad Request" },
    { status: 400 },
  );
};
