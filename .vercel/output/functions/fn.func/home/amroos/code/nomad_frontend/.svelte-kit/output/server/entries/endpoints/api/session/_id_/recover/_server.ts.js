import { d as db } from "../../../../../../chunks/db.js";
const GET = async ({ params: { id } }) => {
  const deletedSolves = await db.solveDeleted.findMany({
    where: {
      sessionId: +id
    }
  });
  const formatted = deletedSolves.map((i) => {
    const { solveId, deleted, id: id2, ...rest } = i;
    return { ...rest };
  });
  await db.$transaction([
    db.solve.createMany({
      data: formatted
    }),
    db.solveDeleted.deleteMany({
      where: {
        sessionId: +id
      }
    })
  ]);
  return new Response(JSON.stringify({ success: true }));
};
export {
  GET
};
