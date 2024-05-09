import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) { }

  destacados: Video[] = [];
  videosAleatorios: Video[] = [];
  modalOpen: boolean = false;
  role: string = "basic";
  ngOnInit() {
    this.getDestacados();
  }
  getDestacados(): void {
    this.http.getVideos().subscribe(
      (videos) => {
        console.log('Videos destacados obtenidos:', videos);
        this.destacados = videos;
        this.videosAleatorios = this.getRandomVideos(this.destacados, 6);
      },
      (error) => {
        console.error('Error al obtener los videos destacados:', error);
      }
    );
  }

  getRandomVideos(array: Video[], count: number): Video[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  openModal() {
    this.modalOpen = true;
    document.body.classList.add('modal-open');
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalOpen = false;
    document.body.classList.remove('modal-open');
  }

  selectVideo(video: Video) {
    if (video.exclusive && this.role != "standard" && this.role != "premium") {
      this.openModal();
      // Abre el modal si el video es premium y el usuario no tiene un rol premium
    } else {
      this.router.navigate(['/player', video.id]);
      // Navega al componente de reproductor si el usuario tiene permiso para ver el video
    }
  }
}
