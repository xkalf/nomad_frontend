import { d as db } from "../../../../../../chunks/db.js";
const GET = async ({ params: { id } }) => {
  const cfop = await db.cfopSolve.findUnique({
    where: { solveId: +id }
  });
  return new Response(JSON.stringify(cfop));
};
const POST = async ({ request, params: { id } }) => {
  const data = await request.json();
  try {
    await db.cfopSolve.upsert({
      where: {
        solveId: +id
      },
      create: { ...data, solveId: +id },
      update: { ...data, solveId: +id }
    });
    return new Response(JSON.stringify({ success: true }));
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: e }));
  }
};
export {
  GET,
  POST
};
