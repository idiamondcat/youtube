import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpenFiltersService {
  private isOpen: WritableSignal<boolean> = signal(true);
  currState: Signal<boolean> = computed(this.isOpen);

  changeState(): void {
    this.isOpen.update((value) => !value);
  }
}
