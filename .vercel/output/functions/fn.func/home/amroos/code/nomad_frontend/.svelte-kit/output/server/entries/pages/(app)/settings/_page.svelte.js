import { c as create_ssr_component, d as add_attribute, e as escape, b as subscribe, v as validate_component, f as each } from "../../../../chunks/ssr.js";
import { M as MobileNavbar } from "../../../../chunks/MobileNavbar.js";
import { S as SidebarContainer } from "../../../../chunks/SidebarContainer.js";
import { a as settings } from "../../../../chunks/settings.js";
const throttleBeta = (cb, delay = 1e3) => {
  let shouldWait = false;
  let waitingArgs = null;
  const timeOutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeOutFunc, delay);
    }
  };
  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    cb(...args);
    shouldWait = true;
    setTimeout(timeOutFunc, delay);
  };
};
const InputNumber_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "input[type='number'].svelte-18kz67u::-webkit-inner-spin-button,input[type='number'].svelte-18kz67u::-webkit-outer-spin-button{appearance:none}",
  map: null
};
const InputNumber = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  let { max = null } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  $$result.css.add(css$1);
  return `<div class="flex justify-between rounded-md bg-white"><button class="py-2 px-4" data-svelte-h="svelte-kceo1z">-</button> <input type="number" class="w-2/5 appearance-none text-center focus:outline-none md:p-2 svelte-18kz67u"${add_attribute("value", value, 0)}> <button class="rounded-tr-md rounded-br-md bg-white py-2 px-4" data-svelte-h="svelte-1ch7mei">+</button> </div>`;
});
const ItemContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label = "" } = $$props;
  let { size = "sm" } = $$props;
  let { mobileSize = "sm" } = $$props;
  const sizeMapper = {
    sm: "md:col-span-2",
    md: "md:col-span-3",
    lg: "md:col-span-6"
  };
  const mobileSizeMapper = { sm: "col-span-3", lg: "col-span-6" };
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.mobileSize === void 0 && $$bindings.mobileSize && mobileSize !== void 0)
    $$bindings.mobileSize(mobileSize);
  return `<div${add_attribute("class", `${sizeMapper[size]} ${mobileSizeMapper[mobileSize]} flex flex-col items-center gap-4 rounded-lg bg-primary px-2 pt-8 pb-4 text-black`, 0)}><p class="text-center text-xl text-white">${escape(label)}</p> ${slots.default ? slots.default({}) : ``}</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".select.svelte-bzc6tn{@apply w-full rounded-md p-2;}.page.svelte-bzc6tn{@apply grid grid-cols-6 gap-4;}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  let settingsForm = (({ id, createdAt, updatedAt, userId, ...rest }) => rest)($settings);
  const updateSettings = throttleBeta(
    async (args) => {
      return;
    },
    1e3
  );
  const shortCuts = [
    {
      base: "Alt",
      key: "1-7",
      label: "Төрөл солигдоно"
    },
    {
      base: "Alt",
      key: "Z",
      label: "Сүүлийн эвлүүлэлт устгана"
    },
    { base: "Alt", key: "C", label: "Clock" },
    {
      base: "Alt",
      key: "D",
      label: "Багцын эвлүүлэлтийг устгана"
    },
    { base: "Alt", key: "M", label: "Megaminx" },
    {
      base: "Alt",
      key: "N",
      label: "Шинэ хэсэг нээх"
    },
    { base: "Alt", key: "P", label: "Pyraminx" },
    {
      base: "Ctrl",
      key: "1",
      label: "Сүүлийн эвлүүлэлтийн +2 болиулах"
    },
    { base: "Alt", key: "S", label: "Skewb" },
    {
      base: "Ctrl",
      key: "2",
      label: "Сүүлийн эвлүүлэлтэнд +2 нэмэх"
    },
    { base: "Alt", key: "B", label: "Blind" },
    {
      base: "Ctrl",
      key: "3",
      label: "Сүүлийн эвлүүлэлтэнд DNF нэмэх"
    }
  ];
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      updateSettings(settingsForm);
    }
    $$rendered = `<div class="h-screen md:grid md:grid-cols-[minmax(350px,_1fr)_4fr]">${validate_component(SidebarContainer, "SidebarContainer").$$render($$result, {}, {}, {})} <div class="flex overflow-hidden flex-col h-screen"><div class="overflow-y-auto p-4 pb-8 h-auto md:p-14 md:min-h-screen bg-background"> <p class="mb-4 text-4xl text-primary" data-svelte-h="svelte-5dswpj">Дэлгэц</p> <div class="page svelte-bzc6tn">${validate_component(ItemContainer, "ItemContainer").$$render($$result, { label: "Ойртуулж холдуулах" }, {}, {
      default: () => {
        return `<div class="grid grid-cols-3 items-center px-4 mx-auto md:px-0 md:w-1/2"><span class="text-lg text-white">${escape(settingsForm.zoom)}%</span> <input min="70" max="130" step="10" class="col-span-2 accent-white" type="range"${add_attribute("value", settingsForm.zoom, 0)}></div>`;
      }
    })} ${validate_component(ItemContainer, "ItemContainer").$$render($$result, { label: "Хугацааны үсгийн хэлбэр" }, {}, {
      default: () => {
        return `<div class="mx-auto w-1/2"><select class="select svelte-bzc6tn"><option value="Mono" data-svelte-h="svelte-1l2qgga">Mono</option><option value="Montserat" data-svelte-h="svelte-hs0kcs">Montserat</option><option value="Arial" data-svelte-h="svelte-1wf7cmk">Arial</option><option value="Inter" data-svelte-h="svelte-3k6lry">Inter</option></select></div>`;
      }
    })} ${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Хугацааны хэмжээ",
        mobileSize: "lg"
      },
      {},
      {
        default: () => {
          return `${validate_component(InputNumber, "InputNumber").$$render(
            $$result,
            { value: settingsForm.timerSize },
            {
              value: ($$value) => {
                settingsForm.timerSize = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )} ${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Үндсэн холилтийн хэмжээ ашиглах",
        mobileSize: "lg",
        size: "md"
      },
      {},
      {
        default: () => {
          return `<div class="flex justify-center mx-auto w-1/2"><input class="w-6 h-6" type="checkbox"${add_attribute("checked", settingsForm.defaultScrambleSize, 1)}></div>`;
        }
      }
    )} ${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Холилтийн хэмжээ",
        mobileSize: "lg",
        size: "md"
      },
      {},
      {
        default: () => {
          return `${validate_component(InputNumber, "InputNumber").$$render(
            $$result,
            { value: settingsForm.scrambleSize },
            {
              value: ($$value) => {
                settingsForm.scrambleSize = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )} ${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Дэлгэцний арын зураг",
        size: "md"
      },
      {},
      {
        default: () => {
          return `<div class="mx-auto w-1/2"><select class="select svelte-bzc6tn"><option${add_attribute("value", null, 0)} data-svelte-h="svelte-18pgsgd">Зураггүй</option><option value="image-1" data-svelte-h="svelte-1ol2med">Зураг 1</option><option value="image-2" data-svelte-h="svelte-um7hnr">Зураг 2</option><option value="link" data-svelte-h="svelte-lgvbww">Линкээр оруулах</option><option value="upload-image" data-svelte-h="svelte-fwgr2i">Зураг оруулах</option></select></div>`;
        }
      }
    )} ${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Дэлгэцний арын зурагний тодруулж бүдгэрүүлэх",
        size: "md"
      },
      {},
      {
        default: () => {
          return `<div class="grid grid-cols-3 items-center px-4 mx-auto md:px-0 md:w-1/2"><span class="text-lg text-white">${escape(settingsForm.backgroundImageOpacity)}%</span> <input type="range" class="col-span-2 accent-white" min="10" max="100" step="10"${add_attribute("value", settingsForm.backgroundImageOpacity, 0)}></div>`;
        }
      }
    )}</div> <div class="hidden grid-cols-2 py-4 px-8 mt-8 text-2xl bg-white rounded-xl border-2 md:grid border-primary text-primary">${each(shortCuts, (shortCut) => {
      return `<div class="py-2"><span class="p-2 rounded-xl bg-background">${escape(shortCut.base)}</span> <span class="p-2 rounded-xl bg-background">${escape(shortCut.key)}</span> <span>${escape(shortCut.label)}</span> </div>`;
    })}</div>  <p class="mt-8 mb-4 text-4xl text-primary" data-svelte-h="svelte-jilwnw">Хугацаа хэмжигч</p> <div class="page svelte-bzc6tn">${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Хулганаар хугацаа хэмжигчийг эхлүүлэх"
      },
      {},
      {
        default: () => {
          return `<div class="flex justify-center mx-auto w-1/2"><input class="w-6 h-6" type="checkbox"${add_attribute("checked", settingsForm.useMouseTimer, 1)}></div>`;
        }
      }
    )} ${validate_component(ItemContainer, "ItemContainer").$$render($$result, { label: "Ажиглалтын хугацаа" }, {}, {
      default: () => {
        return `<div class="mx-auto w-1/2"><select class="select svelte-bzc6tn"><option value="Never" data-svelte-h="svelte-1f49i4j">Болиулах</option><option value="Always" data-svelte-h="svelte-53oh9d">Зөвшөөрөх</option><option value="ExceptBLD" data-svelte-h="svelte-9wjcsy">Зөвхөн Харахгүй эвлүүлэлт дээр</option></select></div>`;
      }
    })} ${validate_component(ItemContainer, "ItemContainer").$$render($$result, { label: "Дуут дохиог чангалах" }, {}, {
      default: () => {
        return `<div class="grid grid-cols-3 items-center px-4 mx-auto md:px-0 md:w-1/2"><span class="text-lg text-white">${escape(settingsForm.voiceVolume)}%</span> <input type="range" min="1" max="100" class="col-span-2 accent-white"${add_attribute("value", settingsForm.voiceVolume, 0)}></div>`;
      }
    })} ${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Ажиглалтын хугацааг дуут дохиогоор сануулах",
        size: "md"
      },
      {},
      {
        default: () => {
          return `<div class="mx-auto w-1/2"><select class="select svelte-bzc6tn"><option value="None" data-svelte-h="svelte-pip8ku">үгүй</option><option value="Male" data-svelte-h="svelte-1acib0w">Эрэгтэй</option><option value="Female" data-svelte-h="svelte-1y9957v">Эмэгтэй</option><option value="Mygmardorj" data-svelte-h="svelte-1wnmkdc">Мягмардорж</option><option value="Aliya" data-svelte-h="svelte-1mpwo3a">Алья</option></select></div>`;
        }
      }
    )} ${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Хугацаа хэмжигчийг эхлүүлэхдээ SPACE -ыг дарах хугацаа",
        size: "md",
        mobileSize: "lg"
      },
      {},
      {
        default: () => {
          return `<div class="mx-auto w-1/2"><select class="select svelte-bzc6tn"><option${add_attribute("value", 0, 0)} data-svelte-h="svelte-2k0dyc">0</option><option${add_attribute("value", 300, 0)} data-svelte-h="svelte-1shz6as">0.3</option><option${add_attribute("value", 550, 0)} data-svelte-h="svelte-1ww3vs8">0.55</option><option${add_attribute("value", 1e3, 0)} data-svelte-h="svelte-15sy294">1</option></select></div>`;
        }
      }
    )}  ${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Эвлүүлт дундаа цагаа тэмдэглэх",
        mobileSize: "lg"
      },
      {},
      {
        default: () => {
          return `${validate_component(InputNumber, "InputNumber").$$render($$result, { value: settingsForm.multiPhase, max: 10 }, {}, {})}`;
        }
      }
    )} ${validate_component(ItemContainer, "ItemContainer").$$render($$result, { label: "Хугацаа хэмжигчийн холбох" }, {}, {
      default: () => {
        return `<div class="mx-auto w-1/2"><select class="select svelte-bzc6tn"><option value="Timer" data-svelte-h="svelte-k87njc">Хугацаа хэмжигч</option><option value="Typing" data-svelte-h="svelte-ho3814">Бичих</option><option value="Stackmat" data-svelte-h="svelte-586axn">Хугацаа хэмжигчийг AUX холбох</option><option value="Bluetooth" data-svelte-h="svelte-117mztj">Хугацаа хэмжигчийг BLUETOOTH холбох</option></select></div>`;
      }
    })} ${validate_component(ItemContainer, "ItemContainer").$$render(
      $$result,
      {
        label: "Хугацаа хэмжигчийн цагийг харуулах"
      },
      {},
      {
        default: () => {
          return `<div class="mx-auto w-1/2"><select class="select svelte-bzc6tn"><option value="Default" data-svelte-h="svelte-5j9lrc">0.01</option><option value="Point" data-svelte-h="svelte-1ko67rv">0.1</option><option value="Seconds" data-svelte-h="svelte-1q028dl">зөвхөн секундийг харуулна</option><option value="Inspection" data-svelte-h="svelte-ac3jwv">ажиглалтийн хугацааг зөвхөн харуулна</option><option value="None" data-svelte-h="svelte-8sw6p2">хугацааг харуулахгүй</option></select></div>`;
        }
      }
    )}</div> <form action="/logout" method="post" data-svelte-h="svelte-1k5vtv8"><button class="block p-4 mt-4 w-full text-white rounded-lg md:hidden bg-primary">Гарах</button></form></div> ${validate_component(MobileNavbar, "MobileNavbar").$$render($$result, {}, {}, {})}</div> </div>`;
  } while (!$$settled);
  $$unsubscribe_settings();
  return $$rendered;
});
export {
  Page as default
};
