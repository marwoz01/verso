import type { GameObject } from "./types";

const SOURCED = "2026-08-11";

export const PREVIEW_OBJECTS: GameObject[] = [
  {
    id: "burj-khalifa",
    name: { en: "Burj Khalifa", pl: "Burdż Chalifa" },
    domain: "architecture",
    photo: {
      url: "https://images.unsplash.com/photo-1459788025731-a85eb8dd27cc?auto=format&fit=crop&w=1600&q=80",
      author: "Ashim D’Silva",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1511316695145-4992006ffddb?auto=format&fit=crop&w=1600&q=80",
      author: "Peter Hansen",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1698472505070-6d3b90afb530?auto=format&fit=crop&w=1600&q=80",
      author: "Chinh Le Duc",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1600&q=80",
      author: "Kamil Gliwiński",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1614314007212-0257d6e2f7d8?auto=format&fit=crop&w=1600&q=80",
      author: "NASA",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1676471049029-f93852da351d?auto=format&fit=crop&w=1600&q=80",
      author: "Weichao Deng",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1600&q=80",
      author: "Anthony DELANOIX",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1619494296448-ab5f847ece97?auto=format&fit=crop&w=1600&q=80",
      author: "Sammy Wong",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1760727141174-1ea63435c7d7?auto=format&fit=crop&w=1600&q=80",
      author: "Dust Studio",
    },
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
    photo: {
      url: "https://images.unsplash.com/photo-1538061210394-c72c824af0fb?auto=format&fit=crop&w=1600&q=80",
      author: "Jonathan Chng",
    },
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
