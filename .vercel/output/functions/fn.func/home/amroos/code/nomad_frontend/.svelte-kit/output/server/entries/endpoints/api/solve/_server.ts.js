import { d as db } from "../../../../chunks/db.js";
const GET = async ({ url }) => {
  const sessionId = url.searchParams.get("sessionId");
  if (!sessionId) {
    return new Response(JSON.stringify({ success: false }));
  }
  const solves = await db.solve.findMany({
    where: {
      sessionId: +sessionId
    },
    orderBy: {
      createdAt: "asc"
    }
  });
  return new Response(JSON.stringify({ success: true, solves }));
};
const POST = async ({ request }) => {
  const data = await request.json();
  const solve = await db.solve.create({
    data: {
      ...data
    }
  });
  return new Response(JSON.stringify(solve));
};
const DELETE = async ({ request }) => {
  const data = await request.json();
  const solves = await db.solve.findMany({
    where: {
      id: {
        in: data.ids
      }
    }
  });
  await db.$transaction([
    db.solveDeleted.createMany({
      data: [
        ...solves.map((i) => {
          const { id, ...rest } = i;
          return { solveId: id, ...rest };
        })
      ]
    }),
    db.solve.deleteMany({
      where: {
        id: {
          in: data.ids
        }
      }
    })
  ]);
  return new Response(JSON.stringify({ success: true }));
};
export {
  DELETE,
  GET,
  POST
};
