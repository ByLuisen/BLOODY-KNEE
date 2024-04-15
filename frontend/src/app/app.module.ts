import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MenuMovileComponent } from './components/menu-movile/menu-movile.component';
import { DietsComponent } from './components/diets/diets.component';
import { MenuComponent } from './components/menu/menu.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ThaivideosComponent } from './components/thaivideos/thaivideos.component';
import { BoxingvideosComponent } from './components/boxingvideos/boxingvideos.component';
import { FitnessvideoComponent } from './components/fitnessvideo/fitnessvideo.component';
import { PlayerComponent } from './components/player/player.component';
import { MerchandisingComponent } from './components/merchandising/merchandising.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PricingComponent } from './components/pricing/pricing.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    MenuMovileComponent,
    DietsComponent,
    MenuComponent,
    UserProfileComponent,
    ThaivideosComponent,
    BoxingvideosComponent,
    FitnessvideoComponent,
    PlayerComponent,
    MerchandisingComponent,
    PricingComponent,
    ChatbotComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule, HttpClientModule],


  providers: [
    provideAuth0({
      domain: 'dev-yyzuj3kafug18e38.eu.auth0.com',
      clientId: 'QOiV3m6kyD74336XSGU49LOcfiktUp2T',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
