import { Component, ViewChild, OnInit, HostBinding } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { MatDrawer } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

import { BreakpointObserver } from '@angular/cdk/layout';
import { BreakpointState } from "@angular/cdk/layout";
import { Router, NavigationStart } from "@angular/router";

import { Material } from './material/shared/material.model';
import { Observable } from "rxjs";


const MIN_FULL_WIDTH = 570;
const FULL_MEDIA_CLASS = 'flashcard__app--full';
const MINI_MEDIA_CLASS = 'flashcard__app--mini';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {


  @ViewChild('drawerFlashcard') drawer: MatDrawer;

  selectedMaterial: Material;

  title = 'material-flashcard';

  largeScreen: boolean;

  @HostBinding('class')
  mediaClass: string;

  constructor(
    breakpointObserver: BreakpointObserver,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    let widthObservable: Observable<BreakpointState> = breakpointObserver.observe(`(min-width: ${MIN_FULL_WIDTH}px)`);
    widthObservable.subscribe(result => {
      this.onWidthChange(result);
    });

    this.matIconRegistry.addSvgIcon("flashcard-logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/flashcard-logo_filled.svg")
    );

    this.matIconRegistry.addSvgIcon("flashcard-logo_outlined",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/flashcard-logo_outlined.svg")
    );

    this.matIconRegistry.addSvgIcon("catalogue",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/catalogue.svg")
    );

    this.matIconRegistry.addSvgIcon("wall",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/wall.svg")
    );

    this.matIconRegistry.addSvgIcon("angular-solid",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/angular_solid.svg")
    );


    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // close drawer when route change
        this.drawer.close();
      }
    });
  }

  onCardClick(event) {
    if (this.largeScreen) {
      this.drawer.open();
      this.selectedMaterial = event.detail;
    }
  }

  onWidthChange(result: BreakpointState) {
    this.largeScreen = result.matches;
    this.mediaClass = this.largeScreen ? FULL_MEDIA_CLASS : MINI_MEDIA_CLASS;
  }

  onCloseDetail() {
    this.drawer.close();
  }

}
