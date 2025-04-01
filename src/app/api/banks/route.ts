import db from "@/_lib/db/db";

export async function GET() {
  const banks = await db.banks.findMany({});
  return Response.json(banks, {
    status: 200,
  });
}
