var width = 1200,
    height = 600

var svg2 = d3.select(".scroll__figure2").append("svg")
    .style("width", "100%")
    .style("height", "100%")
    .style("z-index", "-1");

// var g2 = svg2.append("g");

async function doThings() {
  const data = await(d3.csv("https://raw.githubusercontent.com/ceguiluzrosas/D3_Json/master/Year_Count_Line.csv", ({Data_Year,Year,Count}) => ({x: new Date(Data_Year), x1: +Year, y: +Count})));
                     data.x = "Year";
                     data.x1 = "Alternative_Year";
                     data.y = "Count";
    var margin = ({top: 45, right: 45, bottom: 45, left: 45});
    
var x = d3.scaleTime()
	.domain(d3.extent(data, d => d.x))
	.range([margin.left, width - margin.right]);
  
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)]).nice()
    .range([height - margin.bottom, margin.top]);
  
  var x_linear = d3.scaleLinear()
    .domain([new Date("1994-01-02"), new Date("2014-01-02")])
    .range([margin.left, width - margin.right]);
  
  var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
  
  var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))
  
  // var line = d3.line()
  //   .defined(d => !isNaN(d.y))
  //   .x(d => x(d.x))
  //   .y(d => y(d.y))
  //   .curve(d3.curveCatmullRom.alpha(0.5));

  svg2.append("g")
      .call(xAxis);

  svg2.append("g")
      .call(yAxis);
  
  svg2.append("line")
    .attr("stroke", "#80a3b5")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", 10)
    .attr("x1", x_linear(new Date("2002-01-02")))
    .attr("x2", x_linear(new Date("2002-01-02")))
    .attr("y1", height/2+10)
    .attr("y2", height-margin.bottom);
  
  svg2.append("line")
    .attr("stroke", "#80a3b5")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", 10)
    .attr("x1", x_linear(new Date("2006-01-02")))
    .attr("x2", x_linear(new Date("2006-01-02")))
    .attr("y1", (2*height/5)+10)
    .attr("y2", height-margin.bottom);
  
  svg2.append("line")
    .attr("stroke", "#80a3b5")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", 10)
    .attr("x1", x_linear(new Date("2007-01-02")))
    .attr("x2", x_linear(new Date("2007-01-02")))
    .attr("y1", 0+margin.top)
    .attr("y2", height-margin.bottom);
  
  svg2.append("line")
    .attr("stroke", "#80a3b5")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", 10)
    .attr("x1", x_linear(new Date("2008-01-02")))
    .attr("x2", x_linear(new Date("2008-01-02")))
    .attr("y1", 2*margin.top+10)
    .attr("y2", height-margin.bottom);
  
    svg2.append("line")
    .attr("stroke", "#80a3b5")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", 10)
    .attr("x1", x_linear(new Date("2012-01-02")))
    .attr("x2", x_linear(new Date("2012-01-02")))
    .attr("y1", 0+margin.top)
    .attr("y2", height-margin.bottom);
  
  // svg2.append("path")
  //     .datum(data)
  //     .attr("fill", "none")
  //     .attr("stroke", "#636363")
  //     .attr("stroke-width", 2)
  //     .attr("stroke-linejoin", "round")
  //     .attr("stroke-linecap", "round")
  //     .attr("d", line);
  
  // svg2.selectAll("circle")
  //   .data(data).enter()
  //   .append("circle")
  //   .attr("cx", function(d) { return x(d.x); })
  //   .attr("cy", function(d) { return y(d.y); })
  //   .attr("r", 6)
  //   .style("fill", "rgba(0,0,0,0)")
  //   .style("stroke", "#f4f4f4")
  //   .style("stroke-width", "2.75px")
  //   .on("mouseover", function(d) {
  //     d3.selectAll("path").style("opacity", 0.5);
  //     d3.selectAll("circle").style("opacity", 0.5);
  //     d3.select(this)
  //     	.attr("r", 15)
  //       .style("opacity", 1)
  //       .style("stroke", "#fff")
  //       .style("opacity", 1)
  //       .raise();
  //     })
  //     .on("mouseout", function(d) {
  //       d3.selectAll("circle")
  //       	.attr("r", 6)
  //       	.style("stroke", "#f4f4f4")
  //       	.style("opacity", 1);
  //     });

  svg2.append("text")
    .style("fill", "#fff")
    .style("font-weight", "bold")
    .attr("x", width - 800)
    .attr("y", 600)
    .text("Number of Investigations by Department of Education");
  
  svg2.append("text")
    .attr("text-anchor", "end")
    .attr("font-size", "15px")
    .attr("font-weight", "bold")
    .attr("y", height - margin.bottom + 15)
    .attr("x", width)
    .style("fill", "#fff")
    .text("Year");

  svg2.append("text")
	  .attr("fill", "#e8e8e8")
    .attr("text-anchor", "middle")
    .style("font", "15px Oswald")
    .attr("x", x_linear(new Date("2002-01-02")))
    .attr("y", height/2)
    .text("No Child Left Behind Act");

  svg2.append("a")
    .attr("xlink:href", "#2002")
    .append("rect")  
    .attr("x", x_linear(new Date("2002-01-02"))-80)
    .attr("y", height/2 -20)
    .attr("height", 20)
    .attr("width", 160)
    .style("fill", "rgba(0,0,0,0)");
  
  svg2.append("text")
	  .attr("fill", "#e8e8e8")
    .attr("text-anchor", "right")
    .style("font", "15px Oswald")
    .attr("x", x_linear(new Date("2004-06-02")))
    .attr("y", (2*height/5))
    .text("Facebook + Twitter");

  svg2.append("a")
    .attr("xlink:href", "#2004")
    .append("rect")  
    .attr("x", x_linear(new Date("2004-06-02"))-50)
    .attr("y", height/2 - 80)
    .attr("height", 20)
    .attr("width", 160)
    .style("fill", "rgba(0,0,0,0)");
  
  svg2.append("text")
	  .attr("fill", "#e8e8e8")
    .attr("text-anchor", "middle")
    .style("font", "15px Oswald")
    .attr("x", x_linear(new Date("2007-01-02")))
    .attr("y", margin.top - 10)
    .text("Parents Involved Case");

  svg2.append("a")
    .attr("xlink:href", "#2007")
    .append("rect")  
    .attr("x", x_linear(new Date("2007-01-02"))-80)
    .attr("y", height/2 - 280)
    .attr("height", 20)
    .attr("width", 160)
    .style("fill", "rgba(0,0,0,0)");
  
  svg2.append("text")
	  .attr("fill", "#e8e8e8")
    .attr("text-anchor", "middle")
    .style("font", "15px Oswald")
    .attr("x", x_linear(new Date("2008-06-02")))
    .attr("y", 2*margin.top)
    .text("Economic Recession");

  svg2.append("a")
    .attr("xlink:href", "#2008")
    .append("rect")  
    .attr("x", x_linear(new Date("2008-06-02"))-80)
    .attr("y", height/2 - 220)
    .attr("height", 20)
    .attr("width", 160)
    .style("fill", "rgba(0,0,0,0)");
    
  svg2.append("text")
	  .attr("fill", "#e8e8e8")
    .attr("text-anchor", "middle")
    .style("font", "15px Oswald")
    .attr("x", x_linear(new Date("2012-01-02")))
    .attr("y", margin.top - 10)
    .text("Proficiency Report");

  svg2.append("a")
    .attr("xlink:href", "#2013")
    .append("rect")  
    .attr("x", x_linear(new Date("2012-01-02")) - 60)
    .attr("y", height/2 - 280)
    .attr("height", 20)
    .attr("width", 160)
    .style("fill", "rgba(0,0,0,0)");
  
}

doThings();
