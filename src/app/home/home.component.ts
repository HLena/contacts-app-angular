import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SearchContactComponent } from './ui/components/search-contact/search-contact.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchContactComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  showWelcomeMessage: boolean = false;

  constructor(private router: Router){};

  ngOnInit(): void {
    this.checkRoute();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.checkRoute());
  }

  private checkRoute(){
    this.showWelcomeMessage = this.router.url === '/';
  }
}
