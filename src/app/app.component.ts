import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PersonListViewComponent } from "./home/person-list-view/person-list-view.component";
import { TopBarComponent } from "./top-bar/top-bar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, PersonListViewComponent, TopBarComponent]
})
export class AppComponent {
  title = 'Esercizio';
}
