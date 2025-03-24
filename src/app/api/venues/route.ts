import db from "@/_lib/db/db";

export async function GET() {
  const venue = await db.venue.findMany({});
  return Response.json(venue, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const venue = await db.venue.create({
    data: body,
  });

  return Response.json(venue, {
    status: 201,
  });
}
