const drawHistogram = (data) => {
//set the dimensions and margins of the chart area
const svg = d3.select("#histogram")
.append("svg")
.attr("viewBox", `0 0 ${width} ${height}`) //Responsive SVG
//Create an inner chart group with margins
const innerChart = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);
//create a bin generator using d3.bin
const binGenerator = d3.bin()
        .value(d => d.energyConsumption) //accessor for energyConsumption
        .thresholds(10)

//generate the bins
const bins = binGenerator(data); //save the bins into the array
console.log(bins); //log the bins to the console for debugging
const minEng = bins[0].x0; //lower bound of the first bin
const maxEng = bins[bins.length -1].x1; //upper bound of the last bin
const binsMaxLength = d3.max(bins, d=> d.length); //get the maximum length of the bins
//define scale (from shared constants))
xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);
yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice(); //round the y-axis values
//draw the bars of the histogram
innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
        .attr("x", d=> xScale(d.x0))
        .attr("y", d=> yScale(d.length))
        .attr("width", d=> xScale(d.x1) - xScale(d.x0))
        .attr("height", d=> innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor) ///set the stroke color gives appearance of gap
        .attr("stroke-width", 2);
//add axes
const bottomAxis = d3.axisBottom(xScale);
//add the x-axis to the bottom of the chart relative to the inner chart
innerChart  
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);
//add the x-axis label
svg
    .append("text")
    .text("Labelled Ennergy Consumption (kWh/year)")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height - 5)
    .attr("class", "axis-label"); //set the color of the label in visualisation.css
const leftAxis = d3.axisLeft(yScale);
//add the y-axis to the bottom of the chart relative to the inner chart
innerChart  
    .append("g")
    .call(leftAxis)
svg
    .append("text")
    .text("Frequency")
    .attr("x", 30)
    .attr("y", 20)
    .attr("class", "axis-label");

}