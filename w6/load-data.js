// js/load-data.js

// Load CSV data
d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star

})).then(function(data) {

    console.log(data); // check data in console

    // Draw the visualisation
    drawHistogram(data);
    drawScatterplot(data);
    // Create filter buttons
    populateFilters(data);
    createTooltip();
    handleMouseEvents();
}).catch(function(error) {
    console.log("Error loading the data:", error);
});
