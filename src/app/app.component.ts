import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
    this.bandChanged();
  }

  calculateResistance() {
    console.log('NOBC', this.numberOfBandsValue);
    if(this.numberOfBandsValue == '4') {
      this.resistance = ( parseInt(this.bands[0]) * 10 + parseInt(this.bands[1]) ) * Math.pow(10, parseInt(this.bands[2]))
    }else {
      this.resistance = ( parseInt(this.bands[0]) * 100 + parseInt(this.bands[1]) * 10 + parseInt(this.bands[2]) ) * Math.pow(10, parseInt(this.bands[3]))
    }
  }

  bandChanged(): void {
    console.log('Changed bands', this.bands);
    this.bands.forEach((band, i) => {
      this.colorBands[i] = this.colors[band];
    });
    this.calculateResistance();
  }

  numberOfBandsChange(event) {
    this.numberOfBandsValue = event.value;
    this.calculateResistance();
  }

}
