var controller = new ScrollMagic.Controller({vertical: false});
var trainIntroMove = function(){
    new TweenMax.fromTo('#mainContainer #trainArea', 4, {opacity : 1, x: -5100}, {
        x: -10,
        ease: Elastic.easeOut.config(1, 1.2),

    });
};

var trainFirstBack = function(){
    // build tween
    var tween = new TimelineMax ()
        .add([
            TweenMax.to("#mainContainer #trainArea", 1, {backgroundPosition: "0 -1000%", ease: Linear.easeNone}),
        ]);

    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "#mainContainer", duration: 2000})
        .setTween(tween)
        .setPin("#mainContainer")
        .addTo(controller);
};

function main_start(){
    trainIntroMove();
}