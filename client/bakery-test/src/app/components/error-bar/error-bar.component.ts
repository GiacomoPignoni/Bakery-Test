import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-error-bar',
  templateUrl: './error-bar.component.html',
  styleUrls: ['./error-bar.component.scss']
})
export class ErrorBarComponent implements OnInit {

  errorText = "";

  isVisible = false;

  constructor(
    private readonly msgSvc: MessageService,
    router: Router
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isVisible = false;
      }
    });
  }

  ngOnInit(): void {
    this.msgSvc.onError.subscribe((text) => {
      this.errorText = text;
      this.isVisible = true;
    });
  }

  onClickCloseIcon(): void {
    this.isVisible = false;
  }
}
