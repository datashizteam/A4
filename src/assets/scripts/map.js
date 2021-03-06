var width = 1000,
    height = 600

var svg = d3.select(".scroll__figure").append("svg")
    .style("width", "100%")
    .style("height", "100%");

var time = ["1","2","3"];

// var g = svg.append("g");

var projection = d3.geoAlbersUsa()
    .scale(window.innerWidth - 448)
    .translate([408, 255]);

// OBSERVABLE CODE
var us = d3.json("https://unpkg.com/us-atlas@1/us/10m.json");
const data = d3.csv("https://raw.githubusercontent.com/ceguiluzrosas/D3_Json/master/new_coordinates.csv", d => ({
  type: "Feature", 
  properties: {city: d.City, state: d.State, lat: +d.Lat, long: +d.Long, five: +d.five, six: +d.six, present:+d.present},
  geometry: {
    type: "Point",
    coordinates: [+d.Long, +d.Lat]
  }
}));

Promise.all([us, data]).then(ready);

function ready(d) {

  let us = d['0'];
  let data = d['1'];

  var us_states = topojson.feature(us, us.objects.states);

  function colorRange(p) {
    if (p==0) { return "#ff3e28"; }
    else if (p==1) { return "#ff3e28"; }
    else if (p==2) { return "#ff3e28"; }
    else if (p==3) { return "#ff3e28"; }
    else if (p==8) { return "#8c0000"; }
    else if (p==9) { return "#700000"; }};


  svg.append("path")
        .datum(topojson.merge(us, us.objects.states.geometries.filter(d => d.id !== "02" && d.id !== "15")))
        .attr("fill", "rgba(0,0,0,0)")
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.75)
        .attr("d", d3.geoPath())
        .attr("transform", function(d) {
          return "scale(" + 0.85 + ")"
        });

    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "rgba(0,0,0,0)")
        .attr("stroke", "#fff")
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath())
        .attr("transform", function(d) {
          return "scale(" + 0.85 + ")"
        });


      for (let d of data){
          var val = d.properties.five;
          if (val != 0) {
            var node = svg.append("path")
              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", d3.geoPath(projection).pointRadius(4))
              .attr("fill", colorRange(val))
              // .style('stroke', 'black').style('stroke-width', 0.5)
              .attr("opacity", 0.4)
              .attr("class", "map-path")
            }
      }

      svg.append("text")
        .style("fill", "#fff")
        .attr("x", width - 1000)
        .attr("y", height - 50)
        .text("Court Ordered School Desegregations by Decade");

  d3.select("#timeslide").on("input", function() {
      update(+this.value);
    });
 // }
  
  function update(value) {
    document.getElementById("range").innerHTML=time[value];
    time_period = time[value];

    d3.selectAll("path.map-path").remove();
       
    if (time_period==1) {

      for (let d of data){
          var val = d.properties.five;

          if (val != 0) {
            var node = svg.append("path")
              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", d3.geoPath(projection).pointRadius(4))
              .attr("fill", "#ff5542")
              .attr("opacity", 0.4)
              .attr("class", "map-path")
              .style('stroke', 'black').style('stroke-width', 0.5);
              
          }
    }}
    else if (time_period==2) {
      for (let d of data){
          var val = d.properties.six;

          if (val != 0) {
            var node = svg.append("path")
              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", d3.geoPath(projection).pointRadius(4))
              .attr("fill", "#ff5542")
              .attr("opacity", 0.4)
              .attr("class", "map-path")
              .style('stroke', 'black').style('stroke-width', 0.5);
              
          }
    }}
    else if (time_period==3) {
      for (let d of data){
          var val = d.properties.present;

          if (val != 0) {
            var node = svg.append("path")
              .datum({type:"Feature", geometry:{type: "Point", coordinates:[d.properties.long,d.properties.lat]}})
              .attr("d", d3.geoPath(projection).pointRadius(4))
              .attr("fill", "#ff5542")
              .attr("opacity", 0.4)
              .attr("class", "map-path")
              .style('stroke', 'black').style('stroke-width', 0.5);
              
          }
    }}
  }
   

}

  //return svg.node();



