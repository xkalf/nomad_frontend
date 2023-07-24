import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import { s as superForm, h as horizontalLogo } from "../../../../chunks/index3.js";
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
  return `${$$result.head += `<!-- HEAD_svelte-1ssssfz_START -->${$$result.title = `<title>Нууц үг сэргээх</title>`, ""}<!-- HEAD_svelte-1ssssfz_END -->`, ""} <div class="h-screen md:grid md:grid-cols-2"><div class="hidden bg-primary md:block"></div> <div class="flex h-full flex-col p-2 md:p-3"><div class="mx-auto flex flex-grow flex-col justify-center md:w-4/5"><div class="mx-auto flex w-4/5 flex-col justify-center md:w-full"><div class="mx-auto h-auto w-[30%]"><img${add_attribute("src", horizontalLogo, 0)} alt="rubik logo"></div> <p class="mt-2 text-center text-[8px] text-black md:text-xs" data-svelte-h="svelte-1vf49x7">Илүү олууллаа болцгооё. Тэмцээнд хэрхэн бүртгүүлэх талаар аль болох дэлгэрэнгүй заавар
					бичлэг бэлтгэлээ. Анх оролцох гэж байгаа тамирчидад маш их хэрэг болон гэдэгт итгэлтэй
					байна</p></div>  <form class="mt-4 flex w-full flex-col items-center gap-4 md:gap-6" action="?/recovery" method="POST"><div class="relative w-full px-4 text-black md:w-4/5"><input class="w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10" type="password" placeholder="Нууц үг" name="password" autocomplete="new-password"${add_attribute("value", $form.password, 0)}> ${$errors.password ? `<small class="text-sm text-red-500">${escape($errors.password)}</small>` : ``} <input class="mt-4 w-full content-center rounded-xl border border-[#ccc] py-2 px-4 align-top drop-shadow-lg focus:text-black md:py-5 md:px-10" type="password" placeholder="Нууц үг давтах" name="passwordRe" autocomplete="new-password"${add_attribute("value", $form.passwordRe, 0)}> ${$errors.passwordRe ? `<small class="text-sm text-red-500">${escape($errors.passwordRe)}</small>` : `${$errors._errors && $errors._errors.length > 0 ? `<small class="text-sm text-red-500">${escape($errors._errors[0])}</small>` : ``}`}</div> <div class="relative w-full px-4 text-[#cecfd5] md:w-4/5" data-svelte-h="svelte-3hpcjf"><button type="submit" class="w-full cursor-pointer rounded-lg bg-primary p-2 text-white drop-shadow md:p-4">Нууц үг сэргээх</button></div></form></div></div></div>`;
});
export {
  Page as default
};
