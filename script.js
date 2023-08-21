function useState(initialValue) {
    let state = initialValue;
    const getState = () => state;

    const setState = newState => {
        if (state !== newState) {
            state = newState;
            render();
        }
    };

    return [getState, setState];
}

const [getText, setText] = useState('Hello World');
const [getColor,setColor] = useState('red');

const contentDiv = document.getElementById('contents');
const button = document.getElementById('btn');

function render() {
    contentDiv.innerText = `${getText()}`;
    contentDiv.style.backgroundColor = getColor();
}

button.addEventListener('click', () => {
   getText()==='Hello World' ? setText('Bye World') : setText('Hello World');
   getColor()==='red' ? setColor('blue') : setColor('red');
  
});

render();