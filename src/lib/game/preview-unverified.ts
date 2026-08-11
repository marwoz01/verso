import type { GameObject } from "./types";

const SOURCED = "2026-08-11";

export const PREVIEW_OBJECTS: GameObject[] = [
  {
    id: "burj-khalifa",
    name: { en: "Burj Khalifa", pl: "Burdż Chalifa" },
    domain: "architecture",
    traits: [
      {
        label: { en: "height", pl: "wysokość" },
        unit: "length",
        value: 828,
        source: {
          url: "https://en.wikipedia.org/wiki/Burj_Khalifa",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "construction cost", pl: "koszt budowy" },
        unit: "money",
        value: 1_500_000_000,
        source: {
          url: "https://en.wikipedia.org/wiki/Burj_Khalifa",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "floor area", pl: "powierzchnia użytkowa" },
        unit: "area",
        value: 309_473,
        source: {
          url: "https://en.wikipedia.org/wiki/Burj_Khalifa",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
    ],
  },
  {
    id: "titanic",
    name: { en: "Titanic", pl: "Titanic" },
    domain: "transport",
    traits: [
      {
        label: { en: "length", pl: "długość" },
        unit: "length",
        value: 269.1,
        source: {
          url: "https://en.wikipedia.org/wiki/Titanic",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "displacement", pl: "wyporność" },
        unit: "weight",
        value: 52_310_000,
        source: {
          url: "https://en.wikipedia.org/wiki/Titanic",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "time it took to sink", pl: "czas tonięcia" },
        unit: "time",
        value: 9_600,
        source: {
          url: "https://en.wikipedia.org/wiki/Sinking_of_the_Titanic",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "construction cost in 1912", pl: "koszt budowy w 1912" },
        unit: "money",
        value: 7_500_000,
        source: {
          url: "https://en.wikipedia.org/wiki/Titanic",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
    ],
  },
  {
    id: "blue-whale",
    name: { en: "Blue whale", pl: "Płetwal błękitny" },
    domain: "nature",
    traits: [
      {
        label: { en: "body length", pl: "długość ciała" },
        unit: "length",
        value: 30,
        source: {
          url: "https://en.wikipedia.org/wiki/Blue_whale",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "body mass", pl: "masa ciała" },
        unit: "weight",
        value: 150_000,
        source: {
          url: "https://en.wikipedia.org/wiki/Blue_whale",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "swimming speed", pl: "prędkość pływania" },
        unit: "speed",
        value: 9,
        source: {
          url: "https://en.wikipedia.org/wiki/Blue_whale",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
    ],
  },
  {
    id: "poland",
    name: { en: "Poland", pl: "Polska" },
    domain: "geography",
    traits: [
      {
        label: { en: "population", pl: "liczba mieszkańców" },
        unit: "people",
        value: 37_600_000,
        source: { url: "https://stat.gov.pl/", retrievedAt: SOURCED },
        volatility: "slow",
      },
      {
        label: { en: "land area", pl: "powierzchnia" },
        unit: "area",
        value: 312_696_000_000,
        source: { url: "https://stat.gov.pl/", retrievedAt: SOURCED },
        volatility: "static",
      },
      {
        label: { en: "nominal GDP", pl: "PKB nominalne" },
        unit: "money",
        value: 810_000_000_000,
        source: {
          url: "https://data.worldbank.org/country/poland",
          retrievedAt: SOURCED,
        },
        volatility: "fast",
      },
    ],
  },
  {
    id: "iss",
    name: {
      en: "International Space Station",
      pl: "Międzynarodowa Stacja Kosmiczna",
    },
    domain: "space",
    traits: [
      {
        label: { en: "orbital speed", pl: "prędkość orbitalna" },
        unit: "speed",
        value: 7_660,
        source: {
          url: "https://en.wikipedia.org/wiki/International_Space_Station",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "mass", pl: "masa" },
        unit: "weight",
        value: 419_725,
        source: {
          url: "https://en.wikipedia.org/wiki/International_Space_Station",
          retrievedAt: SOURCED,
        },
        volatility: "slow",
      },
      {
        label: { en: "time to orbit Earth once", pl: "czas jednego okrążenia Ziemi" },
        unit: "time",
        value: 5_580,
        source: {
          url: "https://en.wikipedia.org/wiki/International_Space_Station",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
    ],
  },
  {
    id: "mount-everest",
    name: { en: "Mount Everest", pl: "Mount Everest" },
    domain: "nature",
    traits: [
      {
        label: { en: "height above sea level", pl: "wysokość n.p.m." },
        unit: "length",
        value: 8_849,
        source: {
          url: "https://en.wikipedia.org/wiki/Mount_Everest",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "people who reached the summit", pl: "liczba zdobywców" },
        unit: "people",
        value: 6_000,
        source: {
          url: "https://en.wikipedia.org/wiki/Mount_Everest",
          retrievedAt: SOURCED,
        },
        volatility: "slow",
      },
      {
        label: { en: "length of a typical expedition", pl: "długość typowej wyprawy" },
        unit: "time",
        value: 5_184_000,
        source: {
          url: "https://en.wikipedia.org/wiki/Mount_Everest",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
    ],
  },
  {
    id: "eiffel-tower",
    name: { en: "Eiffel Tower", pl: "Wieża Eiffla" },
    domain: "architecture",
    traits: [
      {
        label: { en: "height", pl: "wysokość" },
        unit: "length",
        value: 330,
        source: {
          url: "https://en.wikipedia.org/wiki/Eiffel_Tower",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "mass of the structure", pl: "masa konstrukcji" },
        unit: "weight",
        value: 10_100_000,
        source: {
          url: "https://en.wikipedia.org/wiki/Eiffel_Tower",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "visitors per year", pl: "zwiedzający rocznie" },
        unit: "people",
        value: 7_000_000,
        source: {
          url: "https://www.toureiffel.paris/en",
          retrievedAt: SOURCED,
        },
        volatility: "slow",
      },
    ],
  },
  {
    id: "cheetah",
    name: { en: "Cheetah", pl: "Gepard" },
    domain: "nature",
    traits: [
      {
        label: { en: "top speed", pl: "prędkość maksymalna" },
        unit: "speed",
        value: 29,
        source: {
          url: "https://en.wikipedia.org/wiki/Cheetah",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "body mass", pl: "masa ciała" },
        unit: "weight",
        value: 50,
        source: {
          url: "https://en.wikipedia.org/wiki/Cheetah",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "lifespan in the wild", pl: "długość życia na wolności" },
        unit: "time",
        value: 378_432_000,
        source: {
          url: "https://en.wikipedia.org/wiki/Cheetah",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
    ],
  },
  {
    id: "vatican-city",
    name: { en: "Vatican City", pl: "Watykan" },
    domain: "geography",
    traits: [
      {
        label: { en: "land area", pl: "powierzchnia" },
        unit: "area",
        value: 440_000,
        source: {
          url: "https://en.wikipedia.org/wiki/Vatican_City",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "population", pl: "liczba mieszkańców" },
        unit: "people",
        value: 764,
        source: {
          url: "https://en.wikipedia.org/wiki/Vatican_City",
          retrievedAt: SOURCED,
        },
        volatility: "slow",
      },
      {
        label: { en: "border length", pl: "długość granicy" },
        unit: "length",
        value: 3_200,
        source: {
          url: "https://en.wikipedia.org/wiki/Vatican_City",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
    ],
  },
  {
    id: "usain-bolt",
    name: { en: "Usain Bolt", pl: "Usain Bolt" },
    domain: "sport",
    traits: [
      {
        label: { en: "100 m world record", pl: "rekord świata na 100 m" },
        unit: "time",
        value: 9.58,
        source: {
          url: "https://worldathletics.org/records/by-category/world-records",
          retrievedAt: SOURCED,
        },
        volatility: "static",
      },
      {
        label: { en: "peak running speed", pl: "prędkość szczytowa" },
        unit: "speed",
        value: 12.27,
        source: { url: "https://worldathletics.org/", retrievedAt: SOURCED },
        volatility: "static",
      },
      {
        label: { en: "height", pl: "wzrost" },
        unit: "length",
        value: 1.95,
        source: { url: "https://worldathletics.org/", retrievedAt: SOURCED },
        volatility: "static",
      },
    ],
  },
];
