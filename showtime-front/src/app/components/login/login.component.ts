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
  private focus: boolean;
  public loginForm: FormGroup;
  private submitted = false;

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
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      password_hash: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
      ],
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
          data => {
            console.log('Logou!');
            this.router.navigate(['/populares']);
          },
          error => {
            console.log('Não logou!');
            this.router.navigate(['/login']);
          }
        );
    }
  }
}
