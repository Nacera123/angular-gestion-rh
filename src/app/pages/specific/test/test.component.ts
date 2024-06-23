import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndividuService } from 'src/app/services/individu/individu.service';

declare var bootstrap: any;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {




  constructor(
    private individuService: IndividuService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.individuService.getAll()
      .subscribe(
        (response) => {
          console.log(response);

        }
      )
  }


  private modal: any;


  ngAfterViewInit() {
    const modalElement = document.getElementById('cart-modal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);

      const confirmButton = document.getElementById('confirmButton');
      const cancelButton = document.getElementById('cancelButton');

      // confirmButton?.addEventListener('click', () => this.onConfirm(), { once: true });
      // cancelButton?.addEventListener('click', () => this.onCancel(), { once: true });
    }
  }

  openModal() {
    this.modal.show();
  }

  onConfirm() {
    this.modal.hide();
    setTimeout(() => {
      this.router.navigate(['/offre']);
    }, 500); // Adjust the timeout as necessary to ensure modal is completely hidden
  }

  onCancel() {
    this.modal.hide();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500); // Adjust the timeout as necessary to ensure modal is completely hidden
  }


  titi() {
    this.openModal()
    const confirmButton = document.getElementById('confirmButton');
    confirmButton?.addEventListener('click', () => this.onConfirm(), { once: true });

  }

  toto() {
    console.log('toto');

    this.modal.show();

    const modalElement = document.getElementById('cart-modal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);

      const confirmButton = document.getElementById('confirmButton');
      const cancelButton = document.getElementById('cancelButton');

      confirmButton?.addEventListener(

        'click', () => {
          this.modal.hide()
          setTimeout(() => {
            this.router.navigate(['/offre']);
          }, 500);
        }, { once: true }

      );
      cancelButton?.addEventListener(
        'click', () => {
          this.modal.hide();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 500)
        }, { once: true }
      );
    }
  }
  // toto() {
  //   const modalElement = document.getElementById('cart-modal');
  //   if (modalElement) {
  //     const modal = new bootstrap.Modal(modalElement);
  //     modal.show();

  //     const confirmButton = document.getElementById('confirmButton');
  //     const cancelButton = document.getElementById('cancelButton');

  //     confirmButton?.addEventListener('click', () => {
  //       modal.hide();

  //       setTimeout(() => {
  //         this.router.navigate(['/offre']);
  //       }, 0);
  //     }, { once: true });

  //     cancelButton?.addEventListener('click', () => {
  //       modal.hide();

  //       setTimeout(() => {
  //         this.router.navigate(['/']);
  //       }, 0);
  //     }, { once: true });
  //   }
  // }






}
