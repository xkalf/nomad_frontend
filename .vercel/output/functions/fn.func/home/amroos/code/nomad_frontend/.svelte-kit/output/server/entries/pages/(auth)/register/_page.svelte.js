import { c as create_ssr_component, b as subscribe, d as add_attribute, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { s as superForm, h as horizontalLogo } from "../../../../chunks/index3.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const input = "w-full border-4 border-[#e7e7e7] p-4 pl-14 focus:outline-none";
const icon = "absolute top-1/2 left-4 -translate-y-1/2 text-3xl";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  let { data } = $$props;
  const { form, errors, enhance } = superForm(data.form);
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  return `${$$result.head += `<!-- HEAD_svelte-enm0iw_START -->${$$result.title = `<title>Бүртгүүлэх</title>`, ""}<!-- HEAD_svelte-enm0iw_END -->`, ""} <div class="h-screen md:grid md:grid-cols-2"><div class="flex h-full flex-col p-4 md:p-3"><img${add_attribute("src", horizontalLogo, 0)} alt="logo" width="200" class="mx-auto mt-8"> <div class="mx-auto mt-8 w-4/5 md:p-4"><form action="?/register" method="POST" class="flex flex-col gap-2 text-2xl text-primary"><label for="firstname" data-svelte-h="svelte-c5gy8n">Нэр</label> <div class="relative"><input name="firstname" id="firstname" type="text"${add_attribute("class", input, 0)} required${add_attribute("value", $form.firstname, 0)}> ${validate_component(Icon, "Icon").$$render($$result, { class: icon, icon: "fa-solid:id-card" }, {}, {})}</div> ${$errors.firstname ? `<small class="text-sm text-red-500">${escape($errors.firstname)}</small>` : ``} <label for="lastname" data-svelte-h="svelte-njx4zq">Овог</label> <div class="relative"><input name="lastname" type="text" id="lastname"${add_attribute("class", input, 0)} required${add_attribute("value", $form.lastname, 0)}> ${validate_component(Icon, "Icon").$$render($$result, { class: icon, icon: "fa-solid:id-card" }, {}, {})}</div> ${$errors.lastname ? `<small class="text-sm text-red-500">${escape($errors.lastname)}</small>` : ``} <label for="email" data-svelte-h="svelte-4g8fbt">И-Мэйл хаяг</label> <div class="relative"><input name="email" type="email" id="email"${add_attribute("class", input, 0)}${add_attribute("value", $form.email, 0)}> ${validate_component(Icon, "Icon").$$render($$result, { class: icon, icon: "clarity:email-solid" }, {}, {})}</div> ${$errors.email ? `<small class="text-sm text-red-500">${escape($errors.email)}</small>` : ``} <label for="password" data-svelte-h="svelte-13vmykk">Нууц үг</label> <div class="relative"><input${add_attribute("class", input, 0)} name="password" id="password" required type="password"> ${validate_component(Icon, "Icon").$$render($$result, { class: icon, icon: "fa-solid:lock" }, {}, {})}</div> ${$errors.password ? `<small class="text-sm text-red-500">${escape($errors.password)}</small>` : ``} <label for="passwordRe" data-svelte-h="svelte-1qjwsv2">Нууц үг давтах</label> <div class="relative"><input${add_attribute("class", input, 0)} name="passwordRe" id="passwordRe" required type="password"> ${validate_component(Icon, "Icon").$$render($$result, { class: icon, icon: "fa-solid:lock" }, {}, {})}</div> ${$errors.passwordRe ? `<small class="text-sm text-red-500">${escape($errors.passwordRe)}</small>` : ``} <label for="phone" data-svelte-h="svelte-10elgw4">Утас</label> <div class="relative"><input name="phone" type="text" id="phone" required${add_attribute("class", input, 0)}${add_attribute("value", $form.phone, 0)}> ${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: icon,
      icon: "material-symbols:phone-in-talk-rounded"
    },
    {},
    {}
  )}</div> ${$errors.phone ? `<small class="text-sm text-red-500">${escape($errors.phone)}</small>` : ``} <div class="flex flex-wrap gap-2"><div class="flex w-full flex-col gap-2 md:w-1/2"><label for="birthdate" data-svelte-h="svelte-1mksw6l">Төрсөн өдөр</label> <div class="relative"><input name="birthdate" type="date" id="birthdate" required${add_attribute("class", input, 0)}${add_attribute("value", $form.birthdate, 0)}> ${validate_component(Icon, "Icon").$$render($$result, { class: icon, icon: "clarity:date-solid" }, {}, {})}</div> ${$errors.birthdate ? `<small class="text-sm text-red-500">${escape($errors.birthdate)}</small>` : ``}</div> <div class="flex w-full flex-col gap-2 md:w-1/2"><label for="gender" data-svelte-h="svelte-1tv2uh">Хүйс</label> <div class="relative"><select name="gender" required${add_attribute("class", `${input} py-[18px]`, 0)}><option value="Male" data-svelte-h="svelte-1acib0w">Эрэгтэй</option><option value="Female" data-svelte-h="svelte-1y9957v">Эмэгтэй</option></select> ${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      class: icon,
      icon: "material-symbols:person"
    },
    {},
    {}
  )}</div> ${$errors.gender ? `<small class="text-sm text-red-500">${escape($errors.gender)}</small>` : ``}</div></div> ${$errors._errors && $errors._errors.length > 0 ? `<small class="text-sm text-red-500">${escape($errors._errors[0])}</small>` : ``} <button class="mt-2 rounded bg-primary p-4 py-2 text-white" type="submit" data-svelte-h="svelte-10x8l27">Бүртгүүлэх</button></form> <div class="mt-2 flex items-center justify-center space-x-2 text-lg" data-svelte-h="svelte-cdby41"><span class="text-[#CECFD5]">Хаяг байгаа юу?</span> <a class="uppercase text-primary underline" href="/login">Нэвтрэх</a></div></div></div> <div class="hidden bg-primary md:block"></div></div>`;
});
export {
  Page as default
};
