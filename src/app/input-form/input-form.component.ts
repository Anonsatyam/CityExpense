import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  city_name;
  country_name;
  myData1;
  city;
  country;

  public dataForm: FormGroup;
  submitted = false;

  constructor(private spinner: NgxSpinnerService, private service: HomeService, private formBuilder: FormBuilder, private router: Router, private toaster: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      cityName: ['', Validators.required],
      countryName: ['', Validators.required],
    })
    console.log(this.route.snapshot.queryParamMap.has('backedd'));
    if(this.route.snapshot.queryParamMap.has('backedd')){
      this.city = this.route.snapshot.queryParamMap.get('city_name');
      this.country = this.route.snapshot.queryParamMap.get('country_name');
      console.log(this.city);
      
      this.service.getData(this.city, this.country)
      .subscribe((data) => { this.myData1 = data },
        (err) => {
          this.toaster.error(err.error.message)
        });
      this.spinner.hide();
    }
    
    
  }


  get f() { return this.dataForm.controls; }

  getListing() {
    this.spinner.show();
    this.service.getData(this.city_name, this.country_name)
      .subscribe((data) => { this.myData1 = data },
        (err) => {
          this.toaster.error(err.error.message)
        });
    this.spinner.hide();
  }

  onSubmit() {
    this.submitted = true
    this.city_name = this.dataForm.value.cityName;
    this.country_name = this.dataForm.value.countryName;
    sessionStorage.setItem(this.city_name, this.country_name);
    this.getListing();
    this.router.navigate(['details'], { queryParams: { city_name: this.city_name, country_name: this.country_name}});
  }

}
