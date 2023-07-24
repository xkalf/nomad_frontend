import { d as db } from "./db.js";
import "./supabase.js";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
const handle = async ({ event, resolve }) => {
  const { session, supabaseClient } = await getSupabase(event);
  event.locals.sb = supabaseClient;
  event.locals.session = session;
  event.locals.prisma = db;
  if (session) {
    try {
      const user = await db.user.findFirst({
        where: {
          OR: [{ authId: session.user.id }, { email: session.user.email }]
        }
      });
      if (user) {
        await db.user.update({
          where: {
            id: user.id
          },
          data: {
            authId: session.user.id
          }
        });
        event.locals.user = user;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('data-theme=""', 'data-theme="nomad"')
  });
};
export {
  handle
};
