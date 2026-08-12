// Global production of primary plastics, in million metric tons.
//
// Extracted from the Our World in Data grapher dataset
// "global-plastic-production-projections" (the same CSV the standalone
// Plastic Production Numbers project reads), filtered to the world total
// (Code OWID_WRL) and trimmed at 2030. Source tonnes are divided by 1e6.
//
// HISTORY    — observed/estimated production, 1950–2019 (Geyer et al. 2017)
// PROJECTION — OECD business-as-usual projection, 2019–2030 (OECD 2022)
//
// Inlined rather than fetched as a CSV at runtime because the site is
// published under a repo subpath on GitHub Pages, where an absolute
// /data/... fetch would miss.

export const HISTORY = [
	{ year: 1950, production: 2 },
	{ year: 1951, production: 2 },
	{ year: 1952, production: 2 },
	{ year: 1953, production: 3 },
	{ year: 1954, production: 3 },
	{ year: 1955, production: 4 },
	{ year: 1956, production: 5 },
	{ year: 1957, production: 5 },
	{ year: 1958, production: 6 },
	{ year: 1959, production: 7 },
	{ year: 1960, production: 8 },
	{ year: 1961, production: 9 },
	{ year: 1962, production: 11 },
	{ year: 1963, production: 13 },
	{ year: 1964, production: 15 },
	{ year: 1965, production: 17 },
	{ year: 1966, production: 20 },
	{ year: 1967, production: 23 },
	{ year: 1968, production: 27 },
	{ year: 1969, production: 32 },
	{ year: 1970, production: 35 },
	{ year: 1971, production: 38 },
	{ year: 1972, production: 44 },
	{ year: 1973, production: 51 },
	{ year: 1975, production: 46 },
	{ year: 1976, production: 54 },
	{ year: 1977, production: 59 },
	{ year: 1978, production: 64 },
	{ year: 1979, production: 71 },
	{ year: 1980, production: 70 },
	{ year: 1981, production: 72 },
	{ year: 1982, production: 73 },
	{ year: 1983, production: 80 },
	{ year: 1984, production: 86 },
	{ year: 1985, production: 90 },
	{ year: 1986, production: 96 },
	{ year: 1987, production: 104 },
	{ year: 1988, production: 110 },
	{ year: 1989, production: 114 },
	{ year: 1990, production: 120 },
	{ year: 1991, production: 124 },
	{ year: 1992, production: 132 },
	{ year: 1993, production: 137 },
	{ year: 1994, production: 151 },
	{ year: 1995, production: 156 },
	{ year: 1996, production: 168 },
	{ year: 1997, production: 180 },
	{ year: 1998, production: 188 },
	{ year: 1999, production: 202 },
	{ year: 2000, production: 213 },
	{ year: 2001, production: 218 },
	{ year: 2002, production: 231 },
	{ year: 2003, production: 241 },
	{ year: 2004, production: 256 },
	{ year: 2005, production: 263 },
	{ year: 2006, production: 280 },
	{ year: 2007, production: 295 },
	{ year: 2008, production: 281 },
	{ year: 2009, production: 288 },
	{ year: 2010, production: 313 },
	{ year: 2011, production: 325 },
	{ year: 2012, production: 338 },
	{ year: 2013, production: 352 },
	{ year: 2014, production: 367 },
	{ year: 2015, production: 381 },
	{ year: 2016, production: 400.05 },
	{ year: 2017, production: 420.053 },
	{ year: 2018, production: 441.055 },
	{ year: 2019, production: 459.746 }
];

export const PROJECTION = [
	{ year: 2019, production: 459.746 },
	{ year: 2020, production: 449.531 },
	{ year: 2021, production: 461.094 },
	{ year: 2022, production: 475.387 },
	{ year: 2023, production: 489.137 },
	{ year: 2024, production: 502.505 },
	{ year: 2025, production: 516.021 },
	{ year: 2026, production: 529.853 },
	{ year: 2027, production: 543.705 },
	{ year: 2028, production: 558.319 },
	{ year: 2029, production: 573.418 },
	{ year: 2030, production: 589.063 }
];
