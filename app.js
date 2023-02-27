// Get the Variables
const palatteItem = document.querySelectorAll(".palatte-Item");
const refreshBtn = document.querySelector(".refresh-icon");

// Genarate Colors

const genarateColor = () => {
  const hexColor = chroma.random();
  return hexColor;
};

//Change Color

const changeColor = () => {
  palatteItem.forEach((div) => {
    const colorText = div.children[0];
    // Genarate Random Color
    const randomColor = genarateColor();
    div.style.backgroundColor = randomColor;
    colorText.innerText = randomColor;

    //Check contrast for Color Code Text
    checkTextContrast(randomColor, colorText);

    //Add colors to input range
    const color = chroma(randomColor);
    const slider = div.querySelectorAll("input");
    console.log(slider);
    const hue = slider[0];
    const brightness = slider[1];
    const saturation = slider[2];

    colorizeSlider(color, hue, brightness, saturation);
  });
};

const checkTextContrast = (color, text) => {
  const luminance = chroma(color).luminance();

  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
};

// Slider Color

const colorizeSlider = (color, hue, brightness, saturation) => {
  const noSat = color.set("hsl.s", 0);
  const fullSat = color.set("hsl.s", 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);

  // Update input Colors
  saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(
    0
  )}, ${scaleSat(1)})`;
};

changeColor();

refreshBtn.addEventListener("click", function () {
  changeColor();
});
