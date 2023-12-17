import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {FormComponentComponent} from "./form-component/form-component.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, FormComponentComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})


export class AppComponent {
    title: string = "front-angular"

    constructor(private router: Router) {
    }


    isHomeRoute() {
        return this.router.url === '/';
    }

}
