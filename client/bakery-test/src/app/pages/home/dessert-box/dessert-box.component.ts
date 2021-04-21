import { Component, Input } from '@angular/core';
import { DessertOnSale } from 'src/app/viewModels/dessert-on-sale';

@Component({
  selector: 'app-dessert-box',
  templateUrl: './dessert-box.component.html',
  styleUrls: ['./dessert-box.component.scss']
})
export class DessertBoxComponent {

  @Input() dessert: DessertOnSale;

  showIngredients = false;

  onInfoIconClick(): void {
    this.showIngredients = !this.showIngredients;
  }
}
