const populateFilters = (data) => {

    //make the filter options accessible globally
    const filters_screen = [
        {id: "all", label: "All", isActive: true },
        {id: "LED", label: "LED", isActive: false },
        {id: "LCD", label: "LCD", isActive: false },
        {id: "OLED", label: "OLED", isActive: false },
    ];

    //create a bin generator using d3.bin
    const binGenerator = d3.bin()
        .value(d => d.energyConsumption); // accessor

    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)

        .on("click", (e, d) => {

            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);

            if (!d.isActive) {

                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id ? true : false;
                });

                // update button styles
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id);

                // update histogram
                updateHistogram(d.id, data);
            }
        });

    //update the histogram
    const updateHistogram = (filterId, data) => {

        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);

        const updatedBins = binGenerator(updatedData);

        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
    };
};


// ---------------------------
// CREATE TOOLTIP
// ---------------------------

const createTooltip = () => {

    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // tooltip rectangle
    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    // tooltip text
    tooltip.append("text")
        .attr("class", "tooltipText")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .attr("font-weight", 800)
        .attr("font-size", "10px");;
};


// ---------------------------
// HANDLE MOUSE EVENTS
// ---------------------------

const handleMouseEvents = () => {

    innerChartS.selectAll("circle")

        .on("mouseenter", (e, d) => {

            console.log("Mouse entered circle", d);

            // update tooltip text
            d3.select(".tooltipText")
                .text(`Screen Size: ${d.screenSize}"`);

            // get circle position
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // move tooltip
            d3.select(".tooltip")
                .attr("transform",
                    `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })

        .on("mouseleave", (e, d) => {

            console.log("Mouse left circle", d);

            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0,500)`);
        });
};
