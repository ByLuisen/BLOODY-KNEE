import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MenuMovileComponent } from './components/menus/menu-movile/menu-movile.component';
import { DietsComponent } from './components/diets/diets.component';
import { MenuComponent } from './components/menus/menu/menu.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ThaivideosComponent } from './components/thaivideos/thaivideos.component';
import { PerfileMenuComponent } from './components/menus/profile-menu/profile-menu.component';
import { ProfileMenuService } from './services/profile-menu-service.service';
import { FavouriteVideosComponent } from './components/user-profile-views/favourite-videos/favourite-videos.component';
import { LikedVideosComponent} from './components/user-profile-views/liked-videos/liked-videos.component';
import { ProfileDietsComponent } from './components/user-profile-views/profile-diets/profile-diets.component';
import { ProfileOrdersComponent } from './components/user-profile-views/profile-orders/profile-orders.component';
import { DetalleMerchComponent } from './components/detalle-merch/detalle-merch.component';
import { BoxingvideosComponent } from './components/boxingvideos/boxingvideos.component';
import { FitnessvideoComponent } from './components/fitnessvideo/fitnessvideo.component';
import { PlayerComponent } from './components/player/player.component';
import { MerchandisingComponent } from './components/merchandising/merchandising.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PricingComponent } from './components/pricing/pricing.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { environment } from 'src/environments/environment.development';

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
    PerfileMenuComponent,
    LikedVideosComponent,
    ChatbotComponent,
    FavouriteVideosComponent,
    ProfileDietsComponent,
    ProfileOrdersComponent,
    DetalleMerchComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule, HttpClientModule],


  providers: [
    provideAuth0({
      domain: environment.domain,
      clientId: environment.SPAClientID,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    ProfileMenuService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
