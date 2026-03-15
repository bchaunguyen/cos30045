d3.csv("data/scatter.csv", d => {
  return{
    star2:+d.star2,
    energy_consumpt:+d.energy_consumpt
  }
}).then(data=>{

const width=600
const height=400

const svg=d3.select("#scatter-chart")
.append("svg")
.attr("viewBox",`0 0 ${width} ${height}`)

// scale X
const x=d3.scaleLinear()
.domain([1.8, d3.max(data,d=>d.star2)])

.range([80, width-40])


// scale Y
const y=d3.scaleLinear()
.domain([0,d3.max(data,d=>d.energy_consumpt)])
.range([height-40,20])

// scatter points
svg.selectAll("circle")
.data(data)
.join("circle")
.attr("cx",d=>x(d.star2))
.attr("cy",d=>y(d.energy_consumpt))
.attr("r",4)
.attr("fill","#215E61")
.attr("opacity",0.7)

// X axis
svg.append("g")
  .attr("transform", `translate(0,${height-40})`)
  .call(d3.axisBottom(x))

// Y axis
svg.append("g")
  .attr("transform", `translate(80,0)`)
  .call(d3.axisLeft(y))




// X axis label
svg.append("text")
  .attr("x", width/2)
  .attr("y", height-5)
  .attr("text-anchor","middle")
  .style("font-size","12px")
  .text("Star Rating")

// Y axis label
svg.append("text")
  .attr("transform","rotate(-90)")
  .attr("x",-height/2)
  .attr("y",15)
  .attr("text-anchor","middle")
  .style("font-size","12px")
  .text("Energy Consumption (kWh/year)")

})
