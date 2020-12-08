import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsDashboardModule } from './features/projects-dashboard/projects-dashboard.module';
import { TestsDashboardModule } from './features/tests-dashboard/tests-dashboard.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavbarModule } from './common/modules/navbar/navbar.module';
import { FooterModule } from './common/modules/footer/footer.module';
import { CookieService } from 'ngx-cookie-service';
import { LanguageInterceptor } from './common/interceptors/languageInterceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    FooterModule,
    ProjectsDashboardModule,
    TestsDashboardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'es'
    })
  ],
  providers: [CookieService, {provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
