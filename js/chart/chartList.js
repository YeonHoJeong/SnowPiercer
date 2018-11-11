var deadGauge = function (value){
    var config4 = liquidFillGaugeDefaultSettings();
    config4.circleThickness = 0.15;
    config4.circleColor = "#8A0707";
    config4.textColor = "#756969";
    config4.waveTextColor = "#fef2f2";
    config4.waveColor = "#d30b0b";
    config4.textVertPosition = 0.8;
    config4.waveAnimateTime = 1000;
    config4.waveHeight = 0.05;
    config4.waveAnimate = true;
    config4.waveRise = false;
    config4.waveHeightScaling = false;
    config4.waveOffset = 0.25;
    config4.textSize = 0.75;
    config4.waveCount = 3;

    var gauge5 = loadLiquidFillGauge("deadCount", 100, config4);
    guageHoverBinding();
    return gauge5;
};

var sevenMinutes = function(){
    var tau = 2 * Math.PI;
// endAngle을 제외한 모든 값이 바인딩 된 호 함수.
// 주어진 각도에 대한 SVG 경로와 문자열, endAngle이 있는 객체를 전달함
// 속성을 `arc` 함수에 보내면 해당 문자열을 반환.
    var count = 0;
    var arc = d3.arc()
        .innerRadius(90)
        .outerRadius(140)
        .startAngle(0);
// SVG의 컨테이너를 잡고 바깥 원, 안쪽 원 크기 조정함

    var svg = d3.select("#chart").append("svg").attr("width", 500).attr("height", 500),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g").attr("transform", "translate(" + width / 2 +"," + height / 2 + ")"),
        centerText = svg.append("text").text(0 + "분").attr("transform", "translate(" + (-20 + width / 2) +"," + height / 2 + ")").style("font-size","26px");
// svg 설정값으로 arc를 불러옴.

    var background = g.append("path")
        .datum({endAngle: tau})
        .style("fill", "#ddd")
        .attr("d", arc);
// arc 색을 오렌지색으로 설정.

    var foreground = g.append("path")
        .datum({endAngle: 0.0 * tau})
        .style("fill", "orange")
        .attr("d", arc);

// Every so often, start a transition to a new random angle. The attrTween
// definition is encapsulated in a separate function (a closure) below.
    var step1_timer = 0;
    var interval = d3.interval(function(elapsed) {
        if(elapsed>8500){
            interval.stop();
            return;
        }
        foreground.transition()
            .duration(600)
            .attrTween("d", arcTween(step1_timer * tau));
        step1_timer += 0.14285714285;
        count += 1;
        centerText.text(count-1 + "분");
    }, 1000);

// Returns a tween for a transition’s "d" attribute, transitioning any selected
// arcs from their current angle to the specified new angle.
    function arcTween(newAngle) {

        // The function passed to attrTween is invoked for each selected element when
        // the transition starts, and for each element returns the interpolator to use
        // over the course of transition. This function is thus responsible for
        // determining the starting angle of the transition (which is pulled from the
        // element’s bound datum, d.endAngle), and the ending angle (simply the
        // newAngle argument to the enclosing function).
        return function(d) {

            // To interpolate between the two angles, we use the default d3.interpolate.
            // (Internally, this maps to d3.interpolateNumber, since both of the
            // arguments to d3.interpolate are numbers.) The returned function takes a
            // single argument t and returns a number between the starting angle and the
            // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
            // newAngle; and for 0 < t < 1 it returns an angle in-between.
            var interpolate = d3.interpolate(d.endAngle, newAngle);

            // The return value of the attrTween is also a function: the function that
            // we want to run for each tick of the transition. Because we used
            // attrTween("d"), the return value of this last function will be set to the
            // "d" attribute at every tick. (It’s also possible to use transition.tween
            // to run arbitrary code for every tick, say if you want to set multiple
            // attributes from a single function.) The argument t ranges from 0, at the
            // start of the transition, to 1, at the end.
            return function(t) {

                // Calculate the current arc angle based on the transition time, t. Since
                // the t for the transition and the t for the interpolate both range from
                // 0 to 1, we can pass t directly to the interpolator.
                //
                // Note that the interpolated angle is written into the element’s bound
                // data object! This is important: it means that if the transition were
                // interrupted, the data bound to the element would still be consistent
                // with its appearance. Whenever we start a new arc transition, the
                // correct starting angle can be inferred from the data.
                d.endAngle = interpolate(t);

                // Lastly, compute the arc path given the updated data! In effect, this
                // transition uses data-space interpolation: the data is interpolated
                // (that is, the end angle) rather than the path string itself.
                // Interpolating the angles in polar coordinates, rather than the raw path
                // string, produces valid intermediate arcs during the transition.
                return arc(d);
            };
        };
    }
};

var trainRoute = function(){
    var svg = d3.select("#chart").append("svg").attr("width", 500).attr("height", 500),
        width = +svg.attr("width"),
        height = +svg.attr("height");
    svg.append("image")
        .attr("width","500")
        .attr("height","500")
        .attr("xlink:href","./img/train_route.png")
};

var incidentChart = function (){
    var treeData = {
        "name": "윌 포드",
        "children": [
            {
                "name": "기차",
                "children": [
                    { "name": "7인의 반란" },
                    { "name": "맥그리거 폭동" },
                    { "name": "커티스 혁명" },
                ]
            },
        ]
    };


    var margin = {top: 20, right: 90, bottom: 30, left: 90},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("
            + margin.left + "," + margin.top + ")");

    var i = 0,
        duration = 750,
        root;

// declares a tree layout and assigns the size
    var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, function(d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

// Collapse after the second level
    root.children.forEach(collapse);

    update(root);

// Collapse the node and all it's children
    function collapse(d) {
        if(d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null
        }
    }

    function update(source) {

        // Assigns the x and y position for the nodes
        var treeData = treemap(root);

        // Compute the new tree layout.
        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach(function(d){ d.y = d.depth * 180});

        // ****************** Nodes section ***************************

        // Update the nodes...
        var node = svg.selectAll('g.node')
            .data(nodes, function(d) {return d.id || (d.id = ++i); });

        // Enter any new modes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', click);

        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        // Add labels for the nodes
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function(d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) { return d.data.name; });

        // UPDATE
        var nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = svg.selectAll('path.link')
            .data(links, function(d) { return d.id; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function(d){
                var o = {x: source.x0, y: source.y0}
                return diagonal(o, o)
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function(d){ return diagonal(d, d.parent) });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function(d) {
                var o = {x: source.x, y: source.y}
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function(d){
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {

            path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;

            return path
        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }
};