import { Usuario } from "./../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/services/usuario.service";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  usuarioAtual: Usuario;
  usuarios = [];
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: [""],
      password_hash: [""],
      email: [""],
      nome: [""],
      subscribe: [false],
      estado: [""],
      genero: [""],
      foto: [""],
      website: [""],
      apelido: [""]
    });
  }

  onSubmit() {
    this.usuarioService
      .register(this.registrationForm.value)
      .subscribe(
        response => console.log("Success!", response),
        error => console.error("Error!", error)
      );
  }
}
