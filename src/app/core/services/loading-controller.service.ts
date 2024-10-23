import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingControllerService {
  public loadingFlag: WritableSignal<number> = signal(0);

  constructor() { }

  public addLoader() {
    const value = this.loadingFlag()
    this.loadingFlag.set(value + 1);
  }

  public removeLoader() {
    const value = this.loadingFlag();

    if (value > 0)
      this.loadingFlag.set(value - 1);
  }
}
