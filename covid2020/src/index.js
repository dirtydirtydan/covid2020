import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navbar, { NavButton } from './navigation/navigation';

class App {
  root = document.getElementById("root");
  show(component) {
    ReactDOM.render(component, this.root)
  } 
}

export const app = new App()

app.show(
  <Navbar>
    <NavButton> Test 1 </NavButton>
    <NavButton> Test 2 </NavButton>
    <NavButton> Test 3 </NavButton>
    <NavButton> Test 4 </NavButton>
  </Navbar>
)

const CLASS_TIME = true 
if (CLASS_TIME) {
 // this shows the classtime page located in the file classtime.js
  import('./classtime/classtime').then()
}
