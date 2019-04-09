import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bands: string[] = ['5', '5', '6', '2', '0.1', '1'];
  private colors: Object = {
    '0': 'black',
    '1': 'brown',
    '2': 'red',
    '3': 'orange',
    '4': 'yellow',
    '5': 'green',
    '6': 'blue',
    '7': 'violet',
    '8': 'grey',
    '9': 'white',
    '0.1': 'gold',
    '0.01': 'silver',
  }
  colorBands: string[] = [];
  resistance: number=0;
  numberOfBandsValue: string = '4';
  resistanceMultiplier = 1;
  bandsAreFlippable: Boolean = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'github',
        sanitizer.bypassSecurityTrustResourceUrl('assets/github.svg'));
  }

  ngOnInit() {
    this.bandChanged();
  }

  calculateResistance() {
    //console.log('NOBC', this.numberOfBandsValue);
    if(this.numberOfBandsValue == '4') {
      this.resistance = ( parseInt(this.bands[0]) * 10 + parseInt(this.bands[1]) ) * Math.pow(10, parseInt(this.bands[2]))
    }else {
      this.resistance = ( parseInt(this.bands[0]) * 100 + parseInt(this.bands[1]) * 10 + parseInt(this.bands[2]) ) * Math.pow(10, parseInt(this.bands[3]))
    }
    if(this.resistance<1000) this.resistanceMultiplier = 1;
    if(this.resistance>=1000) this.resistanceMultiplier = 1000;
    if(this.resistance>=1000000) this.resistanceMultiplier = 1000000;
    this.bandsAreFlippable = this.checkIfBandsAreFlippable();
  }

  bandChanged(): void {
    //console.log('Changed bands', this.bands);
    this.bands.forEach((band, i) => {
      this.colorBands[i] = this.colors[band];
    });
    this.calculateResistance();
  }

  numberOfBandsChange(event) {
    this.numberOfBandsValue = event.value;
    this.calculateResistance();
  }

  checkIfBandsAreFlippable() {
    let numberOfBands = parseInt(this.numberOfBandsValue);
    
    if(numberOfBands<5) {
      let lastBand = this.bands[numberOfBands-1];
      //console.log(numberOfBands, lastBand, parseFloat(lastBand)>=0);
      return parseFloat(lastBand)>=0;
    }else if(numberOfBands<6){
      let lastBand = parseFloat(this.bands[numberOfBands-1]);
      let secondLastBand = parseFloat(this.bands[numberOfBands-2]);
      return (lastBand>=0) && (secondLastBand>=0) && (parseFloat(this.bands[0])!=0) && (parseFloat(this.bands[0])!=9);
    }else {
      let lastBand = parseFloat(this.bands[numberOfBands-1]);
      let secondLastBand = parseFloat(this.bands[numberOfBands-2]);
      return (secondLastBand>=0) && (parseFloat(this.bands[0])!=0) && (parseFloat(this.bands[0])!=5) && (parseFloat(this.bands[0])!=9) && (parseFloat(this.bands[1])!=0) && (parseFloat(this.bands[1])!=9);
    }
  }

  flipBands() {
    let tempBands = Object.assign([], this.bands);
    let len = parseInt(this.numberOfBandsValue);
    for(var i=0;i<(len-len%2)/2;i++) {
      this.bands[i] = tempBands[len-(i+1)];
      this.bands[len-(i+1)] = tempBands[i];
    }
    this.bandChanged();
  }

}
