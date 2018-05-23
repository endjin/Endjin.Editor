import { State } from "./State";
import { loadScript } from "../../Helpers/loadScript";
import { setWorldConstructor } from "cucumber";

loadScript("../built/local/editor.js");

setWorldConstructor(State);
