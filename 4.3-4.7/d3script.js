d3.csv("data/4.4.csv", d => {
  return {
    Brand_Reg: d.Brand_Reg,
    Count: +d.Count
  };
}).then(data => {

  createBarChart(data);

});

const createBarChart = (data) => {

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Count)])
    .range([0, 400]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Brand_Reg))
    .range([0, 1600])
    .padding(0.1);

  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 550 1600")
    .attr("width", 400)
    .style("background-color", "#EEEEEE");

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.Brand_Reg)})`);

  barAndLabel
    .append("rect")
    .attr("width", d => xScale(d.Count))
    .attr("height", yScale.bandwidth())
    .attr("x", 100)
    .attr("y", 0)
    .attr("fill", "#6594B1");

  barAndLabel
    .append("text")
    .text(d => d.Brand_Reg)
    .attr("x", 95)
    .attr("y", 15)
    .attr("text-anchor", "end")
    .style("font-family", "sans-serif")
    .style("font-size", "13px")
    .style("fill", "#213C51");

  barAndLabel
    .append("text")
    .text(d => d.Count)
    .attr("x", d => 100 + xScale(d.Count) + 4)
    .attr("y", 12)
    .style("font-family", "sans-serif")
    .style("font-size", "13px")
    .style("fill", "#213C51");

};
