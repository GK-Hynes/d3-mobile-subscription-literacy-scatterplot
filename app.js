var width = 600;
var height = 600;
var padding = 50;

var data = regionData.filter(mustHaveKeys);

// prettier-ignore
var xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.adultLiteracyRate))
                .range([padding, width - padding]);

// prettier-ignore
var yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.subscribersPer100))
                .range([height - padding, padding]);

// prettier-ignore
var rScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.medianAge))
                .range([5, 30]);

// prettier-ignore
var fScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.urbanPopulationRate))
                .range(["green", "blue"]);

// prettier-ignore
var xAxis = d3.axisBottom(xScale)
              .tickSize(- height + 2 * padding)
              .tickSizeOuter(0);

// prettier-ignore
var yAxis = d3.axisLeft(xScale)
              .tickSize(- width + 2 * padding)
              .tickSizeOuter(0);

// prettier-ignore
var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

// prettier-ignore
svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", d => xScale(d.adultLiteracyRate))
      .attr("cy", d => yScale(d.subscribersPer100))
      .attr("r", d => rScale(d.medianAge))
      .attr("fill", d => fScale(d.urbanPopulationRate))
      .attr("stroke", "#fff");

// prettier-ignore
svg.append("g")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

// prettier-ignore
svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// prettier-ignore
svg.append("text")
    .attr("x", width / 2)
    .attr("y", (height - padding))
    .attr("dy", padding / 2)
    .attr("text-anchor", "middle")
    .text("Literacy Rate, Aged 15 and Up");

// prettier-ignore
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", - height / 2)
    .attr("dy", padding / 2)
    .attr("text-anchor", "middle")
    .text("Mobile Phone Subscribers Per 100 People");

// prettier-ignore
svg.append("text")
    .attr("x", width / 2)
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .attr("font-size", "2em")
    .text("Mobile Phone Subscribers vs. Literacy rate");

function mustHaveKeys(obj) {
  var keys = [
    "subscribersPer100",
    "adultLiteracyRate",
    "medianAge",
    "urbanPopulationRate"
  ];
  for (var i = 0; i < keys.length; i++) {
    if (obj[keys[i]] === null) return false;
  }
  return true;
}
