import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'resistor',
  templateUrl: './resistor.component.html',
  styleUrls: ['./resistor.component.scss']
})
export class ResistorComponent implements OnInit {

  @Input() numberOfBands: number = 4;
  @Input() bands: string[] = ['green', 'green', 'blue', 'red', 'grey', 'brown'];
  constructor() { }

  ngOnInit() {
  }

}
