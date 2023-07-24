import { c as create_ssr_component, o as onDestroy, d as add_attribute, f as each, e as escape, b as subscribe, v as validate_component } from "./ssr.js";
import { I as Icon } from "./Icon.js";
import { h as getBestSolve, f as formatTime, i as getMean, g as getAvg, a as getBestAverage } from "./timer-utils.js";
import { s as solves, b as deleteSolves } from "./solves.js";
import { w as writable } from "./index2.js";
const image = "/_app/immutable/assets/ads.ce7106f4.webp";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { okFunction } = $$props;
  let { isOpen = false } = $$props;
  let { mode = "delete" } = $$props;
  onDestroy(() => {
  });
  if ($$props.okFunction === void 0 && $$bindings.okFunction && okFunction !== void 0)
    $$bindings.okFunction(okFunction);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  return `<div${add_attribute("class", `absolute top-0 left-0 flex h-screen w-full items-center justify-center ${isOpen ? "block" : "hidden"} z-50 bg-black bg-opacity-70`, 0)}><div class="w-4/5 rounded-xl bg-background p-4 md:w-auto md:p-12 md:pb-4"><img alt="ads"${add_attribute("src", image, 0)} class="mx-auto aspect-square w-[250px] md:w-[500px]"> <div class="my-4">${slots.default ? slots.default({}) : ``}</div> <div class="flex items-center justify-center gap-12"><button class="rounded-xl bg-primary py-2 px-4 text-xl text-white" data-svelte-h="svelte-4lx0xe">Болих</button> <button class="rounded-xl bg-primary py-2 px-4 text-xl text-white">${mode === "create" ? `Үүсгэх` : `${mode === "delete" ? `Устгах` : ``}`}</button></div></div></div>`;
});
const sortMode = writable("none");
const bestSolve = writable();
solves.subscribe((i) => {
  const best = getBestSolve(i);
  bestSolve.set({ ...best, open: false });
});
const SolvesList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { solves: solves2 = [] } = $$props;
  if ($$props.solves === void 0 && $$bindings.solves && solves2 !== void 0)
    $$bindings.solves(solves2);
  return `<h3 class="mt-8 text-3xl text-center" data-svelte-h="svelte-yh6j77">Эвлүүлэлтийн жагсаалт</h3> <div class="overflow-y-auto pr-4 mx-4 mt-2 max-h-40 text-2xl md:mx-8 md:max-h-72 lg:mx-12">${each(solves2, (solve, index) => {
    return `<div class="flex gap-2 py-2 md:gap-4"><span>${escape(index + 1)}.</span> <span>${escape(formatTime(solve))}</span> <span class="overflow-hidden whitespace-nowrap text-ellipsis">${escape(solve.scramble)}</span> </div>`;
  })}</div>`;
});
function formatDate(curr) {
  const date = new Date(curr);
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}.${date.getSeconds().toString().padStart(2, "0")}`;
}
const Solve = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { order } = $$props;
  let { solve } = $$props;
  let { showDate = false } = $$props;
  let { openDeleteModal } = $$props;
  let { openShowModal } = $$props;
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  if ($$props.solve === void 0 && $$bindings.solve && solve !== void 0)
    $$bindings.solve(solve);
  if ($$props.showDate === void 0 && $$bindings.showDate && showDate !== void 0)
    $$bindings.showDate(showDate);
  if ($$props.openDeleteModal === void 0 && $$bindings.openDeleteModal && openDeleteModal !== void 0)
    $$bindings.openDeleteModal(openDeleteModal);
  if ($$props.openShowModal === void 0 && $$bindings.openShowModal && openShowModal !== void 0)
    $$bindings.openShowModal(openShowModal);
  return `<div class="flex justify-between p-2 text-white"><button>${escape(order)}. ${escape(formatTime(solve))} ${showDate ? `(${escape(formatDate(solve.createdAt))})
		` : ``}</button> <div class="flex gap-1"><button class="text-red-500" data-svelte-h="svelte-1d8xf9c">+2</button> <button class="text-white" data-svelte-h="svelte-1wz9rif">DNF</button> <button class="text-red-500" data-svelte-h="svelte-1h4xr3v">✕</button></div></div>`;
});
const Mean = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $solves, $$unsubscribe_solves;
  $$unsubscribe_solves = subscribe(solves, (value) => $solves = value);
  let { isOpen = false } = $$props;
  let { isAdmin = false } = $$props;
  const averages = [5, 12, 25, 50, 100, 200, 300, 500, 1e3];
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.isAdmin === void 0 && $$bindings.isAdmin && isAdmin !== void 0)
    $$bindings.isAdmin(isAdmin);
  $$unsubscribe_solves();
  return `<div${add_attribute(
    "class",
    `${isOpen ? "block" : "hidden"} ${isAdmin ? "" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"} z-20 w-5/6 max-w-6xl rounded-xl bg-white p-4 font-sans text-primary md:px-0 xl:w-auto`,
    0
  )}><div class="mx-auto w-full md:w-3/5"><h2 class="text-2xl text-center md:text-3xl">Дундаж ${escape(getMean($solves))}</h2> <div class="overflow-y-auto max-h-64">${each(averages.filter((i) => i <= $solves.length), (average) => {
    return `<div class="mx-auto mt-2 md:mt-6"><div class="flex items-center w-full text-lg text-center text-white rounded-xl bg-secondary"><div class="p-4 w-2/5 rounded-xl md:w-1/5 bg-primary">Ao${escape(average)}</div> <div class="w-2/5 text-center">${escape(getAvg($solves, average))}</div> <div class="w-2/5 text-center text-green-400">${escape(getAvg(getBestAverage($solves, average), average))} </div></div> </div>`;
  })}</div></div> ${!isAdmin ? `${validate_component(SolvesList, "SolvesList").$$render($$result, { solves: $solves }, {}, {})} <div class="flex justify-center mt-2"><button class="py-2 px-4 text-xl text-white rounded-xl bg-primary" data-svelte-h="svelte-h1x629">Close</button></div>` : ``}</div>`;
});
function compare(a, b) {
  if (a.status === "Ok" && b.status === "Ok") {
    return a.time - b.time;
  }
  if (a.status === "Dnf" && b.status === "Dnf") {
    return 0;
  }
  if (a.status === "Dnf") {
    return 1;
  }
  if (b.status === "Dnf") {
    return -1;
  }
  let timeA = a.time;
  let timeB = b.time;
  if (a.status === "Plus2") {
    timeA += 2e3;
  }
  if (b.status === "Plus2") {
    timeB += 2e3;
  }
  return timeA - timeB;
}
const Solves = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formattedSolves;
  let $solves, $$unsubscribe_solves;
  let $sortMode, $$unsubscribe_sortMode;
  $$unsubscribe_solves = subscribe(solves, (value) => $solves = value);
  $$unsubscribe_sortMode = subscribe(sortMode, (value) => $sortMode = value);
  let { mobile = false } = $$props;
  let { showDate = false } = $$props;
  let deleteModalOpen = false;
  let selected = void 0;
  let showModal;
  let isMeanOpen = false;
  async function deleteSolve() {
    if (!selected)
      return;
    const response = await fetch(`/api/solve/${selected.id}`, { method: "DELETE" });
    const data = await response.json();
    if (data.success === true) {
      deleteSolves(selected.id);
      deleteModalOpen = false;
    }
  }
  bestSolve.subscribe(async (i) => {
    if (i.open) {
      selected = i;
      showModal.showModal();
    }
  });
  if ($$props.mobile === void 0 && $$bindings.mobile && mobile !== void 0)
    $$bindings.mobile(mobile);
  if ($$props.showDate === void 0 && $$bindings.showDate && showDate !== void 0)
    $$bindings.showDate(showDate);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    formattedSolves = $sortMode === "asc" ? $solves.slice().sort((a, b) => compare(a, b)) : $sortMode === "desc" ? $solves.slice().sort((a, b) => compare(b, a)) : $solves.slice().reverse();
    $$rendered = `<div${add_attribute("class", `${mobile ? "max-h-96 min-h-[200px]" : "mx-4 flex-grow"} flex flex-col overflow-y-auto rounded-xl bg-secondary`, 0)}><div class="grid w-full grid-cols-3 items-center rounded-t-xl bg-primary py-2 text-lg text-white"><div class="flex items-center"><button class="h-5 translate-x-4">${$sortMode === "none" ? `${validate_component(Icon, "Icon").$$render(
      $$result,
      {
        icon: "ri:arrow-up-down-fill",
        width: "22"
      },
      {},
      {}
    )}` : `${$sortMode === "asc" ? `${validate_component(Icon, "Icon").$$render($$result, { icon: "ri:arrow-up-fill", width: "22" }, {}, {})}` : `${$sortMode === "desc" ? `${validate_component(Icon, "Icon").$$render($$result, { icon: "ri:arrow-down-fill", width: "22" }, {}, {})}` : ``}`}`}</button></div> <div class="col-span-2 flex justify-start"><button>Mean ${escape(getMean($solves))}</button></div></div>  <ul class="scrollbar mr-2 flex-grow overflow-y-auto p-4">${each(formattedSolves, (solve, index) => {
      return `<li>${validate_component(Solve, "Solve").$$render(
        $$result,
        {
          openDeleteModal: () => {
            selected = solve;
            deleteModalOpen = true;
          },
          openShowModal: () => {
            selected = solve;
            showModal.showModal();
          },
          order: $sortMode === "none" ? formattedSolves.length - index : index + 1,
          showDate,
          solve
        },
        {},
        {}
      )} </li>`;
    })}</ul></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        okFunction: deleteSolve,
        isOpen: deleteModalOpen
      },
      {
        isOpen: ($$value) => {
          deleteModalOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<p class="text-lg text-primary" data-svelte-h="svelte-1l25qom">Уг эвлүүлэлтийг устгах уу?</p>`;
        }
      }
    )} ${validate_component(Mean, "Mean").$$render(
      $$result,
      { isOpen: isMeanOpen },
      {
        isOpen: ($$value) => {
          isMeanOpen = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${selected ? `<dialog class="w-full rounded-xl bg-background p-4 font-sans text-primary md:w-3/5 md:px-0"${add_attribute("this", showModal, 0)}><div class="mx-auto w-full md:w-3/5"><h2 class="text-center text-2xl md:text-3xl">Эвлүүлэлт №${escape($sortMode === "none" ? formattedSolves.length - formattedSolves.findIndex((i) => i === selected) : formattedSolves.findIndex((i) => i === selected) + 1)}</h2> <div class="flex w-full items-center justify-between p-2 text-2xl text-primary"><span>${escape(formatTime(selected))}</span> <div class="flex gap-4"><button class="text-red-500" data-svelte-h="svelte-11ma2lw">+2</button> <button class="text-primary" data-svelte-h="svelte-lyk91e">DNF</button> <button class="text-red-500" data-svelte-h="svelte-107a9ih">✕</button></div></div> <div class="flex flex-col gap-2 pt-2"><div class="mt-2"><p class="text-xl" data-svelte-h="svelte-pzuz2s">Холилт</p> <input type="text"${add_attribute("value", selected.scramble, 0)} disabled class="mt-2 w-full rounded-lg border border-primary p-2"></div> <div class="mt-2" data-svelte-h="svelte-123huh6"><p class="text-xl">Тайлбар</p> <input type="text" placeholder="Тайлбар бичнэ үү" class="mt-2 w-full rounded-lg border border-primary p-2"></div> <form method="dialog" class="flex items-center justify-center gap-12 pt-4" data-svelte-h="svelte-hpyi53"><button value="cancel" formmethod="dialog" class="rounded-xl bg-primary py-2 px-4 text-xl text-white">Цуцлах</button> <button class="rounded-xl bg-primary py-2 px-4 text-xl text-white">Хадгалах</button></form></div></div></dialog>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_solves();
  $$unsubscribe_sortMode();
  return $$rendered;
});
export {
  Modal as M,
  Solves as S,
  SolvesList as a,
  bestSolve as b,
  Mean as c,
  sortMode as s
};
