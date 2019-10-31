
export default function BarChart(){
    // default size
    let margin ={top: 0, right: 0, bottom: 50, left: 50};
    let width = 400;
    let height = 250;
    
    // Scales and axes
    let xScale = d3.scaleBand().paddingInner(0.05),
    yScale = d3.scaleLinear(),
    xAxis = d3.axisBottom().scale(xScale),
    yAxis = d3.axisLeft().scale(yScale);
    //value accessor
    let xValue = d=>d[0],
    yValue = d=>d[1];
    let layout = 'horizontal'; 
    
    function chart(selection){
        selection.each(function(data){
            let innerWidth = width  - margin.left - margin.right;
            let innerHeight =  height - margin.top - margin.bottom;
            // Initialize svg only if there is no svg within
            let svg = d3.select(this).selectAll('svg')
            .data([data]);
            
            // Initialize the internal structure only once
            let svgEnter = svg.enter().append('svg');
            let gEnter = svgEnter.append('g'); // chart congainer
            
            gEnter.append("g").attr("class", "x-axis axis"); // x-axis container
            gEnter.append("g").attr("class", "y-axis axis"); // y-axis container

            // Update canvas sizes
            svg = svg.merge(svgEnter);
            svg.attr("width", width)
            .attr("height", height)
            
            let g = svg.select("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            if (layout==='horizontal'){
                // Activity I. TODO: update scales and axes
   

                // Activity I. TODO: draw bars
              
            }else{
                // Activity I. TODO: update scales and axes
   

                // Activity I. TODO: draw bars
            }

            // Append x-axis
            g.select('.x-axis')
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(xAxis);

            // Append y-axis
            g.select('.y-axis')
            .attr("transform", "translate(0,0)")
            .call(yAxis);
        });
    }
    
    chart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };
    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };
    
    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return chart;
    };
    chart.on = function(eventName, callback) {
        if (!arguments.length) return listeners;
        listeners.on(eventName, callback);
        return chart;
    };
    chart.x = function(_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return chart;
    };

    chart.y = function(_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return chart;
    };

    chart.xAxis = function(_) {
        if (!arguments.length) return xAxis;
        xAxis = _;
        return chart;
    };
    chart.xScale = function(_) {
        if (!arguments.length) return xScale;
        xScale = _;
        return chart;
    };
    chart.layout = function(_) {
        if (!arguments.length) return layout;
        layout = _;
        return chart;
    };
    return chart;
    
}
