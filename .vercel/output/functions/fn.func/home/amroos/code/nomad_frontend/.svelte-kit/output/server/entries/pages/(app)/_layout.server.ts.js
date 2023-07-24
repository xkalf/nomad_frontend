import { d as db } from "../../../chunks/db.js";
import { c as cubeTypeMapper } from "../../../chunks/types.js";
import { r as redirect } from "../../../chunks/index.js";
const load = async ({ locals, cookies }) => {
  if (!locals.session) {
    throw redirect(303, "/login");
  }
  if (!locals.user) {
    throw redirect(303, "/register");
  }
  const getSessions = async () => {
    const sessionId = cookies.get("sessionId");
    let session = null;
    let sessions;
    if (sessionId) {
      session = await db.session.findFirst({
        where: {
          id: +sessionId,
          userId: locals.user.id
        },
        include: {
          solves: true
        }
      });
    }
    if (!session) {
      session = await db.session.findFirst({
        where: {
          cube: "N3",
          main: true,
          userId: locals.user.id
        },
        include: {
          solves: true
        }
      });
    }
    if (!session) {
      session = await db.session.create({
        data: {
          cube: "N3",
          name: cubeTypeMapper["N3"],
          main: true,
          userId: locals.user.id
        },
        include: {
          solves: true
        }
      });
    }
    if (session) {
      cookies.set("sessionId", session.id.toString(), {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30 * 12 * 10
      });
      sessions = await db.session.findMany({
        where: {
          cube: session?.cube,
          userId: locals.user.id
        },
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
      });
      return { session, sessions };
    }
  };
  const getSettings = async () => {
    let settings;
    settings = await db.settings.findFirst({
      where: {
        userId: locals.user.id
      }
    });
    if (!settings) {
      settings = await db.settings.create({
        data: {
          userId: locals.user.id
        }
      });
    }
    return settings;
  };
  return {
    user: locals.user,
    getSessions: getSessions(),
    settings: getSettings()
  };
};
export {
  load
};
