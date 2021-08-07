// const generateButton = document.querySelector(".generate--btn");
// generateButton.addEventListener("click", function () {
//   anime({
//     loop: true,
//     targets: "div",
//     translateX: 250,
//   });
// });

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

// COLOUR GENERATE FUNCTION
generate_button.addEventListener("click", function () {
  for (let i = 0; i < divArr.length; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    divArr[i].style.backgroundColor = `#${randomColor}`;
    divArr[i].firstElementChild.textContent = `#${randomColor}`;
  }
});

// COLOUR CONVERTER FUNCTION
function hexToHSL(H) {
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
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);

  // return "hsl(" + h + "," + s + "%," + l + "%)";
  // return `hsl(${h}, ${s}%, ${l}%)`;
  return l;
}
console.log(hexToHSL(Math.floor(Math.random() * 16777215).toString(16)));
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

  var hexCodedColor = innerImages[0].textContent;
  var codedColor = hexCodedColor.split("#"); // splits the hex code into an array separated by a '#' so that the number can be passed into the hexToHSL function.
  var lumosity = hexToHSL(codedColor[1]);
  for (let i = 0, hue = 0; i < 15; i++) {
    values[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    hue += 24;
  }
  // HEX CODE OF FIRST COLOUR IN COLOUR PALETTE

  // CONVERTING THE HEX CODE TO HSL
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

function hConvert(colour1) {
  var colour1 = divArr[0].firstElementChild.textContent;
  let r = 0,
    g = 0,
    b = 0;
  if (colour1.length >= 3) {
    r = "0x" + colour1[1] + colour1[1];
    g = "0x" + colour1[2] + colour1[2];
    b = "0x" + colour1[3] + colour1[3];
  }
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  return h;
}
console.log(hConvert());
