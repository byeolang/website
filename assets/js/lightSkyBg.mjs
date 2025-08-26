var __leaf_dom_id_generator = 0;
function Leaf(newW, newV, newRotation, style, isMasthead, new_owner) {
  let x = Math.random() * (window.innerWidth * 0.9 - newW); // x should be between 0% ~ 60% of parent backgrounder
  let y = (isMasthead ? 100 : window.innerHeight) + newW + Math.random() * 100;
  this.v = newV;
  this.w = newW;
  this.rotation = newRotation;
  let life = -1; // I don't use common animation. instead I make a manual one.

	Unit.call(this, "leaf" + __leaf_dom_id_generator++, `/assets/images/${getImage()}`, x, y, newW, newW, life, new_owner,
    `transform: rotate(${Math.floor(Math.random() * 360)}deg); ${style}`);
}

function getImage() {
  let dice = Math.random();
  if (dice > 0.66)
    return "leaf1.svg";
  else if(dice > 0.33)
    return "leaf2.svg";
  return "leaf3.svg";
}

Leaf.prototype = new Unit();
Leaf.prototype.initialize = function() {
	Unit.prototype.initialize.call(this);
	if(this.getJQObject() == undefined) return;

  // let's customize:
  let bgWidth = window.innerWidth;
  let bgHeight = window.innerHeight;
  let gradient = -bgHeight / bgWidth + (Math.random() * 0.25 - 0.125);
  if (gradient == 0) gradient = 0.1;
  let destY = (this.x + bgWidth) * gradient - bgHeight;

  var leaf = this
  this.animation = TweenMax.to(leaf.getJQObject(), this.v, {
    x: bgWidth - this.w,
    y: destY - this.w * 5,
    rotation: this.rotation,
    ease: "none",
    repeat: -1,
    onUpdate: function() {
      function end() {
        leaf.animation.kill()
        leaf.release();
      }

      let jq = leaf.getJQObject();
      if (jq == undefined) return end();
      let pos = jq.position();
      if(pos.left + jq.width() >= window.innerWidth || pos.top + jq.height() <= 0) return end();
    }
  });
}


function getColor(isBlur) {
  let dice = Math.random();
  let blur = isBlur ? "blur(50px)" : "";
  if (dice > 0.66)
    return `filter: ${blur} brightness(0) saturate(100%) invert(26%) sepia(25%) saturate(1458%) hue-rotate(150deg) brightness(97%) contrast(97%);`;
  if (dice > 0.23)
    return `filter: ${blur} brightness(0) saturate(100%) invert(43%) sepia(39%) saturate(351%) hue-rotate(135deg) brightness(94%) contrast(95%);`;
  return `filter: ${blur} brightness(0) saturate(100%) invert(63%) sepia(53%) saturate(348%) hue-rotate(160deg) brightness(87%) contrast(98%);`;
}

function getScreenAreaRate() {
  let realArea = window.innerWidth * window.innerHeight;
  let targetArea = 2073600; // usual screen size is 1920 * 1080, 2073600.
  return realArea / targetArea;
}

function SmallLeaf(new_owner, isMasthead) {
  let grade = Math.random()
  let w = (8 + grade * 15) * getScreenAreaRate();
  Leaf.call(this, w, 90 - grade * 30, 100 + grade * 200, getColor(false), isMasthead, new_owner);
}
SmallLeaf.prototype = new Leaf();


function MediumLeaf(new_owner, isMasthead) {
  let grade = Math.random()
  let w = (35 + grade * 45) * getScreenAreaRate();
  Leaf.call(this, w, 30 - grade * 15, 100 + grade * 200, getColor(false), isMasthead, new_owner);
}
MediumLeaf.prototype = new Leaf();


function BigLeaf(new_owner, isMasthead) {
  let grade = Math.random()
  let w = 400 + (grade * 250) * getScreenAreaRate();
  Leaf.call(this, w, 4 - grade * 3, 100 + grade * 200, getColor(true), isMasthead, new_owner);
}
BigLeaf.prototype = new Leaf();




export function LightSkyBackGrounder(id, isMasthead, leafCount) {
	BackGrounder.call(this, id, "leaf");
  this.leafCount = leafCount;
  this.isMasthead = isMasthead;
}
LightSkyBackGrounder.prototype = new BackGrounder();
LightSkyBackGrounder.prototype.initialize = function() {
	BackGrounder.prototype.initialize.call(this);
  this.setJQObject($("body"));

	for(var n=0; n < this.leafCount; n++)
    this.createUnit();
}
LightSkyBackGrounder.prototype.resize = function(w, h) {
	this.earth.resize(w, h);
}
LightSkyBackGrounder.prototype.onCreateUnit = function() {
  var dice = Math.random() * 100;
  if(dice > 94)
    return new BigLeaf(this, this.isMasthead);
  else if(dice > 55)
    return new MediumLeaf(this, this.isMasthead);
  return new SmallLeaf(this, this.isMasthead);
}
LightSkyBackGrounder.prototype.onReleaseUnit = function(unit) {
	BackGrounder.prototype.onReleaseUnit.call(this, unit);

	this.createUnit();
}

window.addEventListener('resize', function(event) {
	updateWindow();
});

function updateWindow() {
	let vh = window.innerHeight * 0.01
	var vheader = document.getElementById('masthead').clientHeight;
	var vfooter = document.getElementById('footer').clientHeight;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	document.documentElement.style.setProperty("--vfooter", `${vfooter}px`);
	document.documentElement.style.setProperty("--vheader", `${vheader}px`);
}