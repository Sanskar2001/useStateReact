function useState(initialValue) {
  let state = initialValue;
  const getState = () => state;

  const setState = (newState) => {
    if (state !== newState) {
      state = newState;
      updateVirtualDOM();
    }
  };

  return [getState, setState];
}

const [getText, setText] = useState("Hello World");
const [getColor, setColor] = useState("red");

const contentDiv = document.getElementById("contents");
const colorBtn = document.getElementById("colorBtn");
const button = document.getElementById("btn");

let prevVirtualDOM = {
  tag: "div",
  nodeReference: contentDiv,
  props: { "style.backgroundColor": "red", innerText: "Hello World" },
  children: [],
};

let currentVirtualDOM = {
  tag: "div",
  nodeReference: contentDiv,
  props: { "style.backgroundColor": "red", innerText: "Hello World" },
  children: [],
};

const diffAndApplyChanges = (prevVirtualDOM, currentVirtualDOM) => {
  for (const key in prevVirtualDOM.props) {
    console.log(key + " : " + prevVirtualDOM.props[key]);
    console.warn(key + " : " + currentVirtualDOM.props[key]);

    if (prevVirtualDOM.props[key] !== currentVirtualDOM.props[key]) {
      if (key === "style.backgroundColor") {
        prevVirtualDOM.nodeReference.style.backgroundColor =
          currentVirtualDOM.props[key];
      } else {
        prevVirtualDOM.nodeReference[key] = currentVirtualDOM.props[key];
      }
      prevVirtualDOM.props[key] = currentVirtualDOM.props[key];
    }
  }
};

const render = () => {
  console.log(prevVirtualDOM);
  diffAndApplyChanges(prevVirtualDOM, currentVirtualDOM);
};

function updateVirtualDOM() {
  currentVirtualDOM.props["style.backgroundColor"] = getColor();
  currentVirtualDOM.props.innerText = getText();
  render();
}

button.addEventListener("click", () => {
  console.log("clicked");
  getText() === "Hello World" ? setText("Bye World") : setText("Hello World");
  getColor() === "red" ? setColor("blue") : setColor("red");
});
colorBtn.addEventListener("click", () => {
  getColor() === "red" ? setColor("blue") : setColor("red");
});

render();
