import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  private focusName: boolean;
  private focusPassword: boolean;
  private focusConfirmPassword: boolean;

  constructor() {}

  ngOnInit() {}
}
