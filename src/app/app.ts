import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Root of the app: header, the page of the current route and footer. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {}
