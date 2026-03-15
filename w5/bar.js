d3.csv("data/bar.csv").then(data => {

  data.forEach(d => {
    d.energy = +d["Mean(Labelled energy consumption (kWh/year))"];
  });

  const width = 600;
  const height = 400;

  const margin = {top:20, right:20, bottom:50, left:80};

  const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("width","100%")
    .style("height","auto");

  // X scale
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  // Y scale
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Bars
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", d => xScale(d.Screen_Tech))
    .attr("y", d => yScale(d.energy))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScale(d.energy))
    .attr("fill", "#69b3a2");

  // X Axis
  svg.append("g")
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom(xScale));

  // Y Axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));

     // X axis label
svg.append("text")
  .attr("x", width/2)
  .attr("y", height-5)
  .attr("text-anchor","middle")
  .style("font-size","12px")
  .text("Screen Technology")

// Y axis label
svg.append("text")
  .attr("transform","rotate(-90)")
  .attr("x",-height/2)
  .attr("y",15)
  .attr("text-anchor","middle")
  .style("font-size","12px")
  .text("Energy Consumption (kWh/year)")
});
