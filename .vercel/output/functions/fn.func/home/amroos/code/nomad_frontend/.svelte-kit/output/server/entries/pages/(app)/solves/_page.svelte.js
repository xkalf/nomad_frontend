import { c as create_ssr_component, b as subscribe, v as validate_component, f as each } from "../../../../chunks/ssr.js";
import { M as MobileContainer, A as Average, S as Sessions } from "../../../../chunks/MobileContainer.js";
import { b as bestSolve, S as Solves } from "../../../../chunks/Solves2.js";
import { s as solves } from "../../../../chunks/solves.js";
import { b as getBest, j as getWorst, a as getBestAverage } from "../../../../chunks/timer-utils.js";
async function changeCubeType(type) {
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $solves, $$unsubscribe_solves;
  let $bestSolve, $$unsubscribe_bestSolve;
  $$unsubscribe_solves = subscribe(solves, (value) => $solves = value);
  $$unsubscribe_bestSolve = subscribe(bestSolve, (value) => $bestSolve = value);
  let averages;
  {
    averages = [
      {
        label: "Best",
        value: getBest($bestSolve)
      },
      { label: "Worst", value: getWorst($solves) },
      {
        label: "Ao5 Best",
        solves: getBestAverage($solves, 5),
        count: 5
      },
      {
        label: "Ao5",
        solves: $solves.slice(-5),
        count: 5
      },
      {
        label: "Ao12 Best",
        solves: getBestAverage($solves, 12),
        count: 12
      },
      {
        label: "Ao12",
        solves: $solves.slice(-12),
        count: 12
      },
      {
        label: "Ao50",
        solves: $solves.slice(-50),
        count: 50
      },
      {
        label: "Ao100",
        solves: $solves.slice(-100),
        count: 100
      }
    ];
  }
  $$unsubscribe_solves();
  $$unsubscribe_bestSolve();
  return `${$$result.head += `<!-- HEAD_svelte-gka1tj_START -->${$$result.title = `<title>Эвлүүлэлтүүд</title>`, ""}<!-- HEAD_svelte-gka1tj_END -->`, ""} ${validate_component(MobileContainer, "MobileContainer").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-col gap-2 overflow-y-auto p-4"><h2 class="text-2xl text-primary" data-svelte-h="svelte-tl96o8">Stats</h2> <div class="grid grid-cols-2 gap-4">${each(averages, (average) => {
        return `${validate_component(Average, "Average").$$render(
          $$result,
          {
            best: true,
            mobile: true,
            label: average.label,
            value: average.value,
            count: average.count,
            solves: average.solves
          },
          {},
          {}
        )}`;
      })}</div> <h2 class="mt-2 text-2xl text-primary" data-svelte-h="svelte-hsmqqb">Solves</h2> ${validate_component(Solves, "Solves").$$render($$result, { mobile: true }, {}, {})} ${validate_component(Sessions, "Sessions").$$render($$result, { mobile: true, changeCubeType }, {}, {})}</div>`;
    }
  })}`;
});
export {
  Page as default
};
