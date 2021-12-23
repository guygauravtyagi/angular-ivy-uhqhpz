import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

import info from './../assets/models/info.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public data = info;
  public filterData = this.data;
  public filterGenderObj = {
    isMale: false,
    isFemale: false,
  };
  public addForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    male: new FormControl(''),
    female: new FormControl(''),
  });

  public addMember = function () {
    if (this.addForm.valid) {
      this.data.push({
        id: this.data.length + 1,
        first_name: this.addForm.controls.firstName.value,
        last_name: this.addForm.controls.lastName.value,
        email: this.addForm.controls.email.value,
        gender: this.addForm.controls.male.value ? 'Male' : 'Female',
      });
    }
  };

  public filterThis = function (event) {
    this.filterData = this.data.filter(
      (ele) =>
        ele.first_name.includes(event.target.value) ||
        ele.last_name.includes(event.target.value) ||
        ele.email.includes(event.target.value)
    );
  };

  public genderCheck = function (event) {
    if (event && event.target.name === 'male')
      this.filterGenderObj.isMale = event.currentTarget.checked;
    if (event && event.target.name === 'female')
      this.filterGenderObj.isFemale = event.currentTarget.checked;
    this.filterData = this.data.filter((ele) => {
      if (this.filterGenderObj.isMale && !this.filterGenderObj.isFemale)
        return ele.gender === 'Male';
      if (!this.filterGenderObj.isMale && this.filterGenderObj.isFemale)
        return ele.gender === 'Female';
      return true;
    });
  };
}
