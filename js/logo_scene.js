function logo_start () {


    var sulTween = new TweenMax.fromTo('#logoContainer #sul', 3, {opacity : 1, x: 450, y: 300}, {
        x: 500,
        ease: SteppedEase.config(45),
    });
    var gukTween = new TweenMax.fromTo('#logoContainer #guk', 2, {opacity : 1,x: 600, y: 300}, {
        x: 600,
        ease: SteppedEase.config(80),

    });
    var yulTween = new TweenMax.fromTo('#logoContainer #yul', 2, {opacity : 1,x: 700, y: 300}, {
        x: 700,
        ease: SteppedEase.config(80),

    });
    var chaTween = new TweenMax.fromTo('#logoContainer #cha', 3, {opacity : 1,x: 850, y: 300}, {
        x: 800,
        ease: SteppedEase.config(45),
        onComplete: logoTextComplete
    });

}