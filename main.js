const COUNTRY = "USA";

const INDICATORS = {
  gdp: "NY.GDP.MKTP.CD",
  inflation: "FP.CPI.TOTL.ZG",
  unemployment: "SL.UEM.TOTL.ZS"
};

const darkConfig = {
  background: "#17263a",
  axis: {
    labelColor: "#e8eef7",
    titleColor: "#e8eef7",
    gridColor: "#2a3f5e",
    tickColor: "#2a3f5e"
  },
  legend: {
    labelColor: "#e8eef7",
    titleColor: "#e8eef7"
  },
  title: { color: "#e8eef7" }
};

async function fetchWBSeries(country, indicator) {
  const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&per_page=300`;
  const res = await fetch(url);
  const json = await res.json();
  const records = json[1] || [];
  return records
    .map(r => ({ year: Number(r.date), value: r.value }))
    .filter(d => !isNaN(d.year))
    .sort((a, b) => a.year - b.year);
}

function sliceByRange(series, range) {
  if (range === "all") return series.filter(d => d.value != null);
  const n = Number(range);
  const clean = series.filter(d => d.value != null);
  return clean.slice(-n);
}

function toBillions(x) { return x / 1e9; }

function render(selector, spec) {
  return vegaEmbed(selector, spec, { actions: false });
}

async function loadAndRender(range = "all") {
  const [gdpRaw, inflRaw, unempRaw] = await Promise.all([
    fetchWBSeries(COUNTRY, INDICATORS.gdp),
    fetchWBSeries(COUNTRY, INDICATORS.inflation),
    fetchWBSeries(COUNTRY, INDICATORS.unemployment)
  ]);

  const gdp = sliceByRange(gdpRaw, range).map(d => ({
    year: d.year,
    value: d.value == null ? null : toBillions(d.value)
  }));

  const infl = sliceByRange(inflRaw, range);
  const unemp = sliceByRange(unempRaw, range);

  const gdpSorted = [...gdp].sort((a, b) => a.value - b.value);

  const spec1 = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: "container",
    height: 360,
    data: { values: gdpSorted },
    mark: { type: "bar", cornerRadiusTopLeft: 4, cornerRadiusTopRight: 4 },
    encoding: {
      x: { field: "year", type: "ordinal", sort: null, title: "Év (rendezve)" },
      y: { field: "value", type: "quantitative", title: "GDP (milliárd USD)" },
      color: { field: "year", type: "nominal", legend: { orient: "right" } },
      tooltip: [
        { field: "year", title: "Év" },
        { field: "value", title: "GDP (mrd USD)", format: ".2f" }
      ]
    },
    config: darkConfig
  };

  const spec2 = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: "container",
    height: 360,
    data: { values: infl },
    mark: { type: "line", point: { filled: true } },
    encoding: {
      x: { field: "year", type: "ordinal", title: "Év" },
      y: { field: "value", type: "quantitative", title: "Infláció (%)" },
      color: { value: "#8bd9ff" },
      tooltip: [
        { field: "year", title: "Év" },
        { field: "value", title: "Infláció (%)", format: ".2f" }
      ]
    },
    config: darkConfig
  };

  const spec3 = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: "container",
    height: 360,
    data: { values: unemp },
    mark: { type: "area", interpolate: "monotone" },
    encoding: {
      x: { field: "year", type: "ordinal", title: "Év" },
      y: { field: "value", type: "quantitative", title: "Munkanélküliség (%)" },
      color: { value: "#7aa0ff" },
      tooltip: [
        { field: "year", title: "Év" },
        { field: "value", title: "Munkanélküliség (%)", format: ".2f" }
      ]
    },
    config: darkConfig
  };

  await render("#chart1", spec1);
  await render("#chart2", spec2);
  await render("#chart3", spec3);
}

document.addEventListener("DOMContentLoaded", () => {
  const rangeSelect = document.getElementById("rangeSelect");
  loadAndRender(rangeSelect.value);
  rangeSelect.addEventListener("change", () => {
    loadAndRender(rangeSelect.value);
  });
});
