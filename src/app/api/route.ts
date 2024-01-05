import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "public", "data", "data.csv");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const rows = fileContent.split("\n");

  const data = rows.map((row) => {
    const [timestamp, text] = row.split(";");
    return { timestamp, text };
  });
  return NextResponse.json({ data });
}
