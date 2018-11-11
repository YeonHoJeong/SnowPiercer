/*SCENE 별로 애니메이션 정의*/
var controller = new ScrollMagic.Controller({vertical: false});
var guage_obj;
var trainIntroMove = function(){
    new TweenMax.fromTo('#mainContainer #trainArea', 4, {opacity : 1, x: -5100}, {
        x: -10,
        ease: Elastic.easeOut.config(1, 1.2),
        onComplete : trainStep_1

    });

};
/*1번째 이벤트*/
var trainStep_1 = function(){
    // build tween  //스크롤 할 때 어떤 이미지가 움직일 것인가?
    var transition_chart_step1 = new TweenMax.fromTo('#chart',2,{opacity : 0}, {opacity : 1});
    var transition_description_step1 = new TweenMax.fromTo('#decription',2,{opacity : 0}, {opacity : 1});
    var transition_guage = new TweenMax.fromTo('#deadGauge',2,{opacity : 0}, {opacity : 1});
    guage_obj = deadGauge(100);
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

/*1번째 이벤트 정리*/
var tranStepEnd_1 = function(){

};


/*2번째 이벤트*/
var trainStep_2 = function(){
    // build tween  //스크롤 할 때 어떤 이미지가 움직일 것인가?
    var tween = new TimelineMax ()
        .add([
            TweenMax.fromTo("body", 1, {opacity :0},{opacity : 1})
        ]);

    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "body", duration: 2000, offset : 900})  // 오프셋 잡아주고,
        .setTween(tween)
        .setPin("#mainContainer")
        .addTo(controller);
};

/*3번째 이벤트*/
var trainStep_3 = function(){
    // build tween  //스크롤 할 때 어떤 이미지가 움직일 것인가?
    var tween = new TimelineMax ()
        .add([
            TweenMax.fromTo("body", 1, {opacity :0},{opacity : 1})
        ]);

    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "body", duration: 2000, offset : 900})  // 오프셋 잡아주고,
        .setTween(tween)
        .setPin("#mainContainer")
        .addTo(controller);
};

/*4번째 이벤트*/
var trainStep_4 = function(){
    // build tween  //스크롤 할 때 어떤 이미지가 움직일 것인가?
    var tween = new TimelineMax ()
        .add([
            TweenMax.fromTo("body", 1, {opacity :0},{opacity : 1})
        ]);

    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "body", duration: 2000, offset : 900})  // 오프셋 잡아주고,
        .setTween(tween)
        .setPin("#mainContainer")
        .addTo(controller);
};



function main_start(){
    trainIntroMove();
}