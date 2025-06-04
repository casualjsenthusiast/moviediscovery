import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  moods = ['Feel Good', 'Action Fix', 'Mind Benders'];

  constructor() { }

  selectMood(mood: string) {
    console.log('Selected mood:', mood);
    // Future: route to movie list or fetch data
  }

  ngOnInit(): void {
  }

}
