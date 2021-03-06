var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .style("background-color","lightgray");

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(povData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(povData, d => (d[chosenXAxis]) * 0.8),
      d3.max(povData, d => d[chosenXAxis]) * 1.2])
    .range([0, width]);

  return xLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}


// function used for updating texts group with a transition to
// new texts
function renderTexts(textsGroup, newXScale, chosenXAxis) {

    textsGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]));
  
    return textsGroup;
}
  

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "poverty") {
    var label = "Poverty:";
  }
  else {
    var label = "Age:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`State: ${d.state}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Import Data
d3.csv("assets/data/data.csv").then(function(povData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    povData.forEach(function(data) {
      data.poverty = parseFloat(data.poverty);
      data.age = parseFloat(data.age);
      data.healthcare = parseFloat(data.healthcare);
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = xScale(povData, chosenXAxis);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(povData, d => d.healthcare)+5])
      .range([height, 0]);

    // Create axis functions

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
      .call(leftAxis);

    //Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(povData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "12")
    .style("stroke-width", 1.5)
    .style("fill", "blue")
    .style("opacity", ".5")
    .style("stroke", "black");
    
    // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");

    var ageLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (Median)");

    // Create y axis labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height/1.5))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

    //circle labels
    let textsGroup = chartGroup.selectAll("null")
    .data(povData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    //.attr("color", "white")
    //.attr("font-size", 15)
    .attr('x', d => xLinearScale(d[chosenXAxis])-10)
    .attr('y', d => yLinearScale(d.healthcare)+5);


    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);


// x axis labels event listener
labelsGroup.selectAll("text")
.on("click", function() {
  // get value of selection
  var value = d3.select(this).attr("value");
  if (value !== chosenXAxis) {

    // replaces chosenXAxis with value
    chosenXAxis = value;

    // functions here found above csv import
    // updates x scale for new data
    xLinearScale = xScale(povData, chosenXAxis);

    // updates x axis with transition
    xAxis = renderAxes(xLinearScale, xAxis);

    // updates circles with new x values
    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

    // updates the texts locations
   textsGroup = renderTexts(textsGroup, xLinearScale, chosenXAxis);
    
    // updates tooltips with new info
    circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // changes classes to change bold text
    if (chosenXAxis === "age") {
        ageLabel
            .classed("active", true)
            .classed("inactive", false);
        povertyLabel
            .classed("active", false)
            .classed("inactive", true);
    }
    else {
        ageLabel
            .classed("active", false)
            .classed("inactive", true);
        povertyLabel
            .classed("active", true)
            .classed("inactive", false);
    }
  }
});

  }).catch(function(error) {
    console.log(error);
});
