import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { provideAuth0 } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NotFoundComponent,
    AuthButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideAuth0({
      domain: 'dev-yyzuj3kafug18e38.eu.auth0.com',
      clientId: 'QOiV3m6kyD74336XSGU49LOcfiktUp2T',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
