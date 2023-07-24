import { f as fail, r as redirect } from "../../../../chunks/index.js";
import { z } from "zod";
import { s as superValidate, a as setError, b as setMessage } from "../../../../chunks/superValidate.js";
const loginSchema = z.object({
  email: z.string().min(1).email({ message: "Буруу и-мэйл хаяг байна." }).transform((value) => value.toLocaleLowerCase()),
  password: z.string().min(1, { message: "Нууц үг оруулна уу." })
});
const load = async (event) => {
  const form = await superValidate(event, loginSchema);
  return {
    form
  };
};
const actions = {
  oAuth: async ({ locals, url }) => {
    const provider = url.searchParams.get("provider");
    const redirectUrl = url.origin;
    if (provider) {
      const { data, error: err } = await locals.sb.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl
        }
      });
      if (err) {
        return fail(400, {
          error: "Алдаа гарлаа."
        });
      }
      throw redirect(303, data.url);
    }
  },
  login: async (event) => {
    const { locals } = event;
    const formData = await superValidate(event, loginSchema);
    if (!formData.valid) {
      return {
        form: formData
      };
    }
    const { error: err } = await locals.sb.auth.signInWithPassword({
      email: formData.data.email,
      password: formData.data.password
    });
    if (err) {
      if (err.message === "Email not confirmed") {
        return setError(formData, "password", "И-мэйл хаягаа шалгана уу.");
      }
      if (err.status === 400) {
        return setError(formData, "", "Хэрэглэгчийн и-мэйл хаяг эсвэл нууц үг буруу байна.");
      }
      return setError(formData, "", "Сервер алдаа гарлаа.");
    }
    throw redirect(303, "/");
  },
  recovery: async (event) => {
    const { locals, url } = event;
    const form = await superValidate(event, loginSchema);
    if (form.errors.email) {
      return {
        form
      };
    }
    const { error } = await locals.sb.auth.resetPasswordForEmail(form.data.email, {
      redirectTo: url.origin
    });
    if (error) {
      if (error.status === 429) {
        return setError(form, "password", "Нууц үг сэргээх и-мэйлийг илгээсэн байна.");
      }
      return setError(form, "password", "Нууц үг сэргээхэд алдаа гарлаа.");
    }
    return setMessage(form, "Нууц үг сэргээх и-мэйлийг илгээлээ.");
  }
};
export {
  actions,
  load
};
