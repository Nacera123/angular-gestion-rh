import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUserEmail: string = '';


  imageHome: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router


  ) {

    this.imageHome = {
      imageHome1: './assets/img/slides/nivo/bg-1.jpg',
      imageHome2: './assets/img/slides/nivo/bg-2.jpg',
      imageHome3: './assets/img/slides/nivo/bg-3.jpg'
    }
  }

  ngOnInit(): void {
    this.authService.currentUserEmail$.subscribe(email => {
      this.currentUserEmail = email;
    });
  }

  logOut(): void {
    console.log('je fonctionne');

    localStorage.removeItem('access_token');
    localStorage.removeItem('connectedUser');
    localStorage.removeItem('user');
    localStorage.removeItem('sub');
    localStorage.removeItem('user_email');
    this.router.navigate(['/login']);
  }







  Swiper: any;


  ngAfterViewInit(): void {
    const swiperConfig = {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 60
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 80
        },
        992: {
          slidesPerView: 6,
          spaceBetween: 120
        }
      }
    };

    new this.Swiper('.init-swiper', swiperConfig);
  }
}
