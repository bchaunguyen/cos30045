d3.csv("data/line.csv", d => {
  return {
    year: +d.Year,
    price: +d["Average Price (notTas-Snowy)"]
  };
}).then(data => {

  const width = 800;
  const height = 400;

  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([80, width - 40]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.price)])
    .nice()
    .range([height - 50, 40]);

  // line generator
  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.price));

  // draw line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#FE7F2D")
    .attr("stroke-width", 3)
    .attr("d", line);

  // X axis
  svg.append("g")
    .attr("transform", `translate(0,${height-50})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

  // Y axis
  svg.append("g")
    .attr("transform", `translate(80,0)`)
    .call(d3.axisLeft(yScale));

  // X label
  svg.append("text")
    .attr("x", width/2)
    .attr("y", height-10)
    .attr("text-anchor","middle")
    .text("Year");

  // Y label
  svg.append("text")
    .attr("transform","rotate(-90)")
    .attr("x",-height/2)
    .attr("y",20)
    .attr("text-anchor","middle")
    .text("Price ($ per MWh)");

});
