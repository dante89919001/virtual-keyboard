const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init(arrayKey) {



        let textarea , h1;
        h1 = document.createElement('h1');
        textarea = document.createElement('textarea');
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");


        textarea.classList.add("use-keyboard-input");
        h1.classList.add('title');
        document.body.appendChild(h1);
        h1.innerHTML = 'Для того чтобы переключить язык нажмите сочитание клавиш: "leftShift + leftAlt"';
        document.body.appendChild(textarea);

        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys(arrayKey));

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");


        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },


    _createKeys(arrayKey) {
        const fragment = document.createDocumentFragment();
        
        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        arrayKey.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "del", "enter", "Shift"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                 case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "del":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = 'del';

                    keyElement.addEventListener("click", () => {
                        
                        this.properties.value = this.properties.value.substring(1, this.properties.value.length); // вырезаем первый символ
                        this._triggerEvent("oninput");
                    });

                    break;
                case "shift":
                         keyElement.innerHTML = 'shift';
                        keyElement.addEventListener("click", () => {

                            this._triggerEvent("oninput");
                        });
    
                        break;

                case "alt":
                        keyElement.innerHTML = 'alt';
                            keyElement.addEventListener("click", () => {
                                this._triggerEvent("oninput");
                            });
        
                            break; 
                case "ctrl":
                    
                              keyElement.innerHTML = 'ctrl';
                                keyElement.addEventListener("click", () => {
                                    this._triggerEvent("oninput");
                                });
            
                                break;
                case "win":
                                     keyElement.innerHTML = 'win';
                                     
                                    keyElement.addEventListener("click", () => {
                                        this._triggerEvent("oninput");
                                    });
                
                                    break;
                case "Shift":
                            keyElement.addEventListener("click", () => {
                                this._triggerEvent("oninput");
                            });
        
                            break;
                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key:active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case "tab":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.textContent = key.toLowerCase();
                    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "   ";
                        this._triggerEvent("oninput");
                    });

                    break;
                    
                default:
                    keyElement.textContent = key;
                    keyElement.addEventListener("click", () => {
                        focus();
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
                    
                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
    
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    },

    toggleLang(arrayKey){
       this._createKeys(arrayKey);
       this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    },

    toggleshift(arrayKey){
        
        this.elements.keysContainer.innerHTML = '';
        this.elements.keysContainer.appendChild(this._createKeys(arrayKey));
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        
    }
};

const keyLayoutEn = [
    '`' , "1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-" , "=", "backspace",
    "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[", "]" , '\\' , "del",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
"done" ,"shift", "z", "x", "c", "v", "b", "n", "m", ",", ".",  "▲", "/", "Shift" , 
   "ctrl", "win", "alt", "space" , "alt" , "◄" , "▼" , "►" , "ctrl"
];

const keyLayoutEnShift = [
    '~' , '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', "backspace",
    "tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",'{', '}', '|', "del",
    "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ':', '"', "enter",
"done" ,"shift", "Z", "X", "C", "V", "B", "N", "M", '<', '>',  "▲", '?', "Shift" , 
   "ctrl", "win", "alt", "space" , "alt" , "◄" , "▼" , "►" , "ctrl"
];

const keyLayoutRu = [
    'ё' , "1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-" , "=", "backspace",
    "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х", "ъ" , '\\' , "del",
    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
"done" ,"shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю",  "▲", ".", "Shift" , 
   "ctrl", "win", "alt", "space" , "alt" , "◄" , "▼" , "►" , "ctrl"
];

const keyLayoutRuShift = [
    'Ё' , '!', '"', "№", ";", "%", ":", "?", "*", "(", ")","_" , "+", "backspace",
    "tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З","Х", "Ъ" , '/' , "del",
    "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
"done" ,"shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю",  "▲", ".", "Shift" , 
   "ctrl", "win", "alt", "space" , "alt" , "◄" , "▼" , "►" , "ctrl"
];
const keysList = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash','Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  "done",'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'ArrowUp', 'Slash', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'
];

function setLocalStorage() {
    localStorage.setItem('lang', checkLang);
}
function getLocalStorage(){
    if(localStorage.getItem('lang') === 'En'){
        checkLang = "En";
        Keyboard.init(keyLayoutEn);
    } else {
        checkLang = "Ru";
        Keyboard.init(keyLayoutRu);
    }
  }

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);


let pressed = new Set();
let check = 0 ;  
let checkLang ;

function checkKey(e) {

    if(pressed.has('ShiftLeft') && pressed.has('AltLeft')){
        if(checkLang === 'En'){
            Keyboard.toggleLang(keyLayoutRu);
            checkLang = 'Ru';
        }else{
            Keyboard.toggleLang(keyLayoutEn);
            checkLang = 'En';
        }
    }else if (pressed.has('ShiftLeft') && !pressed.has('AltLeft')){
        check = 1;
        if(checkLang == 'En'){
           
            Keyboard.toggleshift(keyLayoutEnShift);
            
        }else{
            Keyboard.toggleshift(keyLayoutRuShift);
        }
    }


    else if(!pressed.has('ShiftLeft') && check === 1){
        check = 0;
        if(checkLang == 'En'){
            Keyboard.toggleshift(keyLayoutEn);
            
        }else{
            Keyboard.toggleshift(keyLayoutRu);
        }
    } 
}
let index;
window.addEventListener('keydown',()=>{ 
    event.preventDefault();
    pressed.add(event.code);
    document.querySelector(".use-keyboard-input").focus();
    index = keysList.indexOf(event.code);
    let eventMouse = new Event('click' , {bubbles:true});
    document.querySelectorAll('.keyboard__key')[index].dispatchEvent(eventMouse);
    document.querySelectorAll('.keyboard__key')[index].classList.add('keyboard__key--active'); 
    
  
        checkKey();
    }); 

window.addEventListener('keyup', () =>{
    pressed.forEach(element => {
        if(element === event.code){
            index = keysList.indexOf(event.code);
            document.querySelectorAll('.keyboard__key')[index].classList.remove('keyboard__key--active'); 
        }
    });
    pressed.delete(event.code);
    checkKey();
});
