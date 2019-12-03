import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  private focusUserName: boolean;
  private focusPassword: boolean;
  private focusConfirmPassword: boolean;
  private focusEmail: boolean;
  private focusEstado: boolean;
  private focusGenero: boolean;
  private focusWebsite: boolean;
  private focusName: boolean;
  private focusApelido: boolean;
  private usuarioAtual: Usuario;
  public registrationForm: FormGroup;
  private submitted = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.mainForm();
  }

  mainForm() {
    this.registrationForm = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password_hash: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
      ],
      confirm_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(128),
        ]),
      ],
      nome: ['', Validators.required],
      subscribe: [false],
      estado: ['', Validators.required],
      genero: ['', Validators.required],
      foto: [''],
      website: [''],
      apelido: [''],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }
    this.usuarioService
      .signup(this.registrationForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Registrado!');
          this.router.navigate(['/populares']);
        },
        error => {
          console.log('Não registrado!');
          this.router.navigate(['/signup']);
        }
      );
  }
}
