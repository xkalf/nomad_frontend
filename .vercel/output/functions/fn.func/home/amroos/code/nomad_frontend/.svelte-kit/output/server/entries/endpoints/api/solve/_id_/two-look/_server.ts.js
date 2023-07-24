import { d as db } from "../../../../../../chunks/db.js";
const GET = async ({ params: { id } }) => {
  const twoLook = await db.twoLookSolve.findUnique({
    where: { solveId: +id }
  });
  return new Response(JSON.stringify(twoLook));
};
const POST = async ({ request, params: { id } }) => {
  const data = await request.json();
  try {
    await db.twoLookSolve.upsert({
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
