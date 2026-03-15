//set up dimensions and margins
const margin = { top:40, right: 30, bottom:50, left:70 };
const width = 800; //total width of the chart
const height = 400; //total height of the chart
const innerWWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

let innerChartS;

const tooltipWidth = 100;
const tooltipHeight = 32;

//create a bin generator using d3.bin
const binGenerator = d3.bin()
    .value(d => d.energyConsumption) //access for energyConsumption

//make the color accessible globally
const barColor = "#6A9C89";
const bodyBackgroundColor = "#E9EFEC";
//set up the scale
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();
//make the filter options accesible globally
const filters_screen = [
    {id: "all", label: "All", isActive: true },
    {id: "LED", label: "LED", isActive: false },
    {id: "LCD", label: "LCD", isActive: false },
    {id: "OLED", label: "OLED", isActive: false },
];