import { Component, OnInit } from "@angular/core";
import { FilmeService } from "src/app/services/filme.service";

@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.css"]
})
export class ListaComponent implements OnInit {
  IssuesList: any = [];

  constructor(public filmeService: FilmeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    return this.filmeService.GetIssue().subscribe((data: {}) => {
      this.IssuesList = data;
    });
  }
}
