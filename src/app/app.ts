import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Body } from "./components/body/body";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Body],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'cavok';
}
