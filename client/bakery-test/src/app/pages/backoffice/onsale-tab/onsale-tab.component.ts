import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DessertService } from 'src/app/services/dessert.service';
import { Dessert } from 'src/app/viewModels/dessert';
import { DessertOnSale } from 'src/app/viewModels/dessert-on-sale';

@Component({
  selector: 'app-onsale-tab',
  templateUrl: './onsale-tab.component.html',
  styleUrls: ['./onsale-tab.component.scss']
})
export class OnsaleTabComponent implements OnInit {

  public form: FormGroup;

  public onSaleDesserts: DessertOnSale[];
  public desserts: Dessert[];

  public loading = false;

  constructor(
    private readonly dessertSvc: DessertService
  ) {
    this.form = new FormGroup({
      dessertId: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadDesserts();
    this.dessertSvc.desserts.subscribe((newDesserts) => {
      this.desserts = newDesserts;
    });
    this.dessertSvc.loadAll();
  }

  loadDesserts(): void {
    this.dessertSvc.getAllOnSale().subscribe((newDesserts) => {
      this.onSaleDesserts = newDesserts;
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.dessertSvc.putOnSale(this.form.value).subscribe(() => {
      this.form.reset();
      this.loadDesserts();
      this.loading = false;
    });
  }
}
