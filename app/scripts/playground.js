"use strict";

var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var pxs = new Array();
var rint = 60;

$(document).ready(function(){

  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  canvas = document.getElementById('pixie');
  $(canvas).attr('width', WIDTH).attr('height',HEIGHT);
  con = canvas.getContext('2d');
  for(var i = 0; i < 100; i++) {
    pxs[i] = new Circle();
    pxs[i].reset();
  }
  setInterval(draw,rint);
});

function draw() {
  con.clearRect(0,0,WIDTH,HEIGHT);
  for(var i = 0; i < pxs.length; i++) {
    pxs[i].fade();
    pxs[i].move();
    pxs[i].draw();
  }
}

function Circle() {
  this.s = {ttl:8000, xmax:5, ymax:2, rmax:10, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

  this.reset = function() {
    this.x = (this.s.random ? WIDTH*Math.random() : this.s.xdef);
    this.y = (this.s.random ? HEIGHT*Math.random() : this.s.ydef);
    this.r = ((this.s.rmax-1)*Math.random()) + 1;
    this.dx = (Math.random()*this.s.xmax) * (Math.random() < .5 ? -1 : 1);
    this.dy = (Math.random()*this.s.ymax) * (Math.random() < .5 ? -1 : 1);
    this.hl = (this.s.ttl/rint)*(this.r/this.s.rmax);
    this.rt = Math.random()*this.hl;
    this.s.rt = Math.random()+1;
    this.stop = Math.random()*.2+.4;
    this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
  }

  this.fade = function() {
    this.rt += this.s.rt;
  }

  this.draw = function() {
    if(this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt*-1;
    else if(this.rt >= this.hl) this.reset();
    var newo = 1-(this.rt/this.hl);
    con.beginPath();
    con.arc(this.x,this.y,this.r,0,Math.PI*2,true);
    con.closePath();
    var cr = this.r*newo;
    g = con.createRadialGradient(this.x,this.y,0,this.x,this.y,(cr <= 0 ? 1 : cr));
    g.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
    g.addColorStop(this.stop, 'rgba(77,101,181,'+(newo*.6)+')');
    g.addColorStop(1.0, 'rgba(77,101,181,0)');
    con.fillStyle = g;
    con.fill();
  }

  this.move = function() {
    this.x += (this.rt/this.hl)*this.dx;
    this.y += (this.rt/this.hl)*this.dy;
    if(this.x > WIDTH || this.x < 0) this.dx *= -1;
    if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
  }

  this.getX = function() { return this.x; }
  this.getY = function() { return this.y; }
}

  // controller = new ScrollMagic({
  //       container: "#container",
  //       globalSceneOptions: {
  //         triggerHook: "onLeave"
  //       }
  //     });

  var $ovini = $(".ovini");
  var $light = $(".ovini .light");
  var $addLogo = $(".add-logo");
  var $eventDateLocal = $(".event-date-local");
  var $rockets = $(".header-ovini .rockets");


  var tl = new TimelineMax({delay:0.5, repeat:0, onComplete:oviniFloat});

  var tlRocket = new TimelineMax({delay:0.5, repeat:0, onComplete:oviniFloat});

  tlRocket.to($rockets, 2, {top: 200, right: 150,  ease: Power3.easeInOut}, "+=3.5");
  tl.set($ovini, {top:-80, opacity:0.5});
  tl.to($ovini, 1, {top: 130, opacity:1, ease: Power3.easeInOut});
  tl.to($light, 1, {opacity: 1});
  tl.to($addLogo, 1, {opacity: 1, top: 350, width: "182px", marginLeft: "-91px", ease: Power3.easeInOut});
  tl.to($eventDateLocal, 1, {opacity: 1});




  function  oviniFloat() {
    var $ovini = $(".ovini");
    var $registerHeader = $(".register-header");
    var $light = $(".ovini .light");

    var tlOvini = new TimelineMax({delay:0, repeat:500, repeatDelay:0});
    var tlRegister = new TimelineMax({delay:0, repeat:500, repeatDelay:0});
    var tlLight = new TimelineMax({delay:0, repeat:500, repeatDelay:0});
    tlOvini.to($ovini, 1, {top: 125, ease: Power3.easeInOut});
    tlOvini.to($ovini, 1, {top: 130, ease: Power3.easeInOut});

    tlRegister.to($registerHeader, 0.5, {opacity: 1});
    tlRegister.to($registerHeader, 0.5, {opacity: 0.8});

    tlLight.to($light, 2.5, {opacity: 0.8});
    tlLight.to($light, 2.5, {opacity: 1});
  }







// Paralax SCroll Magic

// init controller
var controller = new ScrollMagic();

// scene #home
new ScrollScene({triggerElement: "#home"})
        .setTween(TweenMax.from("#for-whom div.cloud", 1, {top: "-3%", ease: Linear.easeNone}))
        .addTo(controller);
// scene #organizers
new ScrollScene({triggerElement: "#organizers"})
        .setTween(TweenMax.from("#organizers div.top-cloud", 1, {top: "-8%", ease: Linear.easeNone}))
        .addTo(controller);

// scene #scheduler
new ScrollScene({triggerElement: "#schedule"})
        .setTween(TweenMax.from("#schedule div.top-cloud", 1, {top: "-8%", ease: Linear.easeNone}))
        .addTo(controller);
// scene #location
new ScrollScene({triggerElement: "#location"})
        .setTween(TweenMax.from("#schedule div.bottom-cloud", 1, {bottom: "-2%", ease: Linear.easeNone}))
        .addTo(controller);