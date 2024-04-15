import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DietsComponent } from './components/diets/diets.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ThaivideosComponent } from './components/thaivideos/thaivideos.component';
import { BoxingvideosComponent } from './components/boxingvideos/boxingvideos.component';
import { FitnessvideoComponent } from './components/fitnessvideo/fitnessvideo.component';
import { PlayerComponent } from './components/player/player.component';
import { MerchandisingComponent } from './components/merchandising/merchandising.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'diets', component: DietsComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'thaivideos', component: ThaivideosComponent },
  { path: 'boxingvideos', component: BoxingvideosComponent },
  { path: 'fitnessvideos', component: FitnessvideoComponent },
  { path: 'player', component: PlayerComponent},
  {path:'merchandising',component:MerchandisingComponent},
  {path:'chatbot',component:ChatbotComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
