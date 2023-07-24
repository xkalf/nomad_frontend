import { e as error, r as redirect } from "../../../../chunks/index.js";
const POST = async ({ locals }) => {
  const { error: err } = await locals.sb.auth.signOut();
  if (err) {
    throw error(500, "Сервер алдаа гарлаа.");
  }
  throw redirect(303, "/login");
};
export {
  POST
};
