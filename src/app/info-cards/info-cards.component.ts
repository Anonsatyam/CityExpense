import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.css']
})
export class InfoCardsComponent implements OnInit {

  @Input() abc;
  flag = false;
  category;
  products: any = [];

  constructor(private spinner: NgxSpinnerService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.spinner.show();
    this.httpClient.get("assets/data.json").subscribe(data => {
      this.products = data;
    });
    this.spinner.hide();
  }

  showMarketDetails(event) {
    this.flag = true;
    this.category = event.title
    this.router.navigate(['detailInfo'], { queryParams: { city_name: this.abc.city_name, country_name: this.abc.country_name, category_name: this.category }, queryParamsHandling: 'merge' })
  }
}
