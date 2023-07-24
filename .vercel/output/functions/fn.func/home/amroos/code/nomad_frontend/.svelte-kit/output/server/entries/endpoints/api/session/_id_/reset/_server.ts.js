import { d as db } from "../../../../../../chunks/db.js";
const DELETE = async ({ params: { id } }) => {
  try {
    const deletedSolves = await db.solve.findMany({
      where: {
        sessionId: +id
      }
    });
    const [cfopSolves, twoLookSolves] = await db.$transaction([
      db.cfopSolve.findMany({
        where: {
          solveId: { in: deletedSolves.map((i) => i.id) }
        }
      }),
      db.twoLookSolve.findMany({
        where: {
          solveId: { in: deletedSolves.map((i) => i.id) }
        }
      })
    ]);
    await db.$transaction([
      db.solveDeleted.createMany({
        data: [
          ...deletedSolves.map((i) => {
            const { id: id2, ...rest } = i;
            return { ...rest, solveId: id2 };
          })
        ]
      }),
      db.cfopSolveDeleted.createMany({
        data: [
          ...cfopSolves.map((i) => {
            const { id: cfopSolveId, ...rest } = i;
            return { ...rest, cfopSolveId };
          })
        ]
      }),
      db.cfopSolve.deleteMany({
        where: {
          id: { in: cfopSolves.map((i) => i.id) }
        }
      }),
      db.twoLookSolveDeleted.createMany({
        data: [
          ...twoLookSolves.map((i) => {
            const { id: twoLookSolveId, ...rest } = i;
            return { ...rest, twoLookSolveId };
          })
        ]
      }),
      db.twoLookSolve.deleteMany({
        where: {
          id: { in: twoLookSolves.map((i) => i.id) }
        }
      }),
      db.solve.deleteMany({
        where: {
          sessionId: +id
        }
      })
    ]);
    return new Response(JSON.stringify({ success: true }));
  } catch (e) {
    return new Response(JSON.stringify({ success: false }));
  }
};
export {
  DELETE
};
