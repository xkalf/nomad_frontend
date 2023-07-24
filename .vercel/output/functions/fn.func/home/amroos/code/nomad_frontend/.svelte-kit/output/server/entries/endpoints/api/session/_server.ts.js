import { d as db } from "../../../../chunks/db.js";
import { c as cubeTypeMapper } from "../../../../chunks/types.js";
import { N as NODE_ENV } from "../../../../chunks/private.js";
const GET = async ({ locals, url, cookies }) => {
  const cube = url.searchParams.get("cube");
  const sessions = await db.session.findMany({
    where: {
      userId: locals.user.id,
      cube
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
        select: {
          solves: true
        }
      }
    }
  });
  if (sessions.length === 0) {
    const newSession = await db.session.create({
      data: {
        userId: locals.user.id,
        main: true,
        name: cubeTypeMapper[cube],
        cube
      },
      include: {
        _count: {
          select: {
            solves: true
          }
        }
      }
    });
    cookies.set("sessionId", newSession.id.toString(), {
      path: "/",
      secure: NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30 * 12 * 10
    });
    return new Response(JSON.stringify({ sessions: [newSession] }));
  }
  return new Response(JSON.stringify({ sessions }));
};
const POST = async ({ request, locals }) => {
  const input = await request.json();
  const session = await db.session.create({
    data: {
      ...input,
      userId: locals.user.id
    },
    include: {
      solves: true
    }
  });
  return new Response(JSON.stringify({ session }));
};
export {
  GET,
  POST
};
