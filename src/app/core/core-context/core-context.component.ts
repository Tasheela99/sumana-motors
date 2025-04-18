import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../../components/footer/footer.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-core-context',
  imports: [
    RouterOutlet,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './core-context.component.html',
  styleUrl: './core-context.component.scss'
})
export class CoreContextComponent {

}
