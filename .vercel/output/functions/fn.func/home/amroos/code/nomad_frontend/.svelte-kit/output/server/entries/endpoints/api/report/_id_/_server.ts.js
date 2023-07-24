import { d as db } from "../../../../../chunks/db.js";
import { f as formatTime, g as getAvg, a as getBestAverage } from "../../../../../chunks/timer-utils.js";
const GET = async ({ params: { id } }) => {
  const solves = await db.solve.findMany({
    where: {
      sessionId: +id
    }
  });
  const averages = [];
  for (let i = 4; i < solves.length; i++) {
    averages.push({
      solves: solves.slice(i, i + 12).map((i2) => formatTime(i2)),
      avg: getAvg(solves.slice(i, i + 12), 12)
    });
  }
  return new Response(
    JSON.stringify({ averages, bestAverage: getAvg(getBestAverage(solves, 12), 5) })
  );
};
export {
  GET
};
