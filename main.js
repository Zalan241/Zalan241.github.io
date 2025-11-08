const spec1 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: "container",
  height: 360,
  data: {
    values: [
      { kateg: "A", érték: 28 },
      { kateg: "B", érték: 55 },
      { kateg: "C", érték: 43 },
      { kateg: "D", érték: 91 },
      { kateg: "E", érték: 67 },
      { kateg: "F", érték: 52 },
      { kateg: "G", érték: 74 },
      { kateg: "H", érték: 39 }
    ]
  },
  params: [
    {
      name: "hover",
      select: { type: "point", on: "mouseover", clear: "mouseout" }
    }
  ],
  mark: {
    type: "bar",
    cornerRadiusTopLeft: 4,
    cornerRadiusTopRight: 4,
    cursor: "pointer"
  },
  encoding: {
    x: { field: "kateg", type: "nominal", title: "Kategória" },
    y: { field: "érték", type: "quantitative", title: "Érték" },
    opacity: {
      condition: { param: "hover", value: 1 },
      value: 0.85
    },
    tooltip: [
      { field: "kateg", title: "Kategória" },
      { field: "érték", title: "Érték" }
    ]
  }
};

const spec2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: "container",
  height: 360,
  data: {
    values: [
      { dátum: "2024-01-05", érték: 12 },
      { dátum: "2024-02-01", érték: 18 },
      { dátum: "2024-02-28", érték: 24 },
      { dátum: "2024-03-15", érték: 29 },
      { dátum: "2024-04-01", érték: 33 },
      { dátum: "2024-04-25", érték: 37 },
      { dátum: "2024-05-10", érték: 42 },
      { dátum: "2024-06-01", érték: 49 }
    ]
  },
  mark: {
    type: "line",
    point: { cursor: "pointer" }
  },
  encoding: {
    x: { field: "dátum", type: "temporal", title: "Dátum" },
    y: { field: "érték", type: "quantitative", title: "Érték" },
    tooltip: [
      { field: "dátum", type: "temporal", title: "Dátum" },
      { field: "érték", type: "quantitative", title: "Érték" }
    ]
  }
};

const spec3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: "container",
  height: 360,
  data: {
    values: [
      { x: 10, y: 20 },
      { x: 15, y: 30 },
      { x: 22, y: 25 },
      { x: 28, y: 35 },
      { x: 32, y: 40 },
      { x: 36, y: 45 },
      { x: 40, y: 38 },
      { x: 45, y: 50 },
      { x: 50, y: 47 },
      { x: 55, y: 53 }
    ]
  },
  mark: {
    type: "circle",
    size: 150,
    cursor: "pointer"
  },
  encoding: {
    x: { field: "x", type: "quantitative", title: "X érték" },
    y: { field: "y", type: "quantitative", title: "Y érték" },
    tooltip: [
      { field: "x", title: "X" },
      { field: "y", title: "Y" }
    ]
  }
};

vegaEmbed("#chart1", spec1);
vegaEmbed("#chart2", spec2);
vegaEmbed("#chart3", spec3);