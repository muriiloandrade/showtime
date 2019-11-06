import { Usuario } from "./../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/services/usuario.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  usuarioAtual: Usuario;
  usuarios = [];
  registrationForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ["", Validators.required],
      password_hash: ["", Validators.required],
      email: ["", Validators.required,Validators.email],
      nome: ["", Validators.required],
      subscribe: [false],
      estado: ["", Validators.required],
      genero: ["", Validators.required],
      foto: [""],
      website: [""],
      apelido: [""]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }
    this.usuarioService
      .register(this.registrationForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Usuario Registrado", true);
          //this.router.navigate([""]);
          console.log("sucesso");
        },
        error => {
          this.alertService.error(error);
          this.router.navigate([""]);
          console.log("falha");
        }
      );
  }
}
