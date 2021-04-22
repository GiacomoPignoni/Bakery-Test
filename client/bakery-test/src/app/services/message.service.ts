import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MessageService {

  public readonly onError: Subject<string> = new Subject();

  public showError(text: string): void {
    this.onError.next(text);
  }
}
