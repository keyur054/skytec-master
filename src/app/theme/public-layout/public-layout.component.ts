import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-public-layout",
  templateUrl: "./public-layout.component.html",
  styleUrls: ["./public-layout.component.scss"]
})
export class PublicLayoutComponent implements OnInit {
  year: any;
  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {}
}
