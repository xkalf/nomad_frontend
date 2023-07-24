import { Prisma } from "@prisma/client";
const scrambleMappper = {
  N2: "222",
  N3: "333",
  N4: "444",
  N5: "555",
  N6: "666",
  N7: "777",
  Megaminx: "minx",
  Pyraminx: "pyram",
  Clock: "clock",
  Sq1: "sq1",
  Bld3: "333bf",
  Bld4: "444bf",
  Bld5: "555bf",
  Skewb: "skewb"
};
const scrambleSizeMapper = {
  N2: "text-2xl md:text-5xl",
  N3: "text-2xl md:text-5xl",
  N4: "text-base md:text-5xl",
  N5: "text-sm md:text-5xl",
  N6: "text-xs md:text-2xl lg:text-3xl",
  N7: "text-xs md:text-2xl lg:text-3xl",
  Bld3: "text-2xl md:text-5xl",
  Bld4: "text-base md:text-5xl",
  Bld5: "text-sm md:text-5xl",
  Sq1: "text-2xl md:text-5xl",
  Pyraminx: "text-2xl md:text-5xl",
  Megaminx: "text-xs md:text-lg lg:text-2xl 2xl:text-3xl text-justify font-mono",
  Clock: "text-2xl md:text-5xl",
  Skewb: "text-2xl md:text-5xl"
};
const cubeTypes = [
  "N2",
  "N3",
  "N4",
  "N5",
  "N6",
  "N7",
  "Megaminx",
  "Pyraminx",
  "Clock",
  "Sq1",
  "Bld3",
  "Bld4",
  "Bld5",
  "Skewb"
];
const cubeTypeMapper = {
  N2: "2x2",
  N3: "3x3",
  N4: "4x4",
  N5: "5x5",
  N6: "6x6",
  N7: "7x7",
  Bld3: "3Bld",
  Bld4: "4Bld",
  Bld5: "5Bld",
  Sq1: "Sq1",
  Pyraminx: "Pyra",
  Megaminx: "Mega",
  Clock: "Clock",
  Skewb: "skewb"
};
Prisma.validator()({
  include: {
    solves: true
  }
});
Prisma.validator()({
  include: {
    _count: {
      select: { solves: true }
    }
  }
});
Prisma.validator()({
  include: {
    twoLookSolve: true,
    cfopSolve: true
  }
});
export {
  scrambleSizeMapper as a,
  cubeTypes as b,
  cubeTypeMapper as c,
  scrambleMappper as s
};
