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
import { MatSliderModule } from '@angular/material/slider'; // Importa el módulo MatSliderModule




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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule,MatSliderModule],
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
