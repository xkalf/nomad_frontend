import { d as db } from "../../../../chunks/db.js";
const GET = async ({ locals }) => {
  const settings = await db.settings.findFirst({
    where: {
      userId: locals.user.id
    }
  });
  if (settings) {
    return new Response(JSON.stringify({ settings }));
  }
  const newSettings = await db.settings.create({
    data: {
      userId: locals.user.id
    }
  });
  return new Response(JSON.stringify({ settings: newSettings }));
};
const PUT = async ({ locals, request }) => {
  const formData = await request.json();
  const settings = await db.settings.update({
    where: {
      userId: locals.user.id
    },
    data: { ...formData }
  });
  return new Response(JSON.stringify({ settings }));
};
export {
  GET,
  PUT
};
