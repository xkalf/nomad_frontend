import { d as db } from "../../../../chunks/db.js";
import { f as formatTime } from "../../../../chunks/timer-utils.js";
const GET = async ({ url }) => {
  const userId = url.searchParams.get("userId");
  const sessions = await db.solve.findMany({
    where: {
      session: {
        userId: parseInt(userId || "1")
      }
    },
    include: {
      session: {
        select: {
          name: true,
          cube: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return new Response(JSON.stringify(sessions.map((i) => ({ ...i, time: formatTime(i) }))));
};
export {
  GET
};
