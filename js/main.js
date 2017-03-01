function changeDotRadius(element){
    dot_radius = element.value;
    drawChart();
}

function changeNoOfCirclesInARow(element){
    no_of_circles_in_a_row = element.value;
    drawChart();
}

function changeDotPaddingLeft(element){
    dot_padding_left = element.value;
    drawChart();
}
function changeDotPaddingRight(element){
    dot_padding_right = element.value;
    drawChart();
}
function changeDotPaddingTop(element){
    dot_padding_top = element.value;
    drawChart();
}
function changeDotPaddingBottom(element){
    dot_padding_bottom = element.value;
    drawChart();
}


function drawChart(){
    var chartElement = document.getElementById("DotMatrixChart");
    chartElement.innerHTML="";

    var dataset =
    [
        { group: "Group 1" ,category: "Category 1", count: 48},
        { group: "Group 1" ,category: "Category 2", count: 27},
        { group: "Group 1" ,category: "Category 3", count: 12},
        { group: "Group 1" ,category: "Category 4", count: 16},
        { group: "Group 2" ,category: "Category 1", count: 35},
        { group: "Group 2" ,category: "Category 2", count: 12},
        { group: "Group 2" ,category: "Category 3", count: 16},
        { group: "Group 2" ,category: "Category 4", count: 42},
        { group: "Group 3" ,category: "Category 1", count: 39},
        { group: "Group 3" ,category: "Category 2", count: 25},
        { group: "Group 3" ,category: "Category 3", count: 26},
        { group: "Group 3" ,category: "Category 4", count: 46},
    ];

    var chart_options = {
        dot_radius: parseInt(dot_radius),
        no_of_circles_in_a_row:parseInt(no_of_circles_in_a_row),
        dot_padding_left:parseInt(dot_padding_left),
        dot_padding_right:parseInt(dot_padding_right),
        dot_padding_top:parseInt(dot_padding_top),
        dot_padding_bottom:parseInt(dot_padding_bottom)
    };

    DotMatrixChart(dataset,chart_options);
}

var dot_radius = document.getElementById("dot_radius").value;
var no_of_circles_in_a_row = document.getElementById("no_of_circles_in_a_row").value;
var dot_padding_left = document.getElementById("dot_padding_left").value;
var dot_padding_right = document.getElementById("dot_padding_right").value;
var dot_padding_top = document.getElementById("dot_padding_top").value;
var dot_padding_bottom = document.getElementById("dot_padding_bottom").value;

drawChart();