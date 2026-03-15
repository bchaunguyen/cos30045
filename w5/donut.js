d3.csv("data/donut.csv", d => {
  return {
    tech: d.Screen_Tech,
    energy: +d["Mean(Labelled energy consumption (kWh/year))"]
  }
}).then(data => {

const width = 400
const height = 400
const radius = 140

const svg = d3.select("#donut-chart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .append("g")
  .attr("transform", `translate(${width/2}, ${height/2})`)

const color = d3.scaleOrdinal()
  .domain(data.map(d => d.tech))
  .range(["#B7E5CD","#85C79A","#305669"])

const pie = d3.pie()
  .value(d => d.energy)

const arc = d3.arc()
  .innerRadius(70)
  .outerRadius(radius)

// donut slices
svg.selectAll("path")
  .data(pie(data))
  .join("path")
  .attr("d", arc)
  .attr("fill", d => color(d.data.tech))
  //.attr("stroke", "white")
  .style("stroke-width", "2px")

// labels inside donut
svg.selectAll("text")
  .data(pie(data))
  .join("text")
  .attr("transform", d => `translate(${arc.centroid(d)})`)
  .attr("text-anchor", "middle")
  .style("font-size", "13px")
  .style("fill", "white")
  .text(d => `${d.data.tech}: ${Math.round(d.data.energy)}`)

})
