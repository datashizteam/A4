var width = 1200,
    height = 600

var svg = d3.select(".scroll__figure").append("svg")
    .style("width", "100%")
    .style("height", "100%");

var g = svg.append("g");

var projection = d3.geoAlbersUsa();
var albersPath = d3.geoPath()
    .projection(projection);

d3.json("https://gist.githubusercontent.com/krwarner/ba149b4ed187b80cce4b9aad2135ddae/raw/8d564df8079729c819781819a084c9a1587dc434/congress_topo.json").then(
//background map
function bgMap(congressTopo) {
  const hasNoCongressionalRep = ['Puerto Rico', 'District of Columbia', 'U.S. Virgin Islands', 'Guam', 'Northern Mariana Islands', 'American Samoa'];
  const geojson = topojson.feature(congressTopo, congressTopo.objects.congress);
  const filtered = geojson.features.filter(f => !hasNoCongressionalRep.includes(f.properties.STATE));
  geojson.features = filtered;

  const congress = geojson;

  g.selectAll(".region")
        .data(congress.features)
        .enter()
        .append("path")
        .attr("class", "region")
        .attr("d", albersPath)
        .style("stroke", "#595959")
        .style("stroke-width", "0.15px")
});