function DotMatrixChart(dataset,options){

    var dotRadius = options.dot_radius;
    var noOfCirclesInARow = options.no_of_circles_in_a_row;
    var dotPaddingLeft = options.dot_padding_left;
    var dotPaddingRight = options.dot_padding_right;
    var dotPaddingTop = options.dot_padding_top;
    var dotPaddingBottom = options.dot_padding_bottom;

    if(isNaN(dotRadius)){
        throw new Error("dot_radius must be a Number");
    }
    if(isNaN(noOfCirclesInARow)){
        throw new Error("no_of_circles_in_a_row must be a Number");
    }
    if(isNaN(dotPaddingLeft)){
        throw new Error("dot_padding_left must be a Number");
    }
    if(isNaN(dotPaddingRight)){
        throw new Error("dot_padding_right must be a Number");
    }
    if(isNaN(dotPaddingTop)){
        throw new Error("dot_padding_top must be a Number");
    }
    if(isNaN(dotPaddingBottom)){
        throw new Error("dot_padding_bottom must be a Number");
    }


    var flags = [], uniqueCategories = [], uniqueGroups=[], l = dataset.length, i;
    for( i=0; i<l; i++) {
        if( flags[dataset[i].category]) continue;
        flags[dataset[i].category] = true;
        uniqueCategories.push(dataset[i].category);
    }
    flags = [];
    for( i=0; i<l; i++) {
        if( flags[dataset[i].group]) continue;
        flags[dataset[i].group] = true;
        uniqueGroups.push(dataset[i].group);
    }

    var sumOfEveryGroup = {};
    for(var i=0;i<dataset.length;i++){
        if(sumOfEveryGroup[dataset[i]['group']] == null){
            sumOfEveryGroup[dataset[i]['group']] = 0;
        }
        sumOfEveryGroup[dataset[i]['group']] += dataset[i]['count'];
    }

    var maxNoOfLinesInGroup = 0;
    for(var group in sumOfEveryGroup){
        if(sumOfEveryGroup[group]/noOfCirclesInARow > maxNoOfLinesInGroup){
            maxNoOfLinesInGroup = Math.ceil(sumOfEveryGroup[group]/noOfCirclesInARow);
        }
    }

    var numberOfLines = maxNoOfLinesInGroup * uniqueGroups.length;

    var groupScale = d3.scale.ordinal().domain(uniqueGroups).rangePoints([0, uniqueGroups.length-1]);
    var categoryScale = d3.scale.ordinal().domain(uniqueCategories).rangePoints([0, uniqueCategories.length]);

    var color = d3.scale.category20();

    // Set the dimensions of the canvas / graph
    var	margin = {top: dotRadius*10, right: dotRadius*15, bottom: dotRadius*10, left: dotRadius*15};

    height = numberOfLines * (dotRadius*2 + dotPaddingBottom + dotPaddingTop);
    width = (dotRadius*2 + dotPaddingLeft + dotPaddingRight) * noOfCirclesInARow;

    // Set the ranges
    var	xScale = d3.scale.linear().range([margin.left, width]);
    var	yScale = d3.scale.linear().range([height, margin.bottom]);

    var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom");

    var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .tickFormat(function (d) {
                    return uniqueGroups[d];
                })
                .ticks(uniqueGroups.length)
                .tickSize(-width+margin.left-(dotRadius*2), 0, 0)


    xScale.domain([0,noOfCirclesInARow]);
    yScale.domain([0,d3.max(dataset,function(d){return groupScale(d.group)+1;})]);

    //Create SVG element
    var svg = d3.select("#DotMatrixChart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Create Y axis
    svg.append("g")
        .attr("transform", "translate(" + (margin.left - (dotRadius*2)) + ",0)")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")
        .attr("y", -dotRadius*5)
        .attr("x", 0)
        .attr("dy", ".35em")
        .style("font-size", dotRadius*3 + "px")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "start");

    //Create Y axis
        svg
        .append("line")
        .attr("x1",width)
        .attr("y1",margin.top)
        .attr("x2",width)
        .attr("y2",height)
        .style("stroke","black")
        .style("stroke-width",1)

    var globalLineNoForGroup = {};
    var globalLineSizeForGroup = {};
    var globalDotXPosition = {};
    function generate_array(d){

        if(globalLineSizeForGroup[d.group] == null){
            globalLineSizeForGroup[d.group] = 0;
        }
        if(globalLineNoForGroup[d.group] == null){
            globalLineNoForGroup[d.group] = 0.5/(maxNoOfLinesInGroup);
        }
        if(globalDotXPosition[d.group] == null){
            globalDotXPosition[d.group] = 0;
        }

        var arr = new Array(d.count);
        for(var i=0;i<d.count;i++){

            if(globalLineSizeForGroup[d.group]!=0 && globalLineSizeForGroup[d.group] % noOfCirclesInARow == 0){
                globalLineNoForGroup[d.group] += 1/(maxNoOfLinesInGroup);
                globalDotXPosition[d.group]=1;
            }else{
                globalDotXPosition[d.group]+=1;
            }

            arr[i] = {y:groupScale(d.group)+globalLineNoForGroup[d.group],x: globalDotXPosition[d.group]-1, group:d.group,category:d.category};
            globalLineSizeForGroup[d.group] += 1;
        }
        return arr;
    }

    var groups = svg
       .selectAll("g.group")
       .data( dataset )
        .enter()
        .append('g')
        .attr("class", "group");

    var circleArray = groups.selectAll("g.circleArray")
    .data(function(d) {return generate_array(d);});

    circleArray.enter()
    .append('g')
    .attr("class", "circleArray")
    .append("circle")
    .style("fill",function(d){return color(d.category);})
    .attr("r", dotRadius)
    .attr("cx", function(d,i) {return xScale(d.x); })
    .attr("cy", function(d,i) { return yScale(d.y); });

    // add legend
    var legend = svg
    .selectAll(".legend")
    .data(uniqueCategories)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + 0  + "," + (margin.top+dotRadius) + ")");

    legend
      .append("circle")
      .attr("cx", width + dotRadius*4)
      .attr("cy", function(d,i){return i*dotRadius*4;})
      .attr("r", dotRadius)
      .style("fill", function(d) {
        return color(d);
      })

    legend
      .append("text")
      .attr("x", width + dotRadius*4 + dotRadius*3)
      .attr("text-anchor",'start')
      .attr("y", function(d,i){return i*dotRadius*4 + dotRadius;})
      .style("font-size", dotRadius*3 + "px")
      .text(function(d){return d});


    var tooltip = d3.select("body")
    .append('div')
    .attr('class', 'tooltip');

    tooltip.append('div')
    .attr('class', 'group');
    tooltip.append('div')
    .attr('class', 'category');

    svg.selectAll(".circleArray > circle")
    .on('mouseover', function(d,i) {

        tooltip.select('.group').html("<b>Group: " + d.group+ "</b>");
        tooltip.select('.category').html("<b>Category: " + d.category+ "</b>");

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);

    })
    .on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
    })
    .on('mouseout', function() {
        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
    });
}