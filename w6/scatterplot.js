const drawScatterplot = (data) => {

    // create svg container
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // inner chart already defined in shared constants
    innerChartS = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // -------------------
    // Step 2.3: Scales
    // -------------------

    const maxScreen = d3.max(data, d => d.screenSize);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    xScale
        .domain([0, maxScreen])
        .range([0, innerWidth]);

    yScale
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    // -------------------
    // Step 2.4: Colour scale
    // -------------------

    colorScale
    .domain(["LED","LCD","OLED"])
    .range(["#36656B", "#75B06F", "#DAD887"]);


    // -------------------
    // Step 2.5: Draw circles
    // -------------------

    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.screenSize))
        .attr("cy", d => yScale(d.energyConsumption))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 1);

    // -------------------
    // Step 2.6: Axes
    // -------------------

    const bottomAxis = d3.axisBottom(xScale);

    innerChartS
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    const leftAxis = d3.axisLeft(yScale);

    innerChartS
        .append("g")
        .call(leftAxis);

    // axis labels
    svg.append("text")
        .text("Screen Size (inches)")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("text-anchor", "end")
        .attr("class", "axis-label");

    svg.append("text")
        .text("Energy Consumption (kWh/year)")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");

    // -------------------
    // Step 2.7: Legend
    // -------------------

    const legend = svg.append("g")
        .attr("transform", `translate(${width - 120}, 40)`);

    const screenTypes = ["LED", "LCD", "OLED"];

    legend.selectAll("rect")
        .data(screenTypes)
        .join("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * 20)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", d => colorScale(d));

    legend.selectAll("text")
        .data(screenTypes)
        .join("text")
        .attr("x", 18)
        .attr("y", (d, i) => i * 20 + 10)
        .text(d => d)
        .attr("font-size", "12px");
};
