import { init } from "./lexical";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Lexical!</h1>
  </div>

  <div id="lexical" contenteditable="true"></div>
`;

init();
