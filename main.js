const _nextFrame = (appState, input, setValue) => g => {
  g = Number(g)

  if (g < 0) {
    g = 0
  }

  appState.value = g
  input.value = g
  setValue(appState.value)
}

const Control = ({ parent, setValue, appState }) => {
  const input = document.querySelector(`${parent} input`)

  const nextFrame = _nextFrame(appState, input, setValue)

  nextFrame(appState.value)

  input.addEventListener("keyup", e => {
    nextFrame(e.target.value)
  })

  input.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") {
      nextFrame(Number(e.target.value) + appState.modifier)
    }

    if (e.key === "ArrowDown") {
      nextFrame(Number(e.target.value) - appState.modifier)
    }
  })

  const plusButton = document.querySelector(`${parent} .p10`)
  plusButton.addEventListener("click", e => {
    nextFrame(appState.value + 10)
  })

  let upInterval
  plusButton.addEventListener("mousedown", e => {
    upInterval = setInterval(() => {
      nextFrame(appState.value + 10)
    }, 300)
  })
  const minusButton = document.querySelector(`${parent} .m10`)
  minusButton.addEventListener("click", e => {
    nextFrame(appState.value - 10)
  })

  let downInterval
  minusButton.addEventListener("mousedown", e => {
    downInterval = setInterval(() => {
      nextFrame(appState.value - 10)
    }, 300)
  })

  document.addEventListener("mouseup", e => {
    clearInterval(upInterval)
    clearInterval(downInterval)
  })

  document.addEventListener("keydown", e => {
    if (e.key === "Shift") {
      appState.shift = true
      appState.modifier = 9
    }
  })

  document.addEventListener("keyup", e => {
    if (e.key === "Shift") {
      appState.shift = false
      appState.modifier = 0
    }
  })

  return { input }
}

const grid = document.querySelector("#grid")
const setGap = g => {
  grid.style.gridGap = `${g}px`;
}

const gapState = {
  shift: false,
  modifier: 0,
  value: 30
}

const gapInput =
      Control({ parent: "#gap", setValue: setGap, appState: gapState }).input

const setWidth = g => {
  grid.style.gridTemplateColumns = `repeat(2, ${g}px)`;
}

const widthState = {
  shift: false,
  modifier: 0,
  value: 30
}

const widthInput =
      Control({ parent: "#width", setValue: setWidth, appState: widthState }).input

const setHeight = g => {
  grid.style.gridTemplateRows = `repeat(3, ${g}px)`;
}

const heightState = {
  shift: false,
  modifier: 0,
  value: 30
}

const heightInput =
      Control({ parent: "#height", setValue: setHeight, appState: heightState }).input

const nextWidth = _nextFrame(widthState, widthInput, setWidth)
const nextHeight = _nextFrame(heightState, heightInput, setHeight)
const nextGap = _nextFrame(gapState, gapInput, setGap)

const widthLine = document.querySelector("#width-line")
widthLine.onmousedown = function(e) {
  e = e || window.event;
  let start = 0, diff = 0;

  if (e.pageX) start = e.pageX;
  else if (e.clientX) start = e.clientX;

  document.body.onmousemove = function(e) {
    e = e || window.event;

    var end = 0;
    if (e.pageX) end = e.pageX;
    else if (e.clientX) end = e.clientX;

    // diff = end - start;
    diff = end;
    nextWidth(diff)
    widthLine.style.left = diff + "px";
  };

  document.body.onmouseup = function() {
    // do something with the action here
    // widthLine has been moved by diff pixels in the X axis
    document.body.onmousemove = document.body.onmouseup = null;
  };
}

const heightLine = document.querySelector("#height-line")
heightLine.onmousedown = function(e) {
  e = e || window.event;
  let start = 0, diff = 0;

  if (e.pageY) start = e.pageY;
  else if (e.clientY) start = e.clientY;

  document.body.onmousemove = function(e) {
    e = e || window.event;

    var end = 0;
    if (e.pageY) end = e.pageY;
    else if (e.clientY) end = e.clientY;

    // diff = end - start;
    diff = end;
    nextHeight(diff)
    heightLine.style.top = diff + "px";
  };

  document.body.onmouseup = function() {
    // do something with the action here
    // heightLine has been moved by diff pixels in the X axis
    document.body.onmousemove = document.body.onmouseup = null;
  };
}


const gapLine = document.querySelector("#gap-line")
gapLine.onmousedown = function(e) {
  e = e || window.event;
  let start = 0, diff = 0;

  if (e.pageY) start = e.pageY;
  else if (e.clientY) start = e.clientY;

  document.body.onmousemove = function(e) {
    e = e || window.event;

    var end = 0;
    if (e.pageY) end = e.pageY;
    else if (e.clientY) end = e.clientY;

    // diff = end - start;
    diff = end;
    nextGap(diff)
    gapLine.style.top = Number(diff + heightState.value) + "px";
  };

  document.body.onmouseup = function() {
    // do something with the action here
    // gapLine has been moved by diff pixels in the X axis
    document.body.onmousemove = document.body.onmouseup = null;
  };
}
