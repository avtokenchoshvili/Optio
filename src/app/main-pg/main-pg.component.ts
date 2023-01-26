import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, } from '@angular/cdk/layout';

@Component({
  selector: 'app-main-pg',
  templateUrl: './main-pg.component.html',
  styleUrls: ['./main-pg.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainPgComponent {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  public open() {
    return this.drawer.open();
}
public close() {
  return this.drawer.close();
}

}


