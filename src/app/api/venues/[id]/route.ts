import db from "@/_lib/db/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const schoolId = params.id;
  const school = await db.venue.findUnique({
    where: { id: schoolId },
  });
  if (!school) {
    return new Response("Not Found", { status: 404 });
  }
  return Response.json(school, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const schoolId = params.id;
  const school = await db.venue.delete({
    where: { id: schoolId },
  });
  return Response.json(school, { status: 200 });
}
