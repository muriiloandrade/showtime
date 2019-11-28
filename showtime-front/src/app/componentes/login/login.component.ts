import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuarioAtual: Usuario;
  usuarios = [];
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password_hash: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.usuarioService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Usuario Logado!', true);
          //this.router.navigate([""]);
          console.log('sucesso');
        },
        error => {
          this.alertService.error(error);
          this.router.navigate(['']);
          console.log('falha');
        }
      );
  }
}
