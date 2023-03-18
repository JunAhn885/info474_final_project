var dataPath = {
    "CLT": "./Weather_Data/CLT.csv",
    "CQT": "./Weather_Data/CQT.csv",
    "IND": "./Weather_Data/IND.csv",
    "JAX": "./Weather_Data/JAX.csv",
    "KHOU": "./Weather_Data/KHOU.csv",
    "KNYC": "./Weather_Data/KNYC.csv",
    "KSEA": "./Weather_Data/KSEA.csv",
    "MDW": "./Weather_Data/MDW.csv",
    "PHL": "./Weather_Data/PHL.csv",
    "PHX": "./Weather_Data/PHX.csv",
}

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#viz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
    updateChart(category);
}


d3.csv(dataPath.CLT).then(function(data){
    newData = data.map(function(d){
        return { ...d, date: d3.timeParse("%Y-%m-%d")(d.date) }
    })
    updateChart("actual_min_temp")
});

function updateChart(key){
    // Add X axis --> it is a date format
    const x = d3.scaleTime()
            .domain(d3.extent(newData, function(d) { return d.date; }))
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(newData, function(d) { return +d[key]; })])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
            .datum(newData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d[key]) })
            )
    // add title to the graph

}


