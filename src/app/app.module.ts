import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb';
import { AjaxService } from './ajax.service';
import { FilterService } from './filter.service';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ContentSeasonsComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { ContentPilotsComponent } from './content-pilots/content-pilots.component';
import { ContentTeamsComponent } from './content-teams/content-teams.component';
import { ContentFilterPipe } from './content-filter.pipe';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'temporadas', component: ContentSeasonsComponent },
    { path: 'pilotos', component: ContentPilotsComponent },
    { path: 'equipos', component: ContentTeamsComponent }
];
export const routing = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    FooterComponent,
    BreadcrumbsComponent,
    ContentSeasonsComponent,
    HeaderComponent,
    FilterComponent,
    ContentPilotsComponent,
    ContentTeamsComponent,
    ContentFilterPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2BreadcrumbModule.forRoot()
  ],
  providers: [AjaxService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
