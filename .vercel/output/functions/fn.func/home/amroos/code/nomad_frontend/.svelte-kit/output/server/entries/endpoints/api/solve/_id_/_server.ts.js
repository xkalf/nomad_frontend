import { d as db } from "../../../../../chunks/db.js";
const GET = async ({ params: { id } }) => {
  const solve = await db.solve.findUnique({
    where: { id: +id },
    include: { twoLookSolve: true, cfopSolve: true }
  });
  return new Response(JSON.stringify(solve));
};
const DELETE = async ({ params: { id } }) => {
  try {
    const solve = await db.solve.findUnique({
      where: {
        id: +id
      }
    });
    if (!solve) {
      return new Response(JSON.stringify({ success: false, error: "Эвлүүлэлт олдсонгүй." }));
    }
    const { id: solveId, ...rest } = solve;
    await db.$transaction([
      db.solveDeleted.create({
        data: { solveId, ...rest }
      }),
      db.solve.delete({
        where: { id: +id }
      })
    ]);
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false }));
  }
};
const PUT = async ({ params: { id }, request }) => {
  const { status } = await request.json();
  try {
    const solve = await db.solve.update({
      where: {
        id: Number(id)
      },
      data: {
        status
      }
    });
    return new Response(JSON.stringify({ success: true, solve }));
  } catch (e) {
    return new Response(JSON.stringify({ success: false }));
  }
};
export {
  DELETE,
  GET,
  PUT
};
