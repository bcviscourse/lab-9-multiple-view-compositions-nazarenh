--- 

layout: default
title: lab9

---
# <img src="img/instruction/logo.png" width="30px"> CSCI339001 Visualization


# Lab 9


## Learning Objectives

The goal of this lab is to get a better understanding of *system design* and *code structure* in order to be able to create a larger visualization system.

- Implement **zooming** using [d3-zoom](https://github.com/d3/d3-zoom)
- Implement a **reusable chart component**
- **Coordinate multiple visualizations** through a event-driven architecture using the [d3-dispatch](https://github.com/d3/d3-dispatch) module.

### Prerequisites


- Accept the lab assignment invitation from Github Classroom: 
	[https://classroom.github.com/a/EJCTxz-g](https://classroom.github.com/a/EJCTxz-g)


## Introduction

In the last weeks, you have learned how to implement common visualization types in D3. You have learned how to use [brushing](https://github.com/d3/d3-brush) and coordinate two views using [d3-dispatch](https://github.com/d3/d3-dispatch) 

This lab is built on the same fundamentals. You will practice how to structure a larger visualization system that you will likely need for your final projects. 

While we provide a template with many completed parts, you need to make sure to understand every single line of the code provided. 

1) Read the code line by line
2) Whenever you see a new syntax, function, attribute name etc., look up online to read their precise definitions
3) Look for examples that use them in a different context for better understanding.

### Advice

 It is crucial to have skills to look for examples online and **read official documentation**. Given limited time and resources, our class only provide structure and guidance.

To be a cutting edge developer, you should not wait for a book someone else writes but to work directly from the documentations or even reading source codes without the documentations. 


## United Nations - My World 2015

You will build a system that allows interactive selection of time slices of the poll data from the years 2012 and 2013. For the selected time period, the visualization will show the number of votes per priority/choice from the poll data in addition to a histogram of the participants' age for the given selection.

*Preview of the final system:*

![Lab 9 - Preview](img/instruction/lab9-preview.gif?raw=true "Lab 9 - Preview")


### Data

We use the following datasets that were collected as part of the United Nations [MY World 2015](http://www.myworld2015.org/) vote project. The project aim was to capture people's opinions, priorities, and views on major issues so that global leaders can be informed as they begin the process of defining the new development agenda for the world.

Please find more information about the datasets [here](./dataset_info).

- ```perDayData.json```
- ```myWorldFields.json``` *(= metadata about the 15 priorities)*

We have already aggregated and transformed the original datasets so that you can focus on the main tasks.


### Template

The provided template is similar to the template from [lab 6](https://bcviscourse.github.io/lab6/instruction) where we have worked with multiple coordinated views for the first time. 

Unlike lab 6, we provide **less guidance** so that you can complete this lab mostly on your own.


## Implementation Overview

The following image shows the relationship between the visualization components in this lab:

![Lab 9 - Components](img/instruction/lab9-relationship.png?raw=true "Lab 9 - Components")


The core of the webpage and the main interaction point is *CountVis*. The histogram bar chart in the second row (*AgeVis*) gives an overview of the participants' age and the second bar chart shows the number of votes for each priority. The *CountVis* component provides the temporal overview and the other two views display details for the selected time frame.

## Activity I. Implementing a Reusable Bar Chart

1. **Open the file ```main.js``` and get an overview of the data loading and cleaning procedure**
	
	* Read through the data processing code
	* Print datasets, as well as intermediate steps, to get a sense of the code
  
	The basic implementation of the CountVis object is completed too. If you open ```index.html``` in your web browser you should see the graph showing the number of votes for a specific period of time.

2. **Implement a reusable bar chart for the *AgeVis* and *PriorityVis* components**

	* Complete the *Activity I. TODO* items in `BarChart.js`.
	
	The *AgeVis* uses a **horizontal** layout while the *PriorityVis* uses a **vertical** layout. Depending on the layout type, you need to update the scales and axes accordingly. 

	Complete the horizontal layout first as we did it before and think about what should be changed in the vertical layout.	Make sure to understand every other line in `BarChart.js`.

	**Tip.** For scales, you need to modify the domain and the range. For axes, you need to replace the scales within (e.g., `xAxis.scale(xScale)` to `xAxis.scale(yScale)`, vice versa). There might be other approaches so feel free to explore on your own.
	
	

3. **Use the bar chart to draw the *PriorityVis* component**
   * Complete the *Activity I. TODO* items within `drawPriorityChart()` in `main.js`.

   See how the bar chart is used in the `main.js` and within `drawAgeChart()`: 1) importing the bar chart at the top and 2) adjusting bar chart parameters for the *AgeVis* chart.

	You will **reuse** the bar chart already imported and only need to adjust the bar chart parameters appropriate for the *PriorityVis*.

	* Set width to 500
	* Set value accessors to use `title` and `votes` (See `getPriorityData()`).
	* Set margin to `top: 0, right: 0, bottom: 50, left: 250`.
	* Set the layout to `vertical`.


	Second, for the tick marks, set [`tickValues`](https://github.com/d3/d3-axis#axis_tickValues) to null as the *PriorityVis*'s x-axis is a continuous scale. Also, set the tickFormat to use `d3.format(".2s")` which will use SI-prefix with two significant digits (e.g., 100k). **Refer to the documentation of [d3-format](https://github.com/d3/d3-format).**

	Finally, render it like the *AgeVis* component.

	Once you complete the Activity I, you will see two additional bar charts.


----
## Activity II. Implementing zooming in the *CountVis* component

In this activity, we will implement another common interaction method, *panning & zooming*, that allows users to explore data on different scales.

* Complete *Activity II. TODO* items in `AreaChart.js`

Play with some examples in the [d3-zoom](https://github.com/d3/d3-zoom) documentation.


The reusable AreaChart is designed to support enabling and disabling zooming by defining a boolean variable `zooming` at the top of the `AreaChart.js`.

1) **When `zooming` is true**, you first need to set the **[scale extent](https://github.com/d3/d3-zoom#zoom_scaleExtent)** controlling the minimum and maximum possible zoom scale factor. For this lab, we recommend 1 to 8. This means you can increase the scale of the `AreaChart` eight times larger but cannot decrease the scale below the original scale. If you don't specify the attribute ```scaleExtent()```, the zoom component will default to [0, *Infinity*]

Next, you also need to set **[`translateExtent`](https://github.com/d3/d3-zoom#zoom_translateExtent)** that controls the panning range. In this lab, set this to the size of the chart `[0,0]` to `[innerWidth, innerHeight]` so that you never pan outside of the chart. To do so, you also need to set the viewport [extent](https://github.com/d3/d3-zoom#zoom_extent) equal to the `translateExtent`. 

Finally, 1) attach a handler for the [zoom event](https://github.com/d3/d3-zoom#zoom-events) (i.e., `handleZoom()`) and 2) call the `zoom` on the `svg` (similar to axes or brushing, you have to apply the zoom behavior to a visible element using the syntax ```selection.call()```). The zoom behavior is abstract and the visible element will allow users to trigger zooming interactions.


2) **When `zooming` is false**, you just need to unbind the internal zoom event listener that uses the name `.zoom`. You can unbind the zoom behavior as below:

```javascript
svg.on(".zoom", null);
```


3) When a zooming event occurs based on mouse interactions by the user, the `handleZoom` event handler function will be called. D3 will save zoom event info in the global variable, [`d3.event`](https://github.com/d3/d3-zoom#zoom-events) which you can access it within the handler function:

* event.target - the associated zoom behavior.
* event.type - the string “start”, “zoom” or “end”; see [zoom.on](https://github.com/d3/d3-zoom#zoom_on).
* event.transform - the current zoom transform.
* event.sourceEvent - the underlying input event, such as mousemove or touchmove.


The d3-zoom only provides transformation information and does not manipulate the view directly. You need to use the information to update your visualization manually.

In this lab, we only need to use `d3.event.transform`. The transform object has the following zoom state information, as well as a series of helper functions (e.g., apply or rescale) to apply the transformation to other points or scales.

* transform.x - the translation amount tx along the x-axis.
* transform.y - the translation amount ty along the y-axis.
* transform.k - the scale factor k.

Please note that the updated transformation is relative to the initial state of the chart not from the previous zoom state (e.g., scale factor 2 means the current size of the vis is two times larger than its initial size, not its previous size).

You can use the information to update the range of the x-scale, which you can subsequently use to update the x-axis and the area path. d3-zoom provides a helper function [`applyX`](https://github.com/d3/d3-zoom#transform_applyX) so you can easily apply the transformation on a different point, in our case, range values:

For example, the initial range is defined as [0, innerWidth]. To get the new rage, you call `applyX` for each value in the array. 


```javascript
// calculate a new range
[0, innerWidth].map(d => d3.event.transform.applyX(d))
```

Internally, d3-zoom will calculate `value * transform.k + transform.x` to return the x-transformation of the specified value;

Once you have the new range of the x scale, you now need call axis and area functions again:

```javascript
svg.select('.x-axis').call(xAxis);
svg.select('path').attr("d", area); 
```

The challenge is how we get the `svg`. D3 calls your `handleZoom` using the element to which you attached the handler function as the context to the function. You can access the context element using `this` keyword and that element is `svg` in our case because you called the zoom on the SVG container.

```javascript
let svg = d3.select(this);
```

In `AreaChart.js`, make sure to learn how we use the clipping area so that the area path is clipped outside the main visualization canvas.

* Comment out `.attr("clip-path", "url(#clip)")` and observe what happens.

* Take a look at the definition of the clipPath as below, as well as the documentation of [`clipPath`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath)

	```javascript
	.append("defs")
		.append("clipPath")
		.attr("id", "clip")
			.append("rect")
			.attr("width", width)
			.attr("height", height);
	```

	
----

## Activity III. Linking *CountVis* with *AgeVis* and *PriorityVis*

Like the lab 6, we will use [d3-dispatch](https://github.com/d3/d3-dispatch) to implement an event-driven coordination architecture.

* Complete *Activity III. TODO* items in `AreaChart.js` and `main.js`.


We already defined a dispatch variable with a custom name dubbed `zoomed`:

```javascript
listeners = d3.dispatch('zoomed')
```

And a public function so that an external module(i.e., `main.js`) can registered a callback for the event.

```javascript
chart.on = function(eventName, callback) {
	if (!arguments.length) return listeners;
	listeners.on(eventName, callback);
	return chart;
};
```

In `main.js`, we already attached a callback as below which will be called when zooming occurs on the AreaChart:

```javascript
let areaChart = AreaChart()
.on('zoomed', zoomed);

function zoomed(range){
    d3.select("#time-period-min").text(dateFormatter(range[0]));
    d3.select("#time-period-max").text(dateFormatter(range[1]));

    // Activity III. TODO: update dateRage and call bar charts again
    
}
```
1) Inside `handleZoom()` in `AreaChart.js`, use [`rescaleX`](https://github.com/d3/d3-zoom#transform_rescaleX) to calculate the domain range based on the updated zoom transform:
```javascript
let rescaleX = d3.event.transform.rescaleX(xScale)
```
This will return a copy of the x scale with the domain corresponding to the new range. Try to print the domain of `rescaleX` to see how the domain is changing as you zoom.

In `zoomed()` in `main.js`, you need to call the two bar charts with the updated date range.

----



## Activity IV. Implement a button to reset the zoom

* Complete *Activity IV. TODO* in the reset button click handler in `main.js`

You first need to reset the `dateRange` from the whole data (e.g., `d3.extent(viewData,d=>d.time)` since `viewData` contains the initial data).

And, update the date labels, as well as redraw all the charts like the `zoomed` function.

-----


### Submission of lab 

Please submit the **Github Pages url**, as well as **the link to the repository**, to Canvas.

Thanks!
