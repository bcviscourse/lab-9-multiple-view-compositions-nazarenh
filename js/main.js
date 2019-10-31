import AreaChart from './AreaChart.js';
import BarChart from './BarChart.js';
// chart vars
let areaChart = AreaChart()
.curve(d3.curveStep)
.on('zoomed', zoomed);
let barChart = BarChart();

let countVis = d3.select('#countvis');
let ageVis = d3.select('#agevis');
let priorityVis = d3.select('#priorityvis');

// Function to convert date objects to strings or reverse
let dateFormatter = d3.timeFormat("%Y-%m-%d");
let dateParser = d3.timeParse("%Y-%m-%d");

// (1) Load data asynchronously
let viewData = null;
let dateRange = null;

Promise.all([ // load multiple files
    d3.json('data/perDayData.json'),
    d3.json('data/myWorldFields.json')
]).then(data=>{
    let perDayData = data[0];
    let metaData = data[1];
    // console.log(perDayData, metaData);
    
    // draw all count chart
    viewData = transform(perDayData, metaData);
    dateRange = d3.extent(viewData,d=>d.time);
    // console.log('viewData', viewData, dateRange);
    
    countVis.datum(viewData)
    .call(areaChart);
    
    zoomed(dateRange);
    
});
function drawAgeChart(){
    // retrieve age data based on filter date range
    let ageData = getAgeData(viewData, dateRange);
    // adjust bar chart parameters for age chart
    barChart.width(400)
        .x(d=>d.age)
        .y(d=>d.votes)
        .layout('horizontal')
        .margin({top: 0, right: 0, bottom: 50, left: 60})
    
    
    barChart.xAxis().tickValues([10,20,30,40,50,60,70,80,90]);
    barChart.xAxis().tickFormat(null);
    
    // draw
    ageVis.datum(ageData)
    .call(barChart);
    
}
function drawPriorityChart(){
    // retrieve priority data based on filter date range
    let priorityData = getPriorityData(viewData, dateRange);
    // Activity I. TODO: adjust bar chart parameters for priority chart

    // Activity I. TODO: retrieve xAxis and adjust tick parameters

    // Activity I. TODO: draw the priority vis
    
}
function getAgeData(data, range){
    let filtered = range===undefined?data:data.filter(function(d){
        return d.time >= range[0] && d.time <= range[1];
    });
    
    // Iterate over each day
    let votesPerAge = d3.range(0,100).fill(0);
    filtered.forEach(function(day){
        
        // Sum all the values/votes for each age
        day.ages.forEach(function(d,i){
            votesPerAge[i] += d;
        });
        
    });
    
    return votesPerAge.map((d,i)=>({age:i, votes:d}));
}

function getPriorityData(data, range){
    let filtered = range===undefined?data:data.filter(function(d){
        return d.time >= range[0] && d.time <= range[1];
    });
    
    // Iterate over each day
    let votesPerPriority = {};
    filtered.forEach(function(day){
        // Sum all the values/votes for each age
        day.priorities.forEach(function(d){
            if (!votesPerPriority[d.title]){
                votesPerPriority[d.title] = 0;
            }
            votesPerPriority[d.title] += d.votes;
        });
        
    });
    
    return Object.entries(votesPerPriority).map(d=>({title:d[0], votes:d[1]}));
}


function transform(perDayData, metaData){
    // (2) Make our data look nicer and more useful
    let allData = perDayData.map(function (d) {
        
        let result = {
            time: dateParser(d.day),
            count: +d["count(*)"] + 1
        };
        
        // Convert votes for the 15 priorities from key-value format into one single array (for each day)
        result.priorities = d3.range(0,15).map(num=>{
            return {
                title: metaData.priorities[num]['item-title'],
                votes: d["sum(p"+num+")"]
            }
        });
        
        // Create an array of values for age 0 - 99
        result.ages = d3.range(0,100).fill(0); // initialize to 0
        
        // Insert the votes in the newly created array 'result.ages'
        d.age.forEach(function(a){
            if(a.age < 100){
                result.ages[a.age] = a["count(*)"];
            }
        })
        return result;
    });
    return allData;
}
function zoomed(range){
    // console.log('date range', range);
    d3.select("#time-period-min").text(dateFormatter(range[0]));
    d3.select("#time-period-max").text(dateFormatter(range[1]));

    // Activity III. TODO: update dateRage and call bar charts again
    
}

d3.select("#reset-zoom").on("click", function(){
    // Activity IV. TODO: Reset Zoom
    
});