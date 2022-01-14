import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HeroComponent } from './hero/hero.component';
import { CommunityDrivenComponent } from './community-driven/community-driven.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamComponent } from './team/team.component';
import { InvestorComponent } from './investor/investor.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    HeroComponent,
    CommunityDrivenComponent,
    NavbarComponent,
    TeamComponent,
    InvestorComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
