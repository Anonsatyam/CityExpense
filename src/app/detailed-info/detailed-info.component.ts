import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.css']
})
export class DetailedInfoComponent implements OnInit {
  newData1: any = [];
  one = []
  backed = 'backed';
  a;
  b;
  c;
  constructor(private service: HomeService, private route: ActivatedRoute, private toaster: ToastrService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(queryParams => {
      this.a = queryParams['city_name'];
      this.b = queryParams['country_name'];
      this.c = queryParams['category_name']
    });
    this.fetchData();
  }

  back(){
    this.router.navigate(['../details'], { queryParams: { city_name: this.a, country_name: this.b, backedd: this.backed}});
    // sessionStorage.getItem(cityname, country)
  }

  fetchData() {
    this.newData1 = [];
    this.spinner.show();
    this.service.getData(this.a, this.b).subscribe((data) => {
      const newData = data;
      this.newData1 = newData;
      this.one = this.newData1?.prices?.filter(aa => aa.category_name === this.c)
    },
      (err) => {
        this.toaster.error(err.error.message)
      });
    this.spinner.hide();
  }
}
