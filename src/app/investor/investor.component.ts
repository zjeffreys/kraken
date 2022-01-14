import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent implements OnInit {
  investor_data:any={ 
    'package': "Legacy Kraken Package", 
    'contains': [
      "1 X First 100 Crypto Kraken", 
      "0.5% Equity in crypto_kraken.co",
      "1 X Gold Weapon", 
      "$500 Investor Buy In",
    ]
  }
  opportunities: any[] = [];
  constructor() { 
    for (let index = 0; index < 6; index++) {
      this.opportunities.push(this.investor_data); 

    }
  }

  ngOnInit(): void {
  }

}
