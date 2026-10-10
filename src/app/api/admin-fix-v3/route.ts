import { NextResponse } from "next/server";

export const GET = async () =>
  NextResponse.json(
    { success: false, message: "Not found" },
    { status: 404 },
  );
