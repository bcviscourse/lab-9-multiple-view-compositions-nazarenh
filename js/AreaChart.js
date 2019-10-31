
export default function AreaChart(){
    // default size
    let margin ={top: 20, right: 0, bottom: 50, left: 50};
    let width = 900;
    let height = 200;
    
    
    // Scales and axes
    let xScale = d3.scaleTime(),
    yScale = d3.scaleLinear(),
    xAxis = d3.axisBottom().scale(xScale),
    yAxis = d3.axisLeft().scale(yScale).ticks(6),
    area = d3.area(),
    xValue = d=>d.time,
    yValue = d=>d.count,
    listeners = d3.dispatch('zoomed'), 
    zooming = true,
    curve = d3.curveLinear,
    zoom = d3.zoom();
    
    function chart(selection){
        selection.each(function(data){
            let innerWidth = width  - margin.left - margin.right;
            let innerHeight =  height - margin.top - margin.bottom;
            // Initialize svg only if there is no svg within
            let svg = d3.select(this).selectAll('svg')
                .data([data]);
            
            // Initialize the internal structure only once
            let svgEnter = svg.enter().append('svg');
            let gEnter = svgEnter.append('g');
            
            gEnter.append("path");// path container (order matters)
            gEnter.append("g").attr("class", "x-axis axis"); // x-axis container
            gEnter.append("g").attr("class", "y-axis axis"); // x-axis container
            gEnter.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", innerWidth)
                .attr("height", innerHeight);
            
            
            // Update canvas sizes
            svg = svg.merge(svgEnter);
            svg.attr("width", width)
                .attr("height", height)
            
            let g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            xScale.range([0, innerWidth])
            .domain(d3.extent(data, xValue));
            
            yScale.range([innerHeight, 0])
            .domain([0, d3.max(data, yValue)]);
            
            
            // SVG area path generator
            area.x(d=>xScale(xValue(d)))
            .curve(curve)
            .y0(innerHeight)
            .y1(d=>yScale(yValue(d)));
            
            // Draw area by using the path generator
            g.select('path')
            .datum(data)
            .join('path')
            .attr("fill", "steelblue")
            .attr("clip-path", "url(#clip)")
            .attr("d", area);
            

            // initialize zooming
            if (zooming){
                // Activity II. TODO
            }else{
                // Activity II. TODO
                
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

    chart.zooming = function(_) {
        if (!arguments.length) return zooming;
        zooming = _;
        return chart;
    };

    chart.curve = function(_) {
        if (!arguments.length) return curve;
        curve = _;
        return chart;
    };
    

    function handleZoom(){
        // Activity II. TODO: update xScale's range, the area path, and x-axis


       
        // Activity III. TODO: call registered listeners for your custom 'zooomed' event
       

    }
    
    return chart;
    
}
