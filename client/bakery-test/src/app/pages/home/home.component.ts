import { Component, OnInit } from '@angular/core';
import { DessertService } from 'src/app/services/dessert.service';
import { MessageService } from 'src/app/services/message.service';
import { DessertOnSale } from 'src/app/viewModels/dessert-on-sale';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = true;

  desserts: DessertOnSale[] = [];

  constructor(
    private readonly dessertSvc: DessertService,
    private readonly msgSvc: MessageService
  ) {
    //
  }

  ngOnInit(): void {
    this.dessertSvc.getAllOnSale().subscribe(
      (newDesserts) => {
        this.desserts = newDesserts;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
