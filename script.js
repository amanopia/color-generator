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
const valuesSaturation = document.querySelectorAll(
  ".values-saturation-container"
);
const valuesLumosity = document.querySelectorAll(".values-lumosity-container");
// FOR DISPLAYING HEX CODES
const names = document.querySelectorAll(".values");
const namesSaturation = document.querySelectorAll(".values-saturation");
const namesLumosity = document.querySelectorAll(".values-lumosity");

// COLOUR GENERATE FUNCTION
generate_button.addEventListener("click", function () {
  for (let i = 0; i < divArr.length; i++) {
    const randomColor = "000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
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

function hueCalc(hex) {
  hex = hex.replace(/#/g, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }
  var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
  if (!result) {
    return null;
  }
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return h;

  // return {
  //   h: h,
  //   s: s,
  //   l: l,
  // };
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

  console.log(names[0].textContent);
  console.log(HSLToHex(hue, saturation, lumosity));
  console.log(saturation);
  console.log(lumosity);
  console.log(hue);

  // HUE
  for (let i = 0, hue = 0; i < 15; i++) {
    names[i].textContent = HSLToHex(hue, 100, lumosity);
    values[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    hue += 24;
  }
  // SATURATION
  for (let i = 0, saturation = 100; i < 15; i++) {
    namesSaturation[i].textContent = HSLToHex(hue, saturation, lumosity);
    valuesSaturation[
      i
    ].style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lumosity}%)`;
    saturation -= 6;
  }
  // LUMOSITY
  for (let i = 0, lumosity = 100; i < 15; i++) {
    namesLumosity[i].textContent = HSLToHex(hue, 100, lumosity);
    valuesLumosity[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    lumosity -= 6.667;
  }
});

div2.addEventListener("click", function () {
  div2.classList.toggle("motion");

  // HEX TO HSL
  var hexCodedColor = innerImages[1].textContent;
  var codedColor = hexCodedColor.split("#"); // splits the hex code into an array separated by a '#' so that the number can be passed into the hexToHSL function.
  var lumosity = lumosityCalc(codedColor[1]);
  var saturation = saturationCalc(codedColor[1]);
  var hue = hueCalc(codedColor[1]);

  console.log(names[1].textContent);
  console.log(HSLToHex(hue, saturation, lumosity));
  console.log(saturation);
  console.log(lumosity);
  console.log(hue);

  // HUE
  for (let i = 0, hue = 0; i < 15; i++) {
    names[i].textContent = HSLToHex(hue, 100, lumosity);
    values[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    hue += 24;
  }
  // SATURATION
  for (let i = 0, saturation = 100; i < 15; i++) {
    namesSaturation[i].textContent = HSLToHex(hue, saturation, lumosity);
    valuesSaturation[
      i
    ].style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lumosity}%)`;
    saturation -= 6.6666667;
  }
  // LUMOSITY
  for (let i = 0, lumosity = 100; i < 15; i++) {
    namesLumosity[i].textContent = HSLToHex(hue, 100, lumosity);
    valuesLumosity[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    lumosity -= 6.667;
  }
});
div3.addEventListener("click", function () {
  div3.classList.toggle("motion");

  // HEX TO HSL
  var hexCodedColor = innerImages[2].textContent;
  var codedColor = hexCodedColor.split("#"); // splits the hex code into an array separated by a '#' so that the number can be passed into the hexToHSL function.
  var lumosity = lumosityCalc(codedColor[1]);
  var saturation = saturationCalc(codedColor[1]);
  var hue = hueCalc(codedColor[1]);

  console.log(names[2].textContent);
  console.log(HSLToHex(hue, saturation, lumosity));
  console.log(saturation);
  console.log(lumosity);
  console.log(hue);
  // HUE
  for (let i = 0, hue = 0; i < 15; i++) {
    names[i].textContent = HSLToHex(hue, 100, lumosity);
    values[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    hue += 24;
  }
  // SATURATION
  for (let i = 0, saturation = 100; i < 15; i++) {
    namesSaturation[i].textContent = HSLToHex(hue, saturation, lumosity);
    valuesSaturation[
      i
    ].style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lumosity}%)`;
    saturation -= 6.6666667;
  }
  // LUMOSITY
  for (let i = 0, lumosity = 100; i < 15; i++) {
    namesLumosity[i].textContent = HSLToHex(hue, 100, lumosity);
    valuesLumosity[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    lumosity -= 6.667;
  }
});
div4.addEventListener("click", function () {
  div4.classList.toggle("motion");

  // HEX TO HSL
  var hexCodedColor = innerImages[3].textContent;
  var codedColor = hexCodedColor.split("#"); // splits the hex code into an array separated by a '#' so that the number can be passed into the hexToHSL function.
  var lumosity = lumosityCalc(codedColor[1]);
  var saturation = saturationCalc(codedColor[1]);
  var hue = hueCalc(codedColor[1]);

  console.log(names[3].textContent);
  console.log(HSLToHex(hue, saturation, lumosity));
  console.log(saturation);
  console.log(lumosity);
  console.log(hue);
  // HUE
  for (let i = 0, hue = 0; i < 15; i++) {
    names[i].textContent = HSLToHex(hue, 100, lumosity);
    values[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    hue += 24;
  }
  // SATURATION
  for (let i = 0, saturation = 100; i < 15; i++) {
    namesSaturation[i].textContent = HSLToHex(hue, saturation, lumosity);
    valuesSaturation[
      i
    ].style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lumosity}%)`;
    saturation -= 6.6666667;
  }
  // LUMOSITY
  for (let i = 0, lumosity = 100; i < 15; i++) {
    namesLumosity[i].textContent = HSLToHex(hue, 100, lumosity);
    valuesLumosity[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    lumosity -= 6.667;
  }
});
div5.addEventListener("click", function () {
  div5.classList.toggle("motion");

  // HEX TO HSL
  var hexCodedColor = innerImages[4].textContent;
  var codedColor = hexCodedColor.split("#"); // splits the hex code into an array separated by a '#' so that the number can be passed into the hexToHSL function.
  var lumosity = lumosityCalc(codedColor[1]);
  var saturation = saturationCalc(codedColor[1]);
  var hue = hueCalc(codedColor[1]);

  console.log(names[4].textContent);
  console.log(HSLToHex(hue, saturation, lumosity));
  console.log(saturation);
  console.log(lumosity);
  console.log(hue);
  // HUE
  for (let i = 0, hue = 0; i < 15; i++) {
    names[i].textContent = HSLToHex(hue, 100, lumosity);
    values[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    hue += 24;
  }
  // SATURATION
  for (let i = 0, saturation = 100; i < 15; i++) {
    namesSaturation[i].textContent = HSLToHex(hue, saturation, lumosity);
    valuesSaturation[
      i
    ].style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lumosity}%)`;
    saturation -= 6.6666667;
  }
  // LUMOSITY
  for (let i = 0, lumosity = 100; i < 15; i++) {
    namesLumosity[i].textContent = HSLToHex(hue, 100, lumosity);
    valuesLumosity[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    lumosity -= 6.667;
  }
});
div6.addEventListener("click", function () {
  div6.classList.toggle("radius-change2");
  div6.classList.toggle("motion");

  // HEX TO HSL
  var hexCodedColor = innerImages[5].textContent;
  var codedColor = hexCodedColor.split("#"); // splits the hex code into an array separated by a '#' so that the number can be passed into the hexToHSL function.
  var lumosity = lumosityCalc(codedColor[1]);
  var saturation = saturationCalc(codedColor[1]);
  var hue = hueCalc(codedColor[1]);

  console.log(names[5].textContent);
  console.log(HSLToHex(hue, saturation, lumosity));
  console.log(saturation);
  console.log(lumosity);
  console.log(hue);
  // HUE
  for (let i = 0, hue = 0; i < 15; i++) {
    names[i].textContent = HSLToHex(hue, 100, lumosity);
    values[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    hue += 24;
  }
  // SATURATION
  for (let i = 0, saturation = 100; i < 15; i++) {
    namesSaturation[i].textContent = HSLToHex(hue, saturation, lumosity);
    valuesSaturation[
      i
    ].style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lumosity}%)`;
    saturation -= 6.6666667;
  }
  // LUMOSITY
  for (let i = 0, lumosity = 100; i < 15; i++) {
    namesLumosity[i].textContent = HSLToHex(hue, 100, lumosity);
    valuesLumosity[i].style.backgroundColor = `hsl(${hue}, 100%, ${lumosity}%)`;
    lumosity -= 6.667;
  }
});

// TEST FUNCTION

const randomColor = Math.floor(Math.random() * 16777215).toString(16);
console.log(HEXtoHSL(randomColor));
