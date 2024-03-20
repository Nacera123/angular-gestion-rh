import { Component, OnInit } from '@angular/core';
import { IndividuService } from 'src/app/services/individu/individu.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {




  constructor(
    private individuService: IndividuService
  ) { }

  ngOnInit(): void {
    this.individuService.getAll()
      .subscribe(
        (response) => {
          console.log(response);

        }
      )
  }







}
