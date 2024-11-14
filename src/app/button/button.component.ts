import { Component, Input } from '@angular/core';
import { BUTTON } from '../BUTTON';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() data:any
  button:any


  constructor() {
  }

  ngOnInit() {
    this.button = this.data
    if (this.button.buttonId == 1) {
      let b = document.getElementById("b")
      if (b != null) {
        b.style.top = "20px"
        b.style.left = "20px"
      }
    }
    else if (this.button.buttonId == 2) {
      let b = document.getElementById("b")
      if (b != null) {
        b.style.top = "20px"
        b.style.left = "100px"
      }
    }
    else if (this.button.buttonId == 3) {
      let b = document.getElementById("b")
      if (b != null) {
        b.style.top = "100px"
        b.style.left = "20px"
      }
    }
    else if (this.button.buttonId == 4) {
      let b = document.getElementById("b")
      if (b != null) {
        b.style.top = "100px"
        b.style.left = "100px"
      }
    }
  }
}
