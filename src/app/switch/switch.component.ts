import { Component, Input } from '@angular/core';
import { SWITCH } from '../SWITCH';
import { BUTTON } from '../BUTTON';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent {

  @Input() data:any
  Switch:SWITCH|null
  BUTTONs:BUTTON[] = []

  constructor() {
    this.Switch = null
  }

  ngOnInit() {
    this.Switch = this.data
    if (this.Switch != null ) {
      this.BUTTONs.push(this.Switch.Button1 = new BUTTON("1",1))
      this.BUTTONs.push(this.Switch.Button2 = new BUTTON("2",2))
      this.BUTTONs.push(this.Switch.Button3 = new BUTTON("3",3))
      this.BUTTONs.push(this.Switch.Button4 = new BUTTON("4",4))
    }
  }
}
