/*SCENE 별로 애니메이션 정의*/
var controller = new ScrollMagic.Controller({vertical: false});
var guage_obj;
var trainIntroMove = function(){
    new TweenMax.fromTo('#mainContainer #trainArea', 4, {opacity : 1, x: -5100}, {
        x: -10,
        ease: Elastic.easeOut.config(1, 1.2),
        onComplete : trainStep_1

    });
    guage_obj = deadGauge(0);
};

var transition_chart = function(){return new TweenMax.fromTo('#chart',2,{opacity : 0}, {opacity : 1})};
var transition_description = function(){return new TweenMax.fromTo('#description',2,{opacity : 0}, {opacity : 1})};
var transition_guage = function(){return new TweenMax.fromTo('#deadArea',2,{opacity : 0}, {opacity : 1})};

var reset_Area = function(){
    transition_chart().reverse();
    transition_description().reverse();
    $("#chart").empty();
    $("#description").empty();
    TweenMax.killAll();
};

/*1번째 이벤트*/
var trainStep_1 = function(){
    // build tween  //스크롤 할 때 어떤 이미지가 움직일 것인가?
    guage_obj.update(100);

    /*초기화*/
    reset_Area();

    // 다시실행
    transition_chart().play();
    transition_description().play();
    description_step1();
    sevenMinutes();
    /*
    var tween = new TimelineMax ()
        .add([
            TweenMax.fromTo("#mainContainer", 1, {},{})
        ]);
    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "#mainContainer", duration: 2000, offset : 900})  // 오프셋 잡아주고,
        .setTween(tween)
        .setPin("#mainContainer")
        .addTo(controller);
       */
};


/*2번째 이벤트*/
var trainStep_2 = function(){
    // build tween  //스크롤 할 때 어떤 이미지가 움직일 것인가?


    /*초기화*/
    reset_Area();

    // 다시실행
    transition_chart().play();
    transition_description().play();
    description_step2();
    guage_obj.update(100-37);
    trainRoute();
    /*
    var tween = new TimelineMax ()
        .add([
            TweenMax.fromTo("#mainContainer", 1, {},{})
        ]);
    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "#mainContainer", duration: 2000, offset : 900})  // 오프셋 잡아주고,
        .setTween(tween)
        .setPin("#mainContainer")
        .addTo(controller);
       */
};

    /*3번째 이벤트*/
var trainStep_3 = function(){
    /*초기화*/
    reset_Area();

    // 다시실행
    transition_chart().play();
    transition_description().play();
    description_step3();
    guage_obj.update(100-73);
    incidentChart();
};

function main_start(){
    trainIntroMove();
}