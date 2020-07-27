// This file works with csv. 
function makeResponsive() {

    // resize chart according to window size
  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }

    // svg params
  var svgHeight = window.innerHeight;
  var svgWidth = window.innerWidth;

  var margin = {
    top: 40,
    right: 40,
    bottom: 80,
    left: 100
  };

  var chartwidth = svgWidth - margin.left - margin.right;
  var chartheight = svgHeight - margin.top - margin.bottom;

  // SVG wrapper 
  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// csv import & format data 
  console.log("A")


    d3.csv("static/js/nba_vp_2.csv").then(function(nbaData) {
    var parseTime = d3.timeParse("%Y");
    nbaData.forEach(function(data) {
      data.date = parseTime(data.date);
      data.White = +data.White;
      data.African = +data.African;
      data.Latino = +data.Latino;
    });

    console.log("B")
    // Create  scales
    var xTimeScale = d3.scaleTime()
      .domain(d3.extent(nbaData, d => d.date))
      .range([0, chartwidth]);

    var yLinearScale = d3.scaleLinear().range([chartheight, 0]);

    // Find max y-axis
    var morningMax = d3.max(nbaData, d => d.White);

    var eveningMax = d3.max(nbaData, d => d.African);

    var yMax;
    if (morningMax > eveningMax) {
      yMax = morningMax;
    }
    else {
      yMax = eveningMax;
    }

    // Use the yMax value to set the yLinearScale domain
    yLinearScale.domain([-1, yMax]);


    //  Create the axes 
    var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append the axes to the chartGroup

    // Add x-axis
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartheight})`)
      .call(bottomAxis);

    // Add y-axis
    chartGroup.append("g").call(leftAxis);

    // Set up generators and append SVG paths

    // Line generator for White
    var line1 = d3.line()
      .x(d => xTimeScale(d.date))
      .y(d => yLinearScale(d.White));

    // Line generator for African
    var line2 = d3.line()
      .x(d => xTimeScale(d.date))
      .y(d => yLinearScale(d.African));

    // Line generator for Latino
    var line3 = d3.line()
      .x(d => xTimeScale(d.date))
      .y(d => yLinearScale(d.Latino));

    // Line generator for Asian 
    var line4 = d3.line()
      .x(d => xTimeScale(d.date))
      .y(d => yLinearScale(d.Asian));

    // Line generator for Other 
    var line5 = d3.line()
      .x(d => xTimeScale(d.date))
      .y(d => yLinearScale(d.Other));

    // Append a path for line1
    chartGroup
      .data([nbaData])
      .append("path")
      .attr("d", line1)
      .classed("green", true)
      .style("opacity", .7)
      .on("mouseover", function() {
        d3.select(this)
          .style("stroke-width", "7");
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("stroke-width", "3");
      });

    // Append a path for line2
    chartGroup
      .data([nbaData])
      .append("path")
      .attr("d", line2)
      .classed("blue", true)
      .style("opacity", .7)
      .on("mouseover", function() {
        d3.select(this)
          .style("stroke-width", "7");
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("stroke-width", "3");
      });

    // Append a path for line3
    chartGroup
      .data([nbaData])
      .append("path")
      .attr("d", line3)
      .classed("purple", true)
      .style("opacity", .7)
      .on("mouseover", function() {
        d3.select(this)
          .style("stroke-width", "7");
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("stroke-width", "3");
      });

    // Append a path for line4
    chartGroup
      .data([nbaData])
      .append("path")
      .attr("d", line4)
      .classed("red", true)
      .style("opacity", .7)
      .on("mouseover", function() {
        d3.select(this)
          .style("stroke-width", "7");
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("stroke-width", "3");
      });

    // Append a path for line5
    chartGroup
      .data([nbaData])
      .append("path")
      .attr("d", line5)
      .classed("gray", true)
      .style("opacity", .7)
      .on("mouseover", function() {
        d3.select(this)
          .style("stroke-width", "7");
      })
      .on("mouseout", function() {
        d3.select(this)
          .style("stroke-width", "3");
      });
      var lis =  nbaData["columns"].slice(1)

    var circlesGroup = chartGroup.selectAll("circle")
      .data(nbaData)
      .enter()
      .append("circle")
      .attr("cx", d => xTimeScale(d.date))
      .attr("cy", d => yLinearScale(d.White))
      .attr("r", "5")
      .attr("fill", "darkgreen")
      .attr("stroke-width", "1")
      .attr("stroke","white")

    // Initialize Tooltip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([65, 0])
      .html(function(d,k) {
        return (`Number of VPs: ${d.White}`);
      });

      // Create the tooltip in chartGroup.
    chartGroup.call(toolTip);

    // Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
      toolTip.show(d, this);
    })
    // Create "mouseout" event listener to hide tooltip
    .on("mouseout", function(d) {
      toolTip.hide(d);
    });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", `translate(${chartwidth / 2}, ${yMax - 450})`)
      .attr("class", "title")
      .text("NBA VPs by Ethnicity")

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 35)
      .attr("x", 0 - (chartheight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of VPs");
      var j = 1;


    var color_list = ["darkblue","red","purple","gray","green","green"]

    chartGroup.append("text")
      .attr("transform", `translate(${chartwidth / 2}, ${chartheight + margin.top + 15})`)
      .attr("class", "axisText")
      .text("Year");

    console.log(nbaData["columns"].slice(1));

    var legends = svg.append("g")
          .attr("transform", `translate(${chartwidth + 45}, ${yMax - 300})`)
          .selectAll(".legends")
          .data(nbaData["columns"].slice(1));
    var legend = legends
          .enter()
          .append("g")
          .classed("legends",true)
          .attr("transform",function(d,i){return "translate(0," + (i + 1 )* 15 + ")";});
    legend.append("rect")
          .attr("width", 15)
          .attr("height",3)
          .attr("fill",function (d,j){return color_list[j];})
          .style("opacity", .7)

    legend.append("text")
          .text(function(d,j){return lis.slice(j,j+1)})
          .attr("fill","black")
          .attr("font-size","10")
          .attr("font-weight", "bold")
          .attr("x",30)
          .attr("y", 4);
          j = j + 1;
  }).catch(function(error) {
    console.log(error);
  });
  }

makeResponsive();

// Event listener for window resize
d3.select(window).on("resize", makeResponsive);
