import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HeroComponent } from './hero/hero.component';
import { CommunityDrivenComponent } from './community-driven/community-driven.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    HeroComponent,
    CommunityDrivenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
