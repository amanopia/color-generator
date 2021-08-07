const generate_button = document.querySelector(".generate-button");
const divArr = document.querySelectorAll(".main-card-images");
const innerImages = document.querySelectorAll(".inner-images");
const div1 = document.querySelector(".div-1");
const div2 = document.querySelector(".div-2");
const div3 = document.querySelector(".div-3");
const div4 = document.querySelector(".div-4");
const div5 = document.querySelector(".div-5");
const div6 = document.querySelector(".div-6");
const values = document.querySelectorAll(".values--container");
// FOR DISPLAYING HEX CODES
const names = document.querySelectorAll(".values");

// COLOUR GENERATE FUNCTION
generate_button.addEventListener("click", function () {
  for (let i = 0; i < divArr.length; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    divArr[i].style.backgroundColor = `#${randomColor}`;
    divArr[i].firstElementChild.textContent = `#${randomColor}`;
  }
});

// COLOUR CONVERTER FUNCTION

// HSL TO HEX

function HSLToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}

// HEX TO HSL: FOR LUMOSITY
function lumosityCalc(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length >= 3) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  // return "hsl(" + h + "," + s + "%," + l + "%)";
  // return `hsl(${h}, ${s}%, ${l}%)`;
  return l;
}
// HEX TO HSL: FOR SATURATION
function saturationCalc(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length >= 3) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  // return "hsl(" + h + "," + s + "%," + l + "%)";
  // return `hsl(${h}, ${s}%, ${l}%)`;
  return s;
}

// HEX TO HSL: FOR HUE
function hueCalc(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length >= 3) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  // return "hsl(" + h + "," + s + "%," + l + "%)";
  // return `hsl(${h}, ${s}%, ${l}%)`;
  return h;
}

// COLOUR RETURN EFFECT
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    div1.classList.remove("radius-change1");
    div1.classList.remove("motion");

    div2.classList.remove("motion");
    div3.classList.remove("motion");
    div4.classList.remove("motion");
    div5.classList.remove("motion");

    div6.classList.remove("radius-change2");
    div6.classList.remove("motion");
  }
});

// COLOR CLICK

div1.addEventListener("click", function () {
  div1.classList.toggle("radius-change1");
  div1.classList.toggle("motion");

  // HEX TO HSL
  var hexCodedColor = innerImages[0].textContent;
  var codedColor = hexCodedColor.split("#"); // splits the hex code into an array separated by a '#' so that the number can be passed into the hexToHSL function.
  var lumosity = lumosityCalc(codedColor[1]);
  var saturation = saturationCalc(codedColor[1]);
  var hue = hueCalc(codedColor[1]);

  console.log(names[1].textContent);
  console.log(HSLToHex(hue, saturation, lumosity));
  console.log(saturation);
  console.log(lumosity);
  console.log(hue);

  for (let i = 0, hue = 0; i < 15; i++) {
    names[i].textContent = HSLToHex(hue, 100, lumosity);
    values[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    hue += 24;
  }
});

div2.addEventListener("click", function () {
  div2.classList.toggle("motion");
});
div3.addEventListener("click", function () {
  div3.classList.toggle("motion");
});
div4.addEventListener("click", function () {
  div4.classList.toggle("motion");
});
div5.addEventListener("click", function () {
  div5.classList.toggle("motion");
});
div6.addEventListener("click", function () {
  div6.classList.toggle("radius-change2");
  div6.classList.toggle("motion");
});
