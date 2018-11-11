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