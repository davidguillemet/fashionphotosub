<?php die("Access Denied"); ?>#x#a:2:{s:6:"output";s:0:"";s:6:"result";s:54146:"@import url(https://fonts.googleapis.com/css?family=Open Sans:300,);
*{}
.gi-elem input,
.gi-elem button,
.gi-elem select,
.gi-elem textarea,
.gi-elem, .ial-close {
	box-sizing: border-box !important;
	-moz-box-sizing: border-box !important;
	-webkit-box-sizing: border-box !important;
}
.ial-close {
  margin: 0 !important;
}
.gi-elem .hidden {
  display: none;
}
.gi-elem {
  display: block;
  float: left;
  text-align: left;
  line-height: 0;
  padding-top: 2px;
}
.regRequired .red {
  font-weight: normal;
  color: inherit;
}
.gi-elem.gi-wide {
  width: 100%;
}
.ial-login,
.ial-form {
  display: block;
  margin: 0;
  line-height: 0;
  max-width: 100%;
}

.loginWndInside {
  max-width: 100%;
}

.ial-trans-gpu {
  -webkit-transition: 300ms ease-out;
	-moz-transition: 300ms ease-out;
  -ms-transition: 300ms ease-out;
  -o-transition: 300ms ease-out;
	transition: 300ms ease-out;
  -webkit-transition-property: visibility, opacity, -webkit-transform;
	-moz-transition-property: visibility, opacity, -moz-transform;
  -ms-transition-property: visibility, opacity, -ms-transform;
  -o-transition-property: visibility, opacity, -o-transform;
	transition-property: visibility, opacity, transform;
}
.ial-trans-b {
  visibility: hidden;
  opacity: 0;
  -webkit-transform: translate(0, 30px);
	-moz-transform: translate(0, 30px);
  -ms-transform: translate(0, 30px);
  -o-transform: translate(0, 30px);
	transform: translate(0, 30px);
}
.ial-trans-t {
  visibility: hidden;
  opacity: 0;
  -webkit-transform: translate(0, -30px);
	-moz-transform: translate(0, -30px);
  -ms-transform: translate(0, -30px);
  -o-transform: translate(0, -30px);
	transform: translate(0, -30px);
}
.ial-trans-r {
  visibility: hidden;
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
	-moz-transform: translate(-30px, 0);
  -ms-transform: translate(-30px, 0);
  -o-transform: translate(-30px, 0);
	transform: translate(-30px, 0);
}
.ial-trans-l {
  visibility: hidden;
  opacity: 0;
  -webkit-transform: translate(30px, 0);
	-moz-transform: translate(30px, 0);
  -ms-transform: translate(30px, 0);
  -o-transform: translate(30px, 0);
	transform: translate(30px, 0);
}
.ial-trans-gpu.ial-active {
  visibility: visible;
  opacity: 1;
  -webkit-transform: none;
	-moz-transform: none;
  -ms-transform: none;
  -o-transform: none;
	transform: none;
  /* safari fix */
  -webkit-transition-property: opacity, -webkit-transform;
}

/* Effect 1: Fade in and scale up */
.ial-effect-1{
	-webkit-transform: scale(0.7);
	-moz-transform: scale(0.7);
	-ms-transform: scale(0.7);
	transform: scale(0.7);
  visibility: hidden;
	opacity: 0;
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
}

.ial-effect-1.ial-active{
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	transform: scale(1);
	visibility: visible;
	opacity: 1;
}


/* Effect 2: Slide from the right */
.ial-effect-2{
	-webkit-transform: translateX(20%);
	-moz-transform: translateX(20%);
	-ms-transform: translateX(20%);
	transform: translateX(20%);
	opacity: 0;
	visibility: hidden;
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
}

.ial-effect-2.ial-active {
	-webkit-transform: translateX(0);
	-moz-transform: translateX(0);
	-ms-transform: translateX(0);
	transform: translateX(0);
	opacity: 1;
	visibility: visible;
}


/* Effect 4: Newspaper */
.ial-effect-4 {
	-webkit-transform: perspective( 1300px ) scale(0) rotate(720deg);
	-moz-transform: perspective( 1300px ) scale(0) rotate(720deg);
	-ms-transform: perspective( 1300px ) scale(0) rotate(720deg);
	transform: perspective( 1300px ) scale(0) rotate(720deg);
	opacity: 0;
	visibility: hidden;
	-webkit-transition: visibility 0.5s, opacity 0.5s, -webkit-transform 0.5s;
	-moz-transition: visibility 0.5s, opacity 0.5s, -moz-transform 0.5s;
	transition: visibility 0.5s, opacity 0.5s, transform 0.5s;
}

.ial-effect-4.ial-active {
	-webkit-transform: perspective( 1300px ) scale(1) rotate(0deg);
	-moz-transform: perspective( 1300px ) scale(1) rotate(0deg);
	-ms-transform: perspective( 1300px ) scale(1) rotate(0deg);
	transform: perspective( 1300px ) scale(1) rotate(0deg);
	opacity: 1;
	visibility: visible;
}


/* Effect 5: fall */

.ial-effect-5{
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transform: perspective( 1300px ) translateZ(600px) rotateX(20deg); 
	-moz-transform: perspective( 1300px ) translateZ(600px) rotateX(20deg); 
	-ms-transform: perspective( 1300px ) translateZ(600px) rotateX(20deg); 
	transform: perspective( 1300px ) translateZ(600px) rotateX(20deg); 
	opacity: 0;
	visibility: hidden;
	-webkit-transition:opacity;
	-moz-transition:opacity;
	transition:opacity;
}

.ial-effect-5.ial-active{
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
	-webkit-transform: perspective( 3000px ) translateZ(0px) rotateX(0deg);
	-moz-transform: perspective( 3000px ) translateZ(0px) rotateX(0deg);
	-ms-transform: perspective( 3000px ) translateZ(0px) rotateX(0deg);
	transform: perspective( 3000px ) translateZ(0px) rotateX(0deg); 
	opacity: 1;
	visibility: visible;
}


/* Effect 6: side fall */

.ial-effect-6{
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transform: perspective( 1300px ) translate(30%) translateZ(600px) rotate(10deg); 
	-moz-transform: perspective( 1300px ) translate(30%) translateZ(600px) rotate(10deg);
	-ms-transform: perspective( 1300px )translate(30%) translateZ(600px) rotate(10deg);
	transform: perspective( 1300px ) translate(30%) translateZ(600px) rotate(10deg); 
	opacity: 0;
	visibility: hidden;
}

.ial-effect-6.ial-active{
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
	-webkit-transform: perspective( 3000px ) translate(0%) translateZ(0) rotate(0deg);
	-moz-transform: perspective( 3000px ) translate(0%) translateZ(0) rotate(0deg);
	-ms-transform: perspective( 3000px ) translate(0%) translateZ(0) rotate(0deg);
	transform: perspective( 3000px ) translate(0%) translateZ(0) rotate(0deg);
	opacity: 1;
	visibility: visible;
}


/* Effect 8: 3D flip horizontal */

.ial-effect-8 {
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transform: perspective( 1300px ) rotateY(-70deg);
	-moz-transform: perspective( 1300px ) rotateY(-70deg);
	-ms-transform: perspective( 1300px ) rotateY(-70deg);
	transform: perspective( 1300px ) rotateY(-70deg);
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
	opacity: 0;
	visibility: hidden;
}

.ial-effect-8.ial-active {
	-webkit-transform: perspective( 1300px ) rotateY(0deg);
	-moz-transform: perspective( 1300px ) rotateY(0deg);
	-ms-transform: perspective( 1300px ) rotateY(0deg);
	transform: perspective( 1300px ) rotateY(0deg);
	opacity: 1;
	visibility: visible;
}

/* Effect 9: 3D flip vertical */
.ial-effect-9 {
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transform: perspective( 1300px ) rotateX(-70deg);
	-moz-transform: perspective( 1300px ) rotateX(-70deg);
	-ms-transform: perspective( 1300px ) rotateX(-70deg);
	transform: perspective( 1300px ) rotateX(-70deg);
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
	opacity: 0;
	visibility: hidden;
}

.ial-effect-9.ial-active {
	-webkit-transform: perspective( 1300px ) rotateX(0deg);
	-moz-transform: perspective( 1300px ) rotateX(0deg);
	-ms-transform: perspective( 1300px ) rotateX(0deg);
	transform: perspective( 1300px ) rotateX(0deg);
	opacity: 1;
	visibility: visible;
}

/* Effect 11: Super scaled */
.ial-effect-11 {
	-webkit-transform: perspective( 1300px ) scale(2);
	-moz-transform: perspective( 1300px ) scale(2);
	-ms-transform: perspective( 1300px ) scale(2);
	transform: perspective( 1300px ) scale(2);
	opacity: 0;
	visibility: hidden;
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
}

.ial-effect-11.ial-active {
	-webkit-transform: perspective( 1300px ) scale(1);
	-moz-transform: perspective( 1300px ) scale(1);
	-ms-transform: perspective( 1300px ) scale(1);
	transform: perspective( 1300px ) scale(1);
	opacity: 1;
	visibility: visible;
}

/* Effect 13: 3D slit */

.ial-effect-13 {
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
	/*-webkit-transform: perspective( 1300px ) translateZ(-3000px) rotateY(90deg);
	-moz-transform: perspective( 1300px ) translateZ(-3000px) rotateY(90deg);
	-ms-transform: perspective( 1300px ) translateZ(-3000px) rotateY(90deg);
	transform: perspective( 1300px ) translateZ(-3000px) rotateY(90deg);*/
	opacity: 0; 
	visibility: hidden;
}

.ial-effect-13.ial-active {
	-webkit-animation: slit .7s forwards ease-out;
	-moz-animation: slit .7s forwards ease-out;
	animation: slit .7s forwards ease-out;
}

@-webkit-keyframes slit {
	0% { -webkit-transform: perspective( 1300px ) translateZ(-3000px) rotateY(90deg); opacity: 0; }
	50% { -webkit-transform: perspective( 1300px ) translateZ(-250px) rotateY(89deg); opacity: 0.5; -webkit-animation-timing-function: ease-out;}
	100% { -webkit-transform: perspective( 1300px ) translateZ(1px) rotateY(0deg); opacity: 1; visibility: visible;}
}

@-moz-keyframes slit {
	0% { -moz-transform: perspective( 1300px ) translateZ(-3000px) rotateY(90deg); opacity: 0; }
	50% { -moz-transform: perspective( 1300px ) translateZ(-250px) rotateY(89deg); opacity: 0.5; -moz-animation-timing-function: ease-out;}
	100% { -moz-transform: perspective( 1300px ) translateZ(0) rotateY(0deg); opacity: 1; visibility: visible;}
}

@keyframes slit {
	0% { transform: perspective( 1300px ) translateZ(-3000px) rotateY(90deg); opacity: 0; }
	50% { transform: perspective( 1300px ) translateZ(-250px) rotateY(89deg); opacity: 0.5; animation-timing-function: ease-in;}
	100% { transform: perspective( 1300px ) translateZ(0) rotateY(0deg); opacity: 1; visibility: visible;}
}


/* Effect 14:  3D Rotate from bottom */

.ial-effect-14 {
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transform: perspective( 1300px ) translateY(100%) rotateX(90deg);
	-moz-transform: perspective( 1300px ) translateY(100%) rotateX(90deg);
	-ms-transform: perspective( 1300px ) translateY(100%) rotateX(90deg);
	transform: translateY(100%) rotateX(90deg);
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	transform-origin: 0 100%;
	opacity: 0;
	visibility: hidden;
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
}

.ial-effect-14.ial-active {
	-webkit-transform: perspective( 1300px ) translateY(0%) rotateX(0deg);
	-moz-transform: perspective( 1300px ) translateY(0%) rotateX(0deg);
	-ms-transform: perspective( 1300px ) translateY(0%) rotateX(0deg);
	transform: perspective( 1300px ) translateY(0%) rotateX(0deg);
	opacity: 1;
	visibility: visible;
}

/* Effect 15:  3D Rotate in from left */

.ial-effect-15 {
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transform: perspective( 1300px ) translateZ(100px) translateX(-30%) rotateY(90deg);
	-moz-transform: perspective( 1300px ) translateZ(100px) translateX(-30%) rotateY(90deg);
	-ms-transform: perspective( 1300px ) translateZ(100px) translateX(-30%) rotateY(90deg);
	transform: perspective( 1300px ) translateZ(100px) translateX(-30%) rotateY(90deg);
	-webkit-transform-origin: 0 100%;
	-moz-transform-origin: 0 100%;
	transform-origin: 0 100%;
	opacity: 0;
	visibility: hidden;
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
}

.ial-effect-15.ial-active {
	-webkit-transform: perspective( 1300px ) translateZ(0px) translateX(0%) rotateY(0deg);
	-moz-transform: perspective( 1300px ) translateZ(0px) translateX(0%) rotateY(0deg);
	-ms-transform: perspective( 1300px ) translateZ(0px) translateX(0%) rotateY(0deg);
	transform: perspective( 1300px ) translateZ(0px) translateX(0%) rotateY(0deg);
	opacity: 1;
	visibility: visible;
}

/* Effect 17:  Slide in from bottom with perspective on container */

#fake-offlajn-body{
  outline: 1px solid transparent;
	-webkit-transform: perspective( 1300px ) rotateX(0);
	-moz-transform: perspective( 1300px ) rotateX(0);
	-ms-transform: perspective( 1300px ) rotateX(0);
}

#fake-offlajn-body.go-to-back-17 {
	height: 100%;
	overflow: hidden;
	-webkit-transition: -webkit-transform 0.3s;
	-moz-transition: -moz-transform 0.3s;
	transition: transform 0.3s;
	-webkit-transform: perspective( 1300px ) rotateX(-4deg);
	-moz-transform: perspective( 1300px ) rotateX(-4deg);
	-ms-transform: perspective( 1300px ) rotateX(-4deg);
	transform: perspective( 1300px ) rotateX(-4deg);
	-webkit-transform-origin: 50% 0%;
	-moz-transform-origin: 50% 0%;
	transform-origin: 50% 0%; 
	-webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	transform-style: preserve-3d;
}

.ial-effect-17 {
	opacity: 0;
	visibility: hidden;
	-webkit-transform: translateY(200%);
	-moz-transform: translateY(200%);
	-ms-transform: translateY(200%);
	transform: translateY(200%);
}

.ial-effect-17.ial-active {
	-webkit-transform: translateY(0);
	-moz-transform: translateY(0);
	-ms-transform: translateY(0);
	transform: translateY(0);
	opacity: 1;
	visibility: visible;
	-webkit-transition: visibility 0.3s 0.2s, opacity 0.3s 0.2s, -webkit-transform 0.3s 0.2s;
	-moz-transition: visibility 0.3s 0.2s, opacity 0.3s 0.2s, -moz-transform 0.3s 0.2s;
	transition: visibility 0.3s 0.2s, opacity 0.3s 0.2s, transform 0.3s 0.2s;
}


/* Effect 18:  Slide from right with perspective on container */

#fake-offlajn-body.go-to-back-18 {
	-webkit-transform-style: preserve-3d;
	-webkit-animation: rotateRightSideFirst 0.5s forwards ease-in;
	-moz-transform-style: preserve-3d;
	-moz-animation: rotateRightSideFirst 0.5s forwards ease-in;
	transform-style: preserve-3d;
	animation: rotateRightSideFirst 0.5s forwards ease-in;
}


@-webkit-keyframes rotateRightSideFirst {
	50% { -webkit-transform: perspective( 1300px ) translateZ(-50px) rotateY(5deg); -webkit-animation-timing-function: ease-out; }
	100% { -webkit-transform: perspective( 1300px ) translateZ(-200px); }
}

@-moz-keyframes rotateRightSideFirst {
	50% { -moz-transform: perspective( 1300px ) translateZ(-50px) rotateY(5deg); -moz-animation-timing-function: ease-out; }
	100% { -moz-transform: perspective( 1300px ) translateZ(-200px); }
}

@keyframes rotateRightSideFirst {
	50% { transform: perspective( 1300px ) translateZ(-50px) rotateY(5deg); animation-timing-function: ease-out; }
	100% { transform: perspective( 1300px ) translateZ(-200px); }
}

.ial-effect-18 {
	-webkit-transform: translateX(200%);
	-moz-transform: translateX(200%);
	-ms-transform: translateX(200%);
	transform: translateX(200%);
	opacity: 0;
	visibility: hidden;
}

.ial-effect-18.ial-active {
	-webkit-transform: translateX(0);
	-moz-transform: translateX(0);
	-ms-transform: translateX(0);
	transform: translateX(0);
	opacity: 1;
	visibility: visible;
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
  -moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
  -ms-transition: visibility 0.3s, opacity 0.3s, -ms-transform 0.3s;
  transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
	-webkit-transition-delay: 600ms;
	-moz-transition-delay: 600ms;
	-ms-transition-delay: 600ms;
  transition-delay: 600ms;
}


/* Effect 19: Blur */
.ial-effect-19,
.ial-effect-20{
	-webkit-transform: scale(0.7);
	-moz-transform: scale(0.7);
	-ms-transform: scale(0.7);
	transform: scale(0.7);
  visibility: hidden;
	opacity: 0;
	-webkit-transition: visibility 0.3s, opacity 0.3s, -webkit-transform 0.3s;
	-moz-transition: visibility 0.3s, opacity 0.3s, -moz-transform 0.3s;
	transition: visibility 0.3s, opacity 0.3s, transform 0.3s;
}

.ial-effect-19.ial-active,
.ial-effect-20.ial-active{
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	transform: scale(1);
	visibility: visible;
	opacity: 1;
}

img.ial-captcha {
  max-width: 100%;
  opacity: 0;
  transition: opacity .33s ease-in-out;
  -o-transition: opacity .33s ease-in-out;
  -ms-transition: opacity .33s ease-in-out;
  -moz-transition: opacity .33s ease-in-out;
  -webkit-transition: opacity .33s ease-in-out;
}
img.ial-captcha.fadeIn {
  opacity: 1;
}

#loginComp {
  display: inline-block;
  margin-bottom: 15px;
  overflow: hidden;
  max-width: 100%;
}
#loginComp #loginBtn {
  display: none;
}
.selectBtn {
  display: inline-block;
  *display: inline;
  z-index: 10000;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: auto;
  -ms-user-select: none; 
}
.selectBtn:hover,
.selectBtn:active,
.selectBtn:focus {
  background: none;
}
#logoutForm,
#loginForm {
  display: inline-block;
  margin: 0;
}
.strongFields {
  display: block;
  overflow: hidden;
  height: 7px;
  margin: 3px 0 -17px;
  background-color: #4b91b5;
	background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDI9JzEwMCUnIHkyPScwJz48c3RvcCBzdG9wLWNvbG9yPScjNGI5MWI1Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjNjVhOGNhJy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+");
	background-image: -moz-linear-gradient(left, #4b91b5, #65a8ca);
  background-image: -o-linear-gradient(left, #4b91b5, #65a8ca);
  background-image: -ms-linear-gradient(left, #4b91b5, #65a8ca);
	background-image: -webkit-gradient(linear, left top, right top, from(#4b91b5), to(#65a8ca));
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4b91b5, endColorstr=#65a8ca, GradientType=1);
}
.strongFields .strongField.empty {
  background-color: #ffffff;
  -webkit-transition: background-color 1.2s ease-out;
	-moz-transition: background-color 1.2s ease-out;
  -ms-transition: background-color 1.2s ease-out;
  -o-transition: background-color 1.2s ease-out;
	transition: background-color 1.2s ease-out;
}
.strongField.empty,
.strongField {
  display: block;
  background-color: transparent;
  width: 20%;
  height: 7px;
  float: left;
}
.loginWndInside {
  position: relative;
  display: inline-block;
  background-color: #ffffff;
}

.loginH3 {
  font-family: 'Open Sans',Helvetica;
font-size: 22px;
color: #ffffff;
font-weight: normal;
font-weight: 300;
text-align: left;
line-height: 30px;
  padding: 10px 70px 10px 50px;
  position: relative;
  background-color: #4b91b5;
	background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDI9JzAnIHkyPScxMDAlJz48c3RvcCBzdG9wLWNvbG9yPScjNGI5MWI1Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjNGI5MWI1Jy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+");
	background-image: -moz-linear-gradient(top, #4b91b5, #4b91b5);
  background-image: -o-linear-gradient(top, #4b91b5, #4b91b5);
  background-image: -ms-linear-gradient(top, #4b91b5, #4b91b5);
	background-image: -webkit-gradient(linear, left top, left bottom, from(#4b91b5), to(#4b91b5));
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4b91b5, endColorstr=#4b91b5);
	-o-background-size: 100% 100%;
  margin: -20px -50px 20px -50px;
}
.socialBody {
	background-color: #DCDCDC;
}

.loginH3 {
  margin: 0px -55px 20px -55px;  /*25 = 10 padding ezen + 15 margin az elemeken*/
}

.strongFields {
  margin: 3px 0 2px;
  margin: 3px 0 2px;
}

.gi-elem{
  padding-top: 5px;
}

.ial-load {
  display: block;
	position: absolute;
	width: 21px;
	height: 21px;
  margin: 6px;
  background: transparent url(/fashion/modules/mod_improved_ajax_login/cache/106/7a48784979e2b8b736a78d7fbdd21d8d.png) no-repeat center;
  -webkit-animation:spin 4s linear infinite;
  -moz-animation:spin 4s linear infinite;
  animation:spin 4s linear infinite;
}
.ial-usermenu .ial-load {
	margin: 11px 0px;
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/559386a479419c93d245f1a8eaca151a.png);
}

.gi-elem .ial-load,
.gi-field-out{
  -moz-perspective: 200px;
  -webkit-perspective: 200px;
  perspective: 200px;
  width: 40px;
  height: 40px;
  margin-left: 0px;
  margin-top: 0px;  
  position: absolute;
}

.loginBtn .ial-load {
  visibility: hidden;
	margin: 0 0 0 -28px;
  width: 28px;
  top: 0;
  height: 100%;
}


.gi-field-icon{
  width: 40px;
  height: 40px;
  position: absolute;

  background-color: #4b91b5;
	background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDI9JzEwMCUnIHkyPScwJz48c3RvcCBzdG9wLWNvbG9yPScjNGI5MWI1Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjNjVhOGNhJy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+");
	background-image: -moz-linear-gradient(left, #4b91b5, #65a8ca);
  background-image: -o-linear-gradient(left, #4b91b5, #65a8ca);
  background-image: -ms-linear-gradient(left, #4b91b5, #65a8ca);
	background-image: -webkit-gradient(linear, left top, right top, from(#4b91b5), to(#65a8ca));
/*	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4b91b5, endColorstr=#65a8ca, GradientType=1);*/
  -moz-transition: all 0ms ease 0s;
  -webkit-transition: all 0ms ease 0s;
  -ms-transition: all 0ms ease 0s;
  transition: all 0ms ease 0s;
  
  -ms-backface-visibility:hidden;	
  -moz-backface-visibility:hidden;	
  -webkit-backface-visibility:hidden;	
  backface-visibility:hidden;	
}

.gi-field-icon-hover{
  width: 40px;
  height: 40px;
  margin-top:0px;
  margin-left:0px;
  left:-40px;
  position: absolute;
  background-color: #195F83;
  -moz-transform: rotateY(-90deg);
  -webkit-transform: rotateY(-90deg);
  -ms-transform: rotateY(-90deg);
  transform: rotateY(-90deg);
  -ms-transform-origin: 100% 0 0;
  -moz-transform-origin: 100% 0 0;
  -webkit-transform-origin: 100% 0 0;
  transform-origin: 100% 0 0;
  transform-style: preserve-3d;
  outline:1px solid transparent;

  -ms-backface-visibility:hidden;	
  -moz-backface-visibility:hidden;	
  -webkit-backface-visibility:hidden;	
  backface-visibility:hidden;
}

.gi-field-icon {
  -moz-transform-origin: 50% 20px -20px;
  -webkit-transform-origin: 50% 20px -20px;
  transform-origin: 50% 20px -20px;
  -moz-transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  outline:1px solid transparent;
}

.gi-elem.ial-active .gi-field-icon{
  -moz-transform: rotateY(90deg);
  -webkit-transform: rotateY(90deg);
  transform: rotateY(90deg);
  
  -moz-transition-duration : 500ms;
  -webkit-transition-duration : 500ms;
  -ms-transition-duration : 500ms;
  transition-duration : 500ms;
}

.gi-elem.ial-active .gi-field-icon-hover{
  background-color: #4b91b5;
}



.gi-ie-10 .gi-field-icon-hover{
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}

.gi-ie-10 .gi-elem.ial-active .gi-field-icon{
  transform: translateX(40px);
}

.gi-ie-7 .gi-field-out{
  display: none;
}

.gi-ie-8 .gi-field-out,
.gi-ie-9 .gi-field-out,
.gi-ie-10 .gi-field-out{
  overflow: hidden;
}

.gi-ie-9 .gi-elem.ial-active .gi-field-icon-hover{
  background-color: #195F83;
}

.gi-ie-9 .gi-elem.ial-active .gi-field-icon{
  left:40px;
}


.gi-user{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/user.png);
  background-repeat: no-repeat;
}

.gi-passw{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/pass.png);
  background-repeat: no-repeat;
}

.gi-key{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/key.png);
  background-repeat: no-repeat;
}

.ial-email1 .gi-field-icon,
.ial-email1 .gi-field-icon-hover,
.ial-email2 .gi-field-icon,
.ial-email2 .gi-field-icon-hover,
.gi-ial-email1,
.gi-ial-email2{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/email.png);
  background-repeat: no-repeat;
}

.ial-phone .gi-field-icon,
.ial-phone .gi-field-icon-hover,
.gi-ial-phone{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/phone.png);
  background-repeat: no-repeat;
}

.ial-captcha .gi-field-icon,
.ial-captcha .gi-field-icon-hover,
.gi-ial-recaptcha_response_field{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/pen.png);
  background-repeat: no-repeat;
}

.ial-dob .gi-field-icon,
.ial-dob .gi-field-icon-hover,
.gi-ial-dob{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/date.png);
  background-repeat: no-repeat;
}

.ial-website .gi-field-icon,
.ial-website .gi-field-icon-hover,
.gi-ial-website{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/website.png);
  background-repeat: no-repeat;
}

.ial-textarea .gi-field-icon,
.ial-textarea .gi-field-icon-hover,
.gi-ial-textarea{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/about.png);
  background-repeat: no-repeat;
}

.ial-address1 .gi-field-icon,
.ial-address1 .gi-field-icon-hover,
.ial-address2 .gi-field-icon,
.ial-address2 .gi-field-icon-hover,
.gi-ial-address1,
.gi-ial-address2{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/address.png);
  background-repeat: no-repeat;
}

.ial-country .gi-field-icon,
.ial-country .gi-field-icon-hover,
.gi-ial-country{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/country.png);
  background-repeat: no-repeat;
}

.ial-city .gi-field-icon,
.ial-city .gi-field-icon-hover,
.gi-ial-city{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/location3.png);
  background-repeat: no-repeat;
}

.ial-favoritebook .gi-field-icon,
.ial-favoritebook .gi-field-icon-hover,
.gi-ial-favoritebook{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/book.png);
  background-repeat: no-repeat;
}

.ial-region .gi-field-icon,
.ial-region .gi-field-icon-hover,
.gi-ial-region {
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/location4.png);
  background-repeat: no-repeat;
}

.ial-postal_code .gi-field-icon,
.ial-postal_code .gi-field-icon-hover,
.gi-ial-postal_code{
  background-position: center center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/location3.png);
  background-repeat: no-repeat;
}

.captchaCnt {
  text-align: center;
  *width: 215px;
  border: none;
  clear: both;
  padding: 2px;
  overflow: hidden;
  position: relative;
  margin: 0 0 6px;
  background: #fff;
  border: 1px solid #d8d8d8;
}

.captchaCnt .ial-reload{
  position: absolute;
  top:0;
  right:0;
  background: transparent;
  padding:3px;
}

.captchaCnt .ial-reload:hover{
  background: transparent;
  -webkit-animation:spin 1s linear infinite;
  -moz-animation:spin 1s linear infinite;
  animation:spin 1s linear infinite;
}

.captchaCnt .ial-reload:hover:active{
  background: transparent;
  -webkit-transition: none;
  -moz-transition: none;
  transition: none;
}

.ial-msg .red {
  display: none;
}
#recaptchaImg {
  display: block;
  width: 100%;
  min-height: 57px;
  max-width: 300px;
  margin: 0 auto;
  opacity: 0;
  transition: opacity .33s ease-in-out;
  -o-transition: opacity .33s ease-in-out;
  -ms-transition: opacity .33s ease-in-out;
  -moz-transition: opacity .33s ease-in-out;
  -webkit-transition: opacity .33s ease-in-out;
}
#recaptchaImg.fadeIn {
  min-height: 0;
	opacity: 1;
}
a.logBtn.selectBtn:hover {
  background-color: transparent;
}
.selectBtn {
  margin: 1px;
  white-space: nowrap;
}
.selectBtn:hover,
.loginBtn:hover {
  *text-decoration: none;
}
.btnIco {
  display: block;
  float: left;
  background: transparent no-repeat 1px center;
  width: 22px;
}

.loginBtn[data-oauth]{
  text-align: left;
}

.socialIco {
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: inline-block;
  *display: block;
  *float: left;
  margin: 0 6px;
  text-align: left;
  -o-perspective: 200px;
  -moz-perspective: 200px;
  -webkit-perspective: 200px;
  perspective: 200px;
}

.socialIco:first-child {
  margin-left: 0;
}
.socialIco:last-child {
  margin-right: 0;
}
.socialImg {
  width: 50px;
  height: 50px;
  position: relative;
  -o-transform-origin: 50% 25px -25px;
  -moz-transform-origin: 50% 25px -25px;
  -webkit-transform-origin: 50% 25px -25px;
  transform-origin: 50% 25px -25px;
  -o-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  background: #4b91b5;
  outline:1px solid transparent;
  -ms-backface-visibility:hidden;	
  -moz-backface-visibility:hidden;	
  -webkit-backface-visibility:hidden;	
  backface-visibility:hidden;  
}

.socialIco:hover .socialImg{
  -o-transform: rotateX(90deg);
  -moz-transform: rotateX(90deg);
  -webkit-transform: rotateX(90deg);
  transform: rotateX(90deg);
}

.loginBtn,
.socialIco,
.socialImg,
.ial-close{
  -webkit-transition: all .3s ease-out;
	-moz-transition: all .3s ease-out;
  -ms-transition: all .3s ease-out;
  -o-transition: all .3s ease-out;
	transition: all .3s ease-out;
}

.socialIco:hover {
/*  background-color: #1186bb;*/
}
.facebookImg {
  background-image:  url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/social/fb.png);
  background-position: center;
  background-size:50px;
}
.googleImg {
  background-image:  url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/social/google.png);
  background-position: center;
  background-size:50px;
}
.twitterImg {
  background-image:  url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/social/twitter.png);
  background-position: center;
  background-size:50px;
}
.windowsImg {
  background-image:  url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/social/wl.png);
  background-position: center;
  background-size:50px;
}
.linkedinImg {
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/social/in.png);
  background-position: center;
  background-size:50px;
}

.gi-ie-7 .facebookImg,
.gi-ie-8 .facebookImg {
  background-image:  url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/social/ie/fb.png);
}
.gi-ie-7 .googleImg,
.gi-ie-8 .googleImg {
  background-image:  url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/social/ie/google.png);
}
.gi-ie-7 .twitterImg,
.gi-ie-8 .twitterImg {
  background-image:  url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/social/ie/twitter.png);
}
.gi-ie-7 .windowsImg,
.gi-ie-8 .windowsImg {
  background-image:  url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/social/ie/wl.png);
}
.gi-ie-7 .linkedinImg,
.gi-ie-8 .linkedinImg {
  background: transparent url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/ie/social/in.png);
}


.socialImgHover{
  background-color: #195F83;
  -o-transform: rotateX(-90deg);
  -moz-transform: rotateX(-90deg);
  -webkit-transform: rotateX(-90deg);
  -ms-transform: rotateX(-90deg);
  transform: rotateX(-90deg);
  -o-transform-origin: 50% 0 0;
  -ms-transform-origin: 50% 0 0;
  -moz-transform-origin: 50% 0 0;
  -webkit-transform-origin: 50% 0 0;
  transform-origin: 50% 0 0;
  -o-transition: background 0.3s ease 0s;
  -moz-transition: background 0.3s ease 0s;
  -webkit-transition: background 0.3s ease 0s;
  -ms-transition: background 0.3s ease 0s;
  transition: background 0.3s ease 0s;
  position: absolute;
  top: 100%;
  transform-style: preserve-3d;
  height:50px;
  width:50px;
  outline:1px solid transparent;
  -ms-backface-visibility:hidden;	
  -moz-backface-visibility:hidden;	
  -webkit-backface-visibility:hidden;	
  backface-visibility:hidden;  
}

.socialIco:hover .socialImgHover{
  background-color: #4b91b5; 
} 


.gi-ie-10 .socialImgHover{
  -ms-transform: rotateX(0deg);
  transform: rotateX(0deg);
}

.gi-ie-10 .socialIco:hover .socialImg{
  transform: translateY(-50px);
}

.gi-ie-8 .socialIco,
.gi-ie-9 .socialIco,
.gi-ie-10 .socialIco{
  overflow: hidden;
}

.gi-ie-9 .socialIco:hover .socialImgHover{
  background-color: #195F83;
}

.gi-ie-9 .socialIco:hover .socialImg{
  top:-50px;
}


.loginBrd {
  clear: both;
  *text-align: center;
  position: relative;
  margin: 13px 0;
  height: 0;
  padding: 0;
  border: 0;
}
.loginBrd {
  border-bottom: 1px #4b91b5 solid;
  box-shadow:
		0px 1px 0px #FFFFFF;
	-moz-box-shadow:
		0px 1px 0px #FFFFFF;
	-webkit-box-shadow:
		0px 1px 0px #FFFFFF;
}
.loginOr {
  display: none;
  position: absolute;
  width: 20px;
  height: 15px;
  left: 50%;
  text-align: center;
  margin: -7px 0 0 -13px;
  border: 3px solid #ffffff;
  border-top: 0;
  background: #ffffff;
}
.ial-window .loginOr {
  display: block;
}

.ial-window ::selection {
  background-color: #4b91b5;
  color: #ffffaa;
}

.ial-window ::-moz-selection {
  background-color: #4b91b5;
  color: #ffffaa;
}

.ial-arrow-b,
.ial-arrow-l,
.ial-arrow-r {
  display: block;
  position: absolute;
  top: 9px;
  width: 0;
  height: 0;
  border: 9px transparent solid;
  border-left-width: 0;
  border-right-width: 6px;
}
.ial-arrow-l {
	left: -11px;
  border-right-color:  #de5243;
}
.ial-arrow-r {
  right: -6px;
  border-width: 9px 0 9px 6px;
  border-left-color: #de5243;
}
.ial-arrow-b {
  left: 4px;
  top: -6px;
  border-width: 0 9px 6px;
  border-bottom-color: #de5243;
}
.inf .ial-arrow-l {
  border-right-color: #C3C3C3;
}
.inf .ial-arrow-r {
  border-left-color: #C3C3C3;
}
.inf .ial-arrow-b {
  border-bottom-color: #C3C3C3;
}
.ial-msg {
  visibility: hidden;
  z-index: 10000;
  position: absolute;
	box-shadow:
		0px 1px 1px rgba(0,0,0,0.3);
	-moz-box-shadow:
		0px 1px 1px rgba(0,0,0,0.3);
	-webkit-box-shadow:
		0px 1px 1px rgba(0,0,0,0.3);
}
.ial-msg.inf {
  border: none;
  background-color: #FFFFFF;
	background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDI9JzAnIHkyPScxMDAlJz48c3RvcCBzdG9wLWNvbG9yPScjRkZGRkZGJy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjRjVGNUY1Jy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+");
	background-image: -moz-linear-gradient(top, #FFFFFF, #F5F5F5);
  background-image: -o-linear-gradient(top, #FFFFFF, #F5F5F5);
  background-image: -ms-linear-gradient(top, #FFFFFF, #F5F5F5);
	background-image: -webkit-gradient(linear, left top, left bottom, from(#FFFFFF), to(#F5F5F5));
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#FFFFFF, endColorstr=#F5F5F5);
}
.ial-msg.err {
  border: none;
  background-color: #de5243;
	background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDI9JzAnIHkyPScxMDAlJz48c3RvcCBzdG9wLWNvbG9yPScjZGU1MjQzJy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjZGU1MjQzJy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+");
	background-image: -moz-linear-gradient(top, #de5243, #de5243);
  background-image: -o-linear-gradient(top, #de5243, #de5243);
  background-image: -ms-linear-gradient(top, #de5243, #de5243);
	background-image: -webkit-gradient(linear, left top, left bottom, from(#de5243), to(#de5243));
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#de5243, endColorstr=#de5243);
}
span.ial-inf,
span.ial-err {
  position: relative;
  text-align: left;
  max-width: 360px;
  cursor: default;
  margin-left: 5px;
  padding: 4px 8px 4px 29px;
  text-decoration: none;
  color: #ffffff;
}
span.ial-inf {
  color: #5e5e5e;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
}
div.ial-icon-err,
div.ial-icon-inf {
  width: 24px;
  position: absolute;
  left: 0;
  background: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/info.png) no-repeat scroll left center transparent;
}
div.ial-icon-err {
  background: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/error.png) no-repeat left center;
}
.ial-inf,
.ial-err,
.loginBtn span,
.loginBtn {
  display: inline-block;
  font-family: 'Open Sans',Helvetica;
font-size: 20px;
color: #ffffff;
font-weight: normal;
font-weight: 300;
line-height: normal;
}
.ial-icon-refr {
  display: block;
  width: 28px;
  height: 28px;
  background: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/refresh.png) no-repeat center center;
}
.facebookIco {
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/7f7c52d8162256f6cf4afbcf6cc18b0e.png);
}
.googleIco {
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/b94ee14a55a86170afe8635e4df24b4b.png);
}
.twitterIco {
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/c8709b254e1061f26c3e6aefc7556906.png);
}
.windowsIco {
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/410b930108c8ceca9227ac0ceac3eaaa.png);
}
.loginBtn::-moz-focus-inner {
  border:0;
  padding:0;
}
.loginBtn {
  position: relative;
  cursor: pointer;
  text-align: center;
	margin: 0;
	padding: 4px 10px;
	border: none;
}
/*.socialIco:hover,*/
.ial-select:before,
.loginBtn,
.loginBtn:hover:active,
.selectBtn:hover .leftBtn {
  background-color: #4b91b5;
	background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDI9JzAnIHkyPScxMDAlJz48c3RvcCBzdG9wLWNvbG9yPScjNGI5MWI1Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjNGI5MWI1Jy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+");
	background-image: -moz-linear-gradient(top, #4b91b5, #4b91b5);
  background-image: -o-linear-gradient(top, #4b91b5, #4b91b5);
  background-image: -ms-linear-gradient(top, #4b91b5, #4b91b5);
	background-image: -webkit-gradient(linear, left top, left bottom, from(#4b91b5), to(#4b91b5));
/*	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4b91b5, endColorstr=#4b91b5);*/
	-o-background-size: 100% 100%;
}
.leftBtn {
  padding-left: 6px;
  padding-right: 6px;
}
.rightBtn {
  padding-left: 0px;
  padding-right: 0px;
	border-left-width: 0;
	letter-spacing: -2;
	background: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/arrow.png) no-repeat center center;
	background-color: #4b91b5;
	width: 28px; 
}

.rightBtn img{
  vertical-align: middle;
}

.ial-select:hover:before,
.loginBtn:hover,
.selectBtn:hover .rightBtn,
.selectBtn.ial-active .rightBtn {
  background-color: #65a8ca;
	background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDI9JzAnIHkyPScxMDAlJz48c3RvcCBzdG9wLWNvbG9yPScjNjVhOGNhJy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjNjVhOGNhJy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+");
	background-image: -moz-linear-gradient(top, #65a8ca, #65a8ca);
  background-image: -o-linear-gradient(top, #65a8ca, #65a8ca);
  background-image: -ms-linear-gradient(top, #65a8ca, #65a8ca);
	background-image: -webkit-gradient(linear, left top, left bottom, from(#65a8ca), to(#65a8ca));
/*	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#65a8ca, endColorstr=#65a8ca);*/
}

.rightBtn:hover,
.selectBtn:hover .rightBtn,
.selectBtn.ial-active .rightBtn {
	background: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/arrow.png) no-repeat center center;
  background-color: #65a8ca;
}

.ial-window,
.ial-usermenu {
  top: -10000px;
  margin: 0;
  position: absolute;
  z-index: 10000;
  padding: 0 0 3px;
  background-color: #4b91b5;
	background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDI9JzAnIHkyPScxMDAlJz48c3RvcCBzdG9wLWNvbG9yPScjNGI5MWI1Jy8+PHN0b3Agb2Zmc2V0PScxMDAlJyBzdG9wLWNvbG9yPScjNGI5MWI1Jy8+PC9saW5lYXJHcmFkaWVudD48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+");
	background-image: -moz-linear-gradient(top, #4b91b5, #4b91b5);
  background-image: -o-linear-gradient(top, #4b91b5, #4b91b5);
  background-image: -ms-linear-gradient(top, #4b91b5, #4b91b5);
	background-image: -webkit-gradient(linear, left top, left bottom, from(#4b91b5), to(#4b91b5));
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4b91b5, endColorstr=#4b91b5);
	-o-background-size: 100% 100%;
	box-shadow:
		1px 1px 5px rgba(0, 0, 0, 0.4);
	-moz-box-shadow:
		1px 1px 5px rgba(0, 0, 0, 0.4);
	-webkit-box-shadow:
		1px 1px 5px rgba(0, 0, 0, 0.4);
	overflow: hidden;
}
.ial-usermenu .loginWndInside {
  padding: 5px 10px;
}
.ial-arrow-up {
  position: absolute;
  top: -14px;
}

.loginWndInside .ial-close {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 0;
  margin: 0;
  cursor: pointer;
	z-index:10;
	background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/x.png);
	background-repeat: no-repeat;
	background-position: center center;
	background-color:transparent;
	border:none;
	padding: 20px;
	width: 50px;
	height: 50px;
  -ms-transform: translateX(88px) rotateZ(360deg);
  -moz-transform: translateX(88px) rotateZ(360deg);
  -webkit-transform: translateX(88px) rotateZ(360deg);
  transform: translateX(88px) rotateZ(360deg);
}

.ial-active .loginWndInside .ial-close {
  -ms-transform: translateX(0px) rotateZ(0deg);
  -moz-transform: translateX(0px) rotateZ(0deg);
  -webkit-transform: translateX(0px) rotateZ(0deg);
  transform: translateX(0px) rotateZ(0deg);
  -ms-transition: all 600ms ease 0ms;
  -moz-transition: all 600ms ease 0ms;
  -webkit-transition: all 600ms ease 0ms;
  transition: all 600ms ease 0ms;
}


.ial-active .loginWndInside .ial-close:hover{
	-ms-transform: rotateZ(90deg);
	-moz-transform: rotateZ(90deg);
	-webkit-transform: rotateZ(90deg);
	transform: rotateZ(90deg);
	-ms-transition-duration: 200ms;
	-moz-transition-duration: 200ms;
	-webkit-transition-duration: 200ms;
	transition-duration: 200ms;	
}

i.ial-correct {
  width: 0px;
  height: 0px;
}


.loginOr,
.smallTxt,
.forgetLnk,
.loginLst a:link,
.loginLst a:visited,
select.loginTxt,
textarea.loginTxt,
input[type=text].loginTxt,
input[type=password].loginTxt {
  font-family: 'Open Sans',Helvetica;
font-size: 20px;
color: #a1a1a1;
font-weight: 300;
text-decoration: none;
line-height: normal;
  border-radius:0;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
}

.ial-password1 .regTxt.loginTxt {
  margin-bottom: 0;
}
.passStrongness {
  *display: none;
  float: right;
}

select.loginTxt,
textarea.loginTxt,
input[type=password].loginTxt,
input[type=text].loginTxt {
  display: block;
  width: 100%;
  *width: auto;
  height: auto;
  margin: 0 0 14px;
  padding: 5px;
  padding-left: 47px;
  background: #ffffaa no-repeat;
  *border: 1px #4b91b5 solid;
  border: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
}

select.loginTxt {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-indent: 0.01px;
  text-overflow: '';
  padding: 4px 0 4px 25px;
  cursor: pointer;
}
select.loginTxt::-ms-expand {
  display: none;
}
select.loginTxt option {
  padding-left: 5px;
}
.ial-select {
  margin: 0;
  padding: 0;
  border: 0;
  position: relative;
  display: block;
}
.ial-select:before,
.ial-select:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 29px;
  height: 100%;
  pointer-events: none;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  box-sizing:border-box;
  border: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
  border-left:none;
}
.ial-select:after {
  background: transparent url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/arrow.png) no-repeat center center;
}

textarea.loginTxt{
  border: 1px solid #d8d8d8;
  resize: vertical;
  height: 118px;
}

.strongFields .strongField,
.strongFields .strongField.empty,
select.loginTxt,
textarea.loginTxt,
input[type=password].loginTxt,
input[type=text].loginTxt {
  -webkit-transition: background-color 0.3s ease-out;
	-moz-transition: background-color 0.3s ease-out;
  -ms-transition: background-color 0.3s ease-out;
  -o-transition: background-color 0.3s ease-out;
	transition: background-color 0.3s ease-out;
}
select.loginTxt,
textarea.regTxt,
input[type=password].regTxt,
input[type=text].regTxt {
  margin-bottom: 12px;
}
select.loginTxt option,
select.loginTxt {
  padding-left: 5px;
}
button.ial-submit {
  margin: 0 0 7px;
  *clear: both;
}

#regLyr span.ial-submit:nth-child(2n+1) {
  float: left;
  clear: both;
}

.loginTxt::-webkit-input-placeholder {opacity: 1;}
.loginTxt:-moz-placeholder {opacity: 1;}
.loginTxt::-moz-placeholder {opacity: 1;}
.loginTxt:-ms-input-placeholder {opacity: 1;}
.loginTxt:focus::-webkit-input-placeholder {opacity: 0.5;}
.loginTxt:focus:-moz-placeholder {opacity: 0.5;}
.loginTxt:focus::-moz-placeholder {opacity: 0.5;}
.loginTxt:focus:-ms-input-placeholder {opacity: 0.5;}

textarea.loginTxt:hover,
textarea.loginTxt:focus,
input[type=password].loginTxt:hover,
input[type=text].loginTxt:hover,
input[type=password].loginTxt:focus,
input[type=text].loginTxt:focus {
  background-color: #ffffaa;
}

.ial-submit {
  display: block;
  *display: inline;
  width: 100%;
  *width:auto;
  margin-bottom: 10px;
}

/*
.ial-submit:after{
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/btn-shadow.png);
  width:100%;
  height:7px;
  box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  content: "";
  display: block;
  margin-top: 4px;
  position: absolute;
} */

.ial-check-lbl,
.forgetLnk:link,
.forgetLnk:visited {
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
	margin:0;
}
.smallTxt {
  display: inline-block;
  margin-bottom: 1px;
  font-size: 14px;
  font-weight: normal;
}
a.forgetLnk:link {
  padding: 0;
  margin-left: 10px;
  background: none;
}
.forgetDiv {
  line-height:0;
}
.forgetDiv .forgetLnk:link {
  margin: 0;
}
a.forgetLnk:hover {
  background-color: transparent;
  text-decoration: underline;
}
.ial-checkbox {
  display: block;
  margin: 1px 4px 0 0;
  width: 18px;
  height: 18px;  
  border: 1px solid #d8d8d8;
  float: left;
  background: transparent none no-repeat center center;
}


.ial-checkbox.ial-active {
  background-image: url(/fashion/modules/mod_improved_ajax_login/themes/flat/images/check.png);
}
.ial-check-lbl {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.loginLst {
  padding: 0;
  margin: 0;
  list-style: circle inside;
}
.loginLst a:link,
.loginLst a:visited {
  display: block;
  padding: 0 10px 0 30px;
  line-height: 40px;
  text-align: left;
  box-shadow:
		0px 1px 0px rgba(0,0,0,0.09);
	-moz-box-shadow:
		0px 1px 0px rgba(0,0,0,0.09);
	-webkit-box-shadow:
		0px 1px 0px rgba(0,0,0,0.09);
  -webkit-transition: padding 0.25s ease-out;
	-moz-transition: padding 0.25s ease-out;
  -ms-transition: padding 0.25s ease-out;
  -o-transition: padding 0.25s ease-out;
	transition: padding 0.25s ease-out;
}
.forgetLnk:link,
.forgetLnk:visited,
.forgetLnk:hover,
.loginLst a.active,
.loginLst a:hover {
  padding: 0 5px 0 35px;
	color: #1186bb;
text-decoration: none;
}
.passStrongness,
.regRequired,
.smallTxt.req:after {
  color: #1186bb;
  content: " *";
}
.regRequired {
  display: block;
  margin: 0px;
  color:#fff;
}
.loginLst a{
  background-color: transparent;
  background-repeat: no-repeat;
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/50238328d7d4d36d605251b69016452f.png), url(/fashion/modules/mod_improved_ajax_login/cache/106/022cd0bd5fd9e44f026e8c4d95821c67.png);
  background-position: 0 center, -100% 0;
	background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/50238328d7d4d36d605251b69016452f.png)\9;
  background-position: 0 center\9;
}
.loginLst a.active,
.loginLst a:hover {
  background-position: -100% 0, 0 center;
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/022cd0bd5fd9e44f026e8c4d95821c67.png)\9;
}
.loginLst .settings {
	background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/abe0ca962c24426afa821f495087d085.png), url(/fashion/modules/mod_improved_ajax_login/cache/106/1a706017e91a3001a2c0e431d5195afc.png);
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/abe0ca962c24426afa821f495087d085.png)\9;
}
.loginLst .settings:hover {
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/1a706017e91a3001a2c0e431d5195afc.png)\9;
}
.loginLst .cart {
	background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/abbb990ff3cac9f603c6486923917e95.png), url(/fashion/modules/mod_improved_ajax_login/cache/106/21d24559bc88d7f6366e838b5a2e60f5.png);
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/abbb990ff3cac9f603c6486923917e95.png)\9;
}
.loginLst .cart:hover {
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/21d24559bc88d7f6366e838b5a2e60f5.png)\9;
}

.loginLst .logout {
	background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/3b6e5ed59341b30a5b9e6578362b8fe4.png), url(/fashion/modules/mod_improved_ajax_login/cache/106/dfca3886f243205aa018e762da6a1374.png);
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/3b6e5ed59341b30a5b9e6578362b8fe4.png)\9;
}
.loginLst .logout:hover {
  background-image: url(/fashion/modules/mod_improved_ajax_login/cache/106/dfca3886f243205aa018e762da6a1374.png)\9;
}
.loginLst a.active,
.loginLst a.active:hover{
  background-image: none;
}
.loginLst a:last-child {
  border: 0;
  box-shadow:none;
	-moz-box-shadow:none;
	-webkit-box-shadow:none;
}
.ial-bg {
	visibility: hidden;
	position:absolute;
	background:#000 ;
	top:0;left:0;
	width:100%;
	height:100%;
	z-index:9999;
  opacity: 0;
}
.ial-bg.ial-active {
  visibility: visible;
  opacity: 0.8;
}

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

.loginBtn span {
  display: inline-block;
  cursor: default;
}
.fullWidth.selectBtn,
.fullWidth.selectBtn span {
  display: block;
  text-decoration: none;
  z-index: 0;
}
form.fullWidth {
  width: 100%;
  margin: auto;
}

:focus {
  outline: none !important;
}
::-moz-focus-inner {
  border: none !important;
}";}