import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public focus: boolean;
  public loginForm: FormGroup;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.mainForm();
  }

  ngOnInit() {}

  mainForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password_hash: ['', Validators.required],
    });
  }

  get myForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return false;
    } else {
      this.usuarioService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          data => console.log('Logou!'),
          error => console.log('Não logou!')
        );
    }
  }
}
