import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
  public isMobile = window.innerHeight > window.innerWidth;


  public dayCountdown: number = 0;
  public hourCountdown: number = 0;
  public minCountdown: number = 0;
  public secCountdown: number = 0;

  constructor() {
    this.launchCountdown();
  }

  public launchCountdown(): void {
    const countDownDate = new Date('Jun 24, 2023 14:30:00').getTime();
    setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.dayCountdown = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hourCountdown = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minCountdown = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.secCountdown = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
  }

  public redirectTo(elementId: string): void {
    const element: HTMLElement | null = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
}
