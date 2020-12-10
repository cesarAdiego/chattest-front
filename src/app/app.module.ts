import { BrowserModule, Title } from '@angular/platform-browser';
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
import { LoadingScreenModule } from './features/loading-screen/loading-screen.module';
import { ErrorScreenModule } from './features/error-screen/error-screen.module';

import { RippleModule } from 'primeng/ripple';

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
    LoadingScreenModule,
    ErrorScreenModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'es'
    }),
    RippleModule
  ],
  providers: [CookieService, 
              {provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
