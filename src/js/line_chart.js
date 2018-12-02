var width = 1200,
    height = 600

var svg = d3.select(".scroll__figure2").append("svg")
    .style("width", "100%")
    .style("height", "100%");

var g = svg.append("g");

d3.csv("https://raw.githubusercontent.com/ceguiluzrosas/D3_Json/master/Year_Count_Line.csv", ({Data_Year,Year,Count}) => ({x: new Date(Data_Year), x1: +Year, y: +Count})));
                     data.x = "Year";
                     data.x1 = "Alternative_Year";
                     data.y = "Count";
                     return data;