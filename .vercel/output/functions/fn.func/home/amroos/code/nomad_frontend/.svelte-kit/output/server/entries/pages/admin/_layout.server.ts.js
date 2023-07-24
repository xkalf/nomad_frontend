import { d as db } from "../../../chunks/db.js";
import { r as redirect } from "../../../chunks/index.js";
const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, "/login");
  }
  if (locals.user.role !== "Admin") {
    throw redirect(303, "/");
  }
  const getUsers = async () => {
    return await db.user.findMany({
      orderBy: {
        firstname: "desc"
      },
      include: {
        sessions: {
          orderBy: [
            {
              main: "desc"
            },
            {
              name: "desc"
            }
          ],
          include: {
            _count: {
              select: { solves: true }
            }
          }
        }
      }
    });
  };
  return {
    users: getUsers()
  };
};
export {
  load
};
