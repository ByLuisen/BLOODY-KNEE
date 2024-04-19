import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { Router } from '@angular/router';
@Component({
  selector: 'app-boxingvideos',
  templateUrl: './boxingvideos.component.html',
  styleUrls: ['./boxingvideos.component.css']
})
export class BoxingvideosComponent implements OnInit {
  // Arreglo para almacenar los videos
  todos: Video[] = [];
  videosSaco: Video[] = [];
  videosPareja: Video[] = [];
  videosConEquipamiento: Video[] = [];
  videosSinEquipamiento: Video[] = [];
  filteredItems: Video[] = [];
  selectedType: string = 'Todos';
  modalOpen: boolean = false;
  role!: string;
  constructor(private http: HttpService,private router: Router) { }

  ngOnInit(): void {
    this.http.getRole().subscribe((data) => {
      this.role = data[0].name;
      console.log(this.role)

    })
    this.http.getVideosModality(1, 1).subscribe(videos => {
      this.videosSaco = videos;
      this.todos = this.todos.concat(videos);
      this.filteredItems = [...this.todos];
    });
    this.http.getVideosModality(1, 2).subscribe(videos => {
      this.videosPareja = videos;
      this.todos = this.todos.concat(videos);
      this.filteredItems = [...this.todos];
    });
    this.http.getVideosModality(1, 3).subscribe(videos => {
      this.videosConEquipamiento = videos;
      this.todos = this.todos.concat(videos);
      this.filteredItems = [...this.todos];
    });
    this.http.getVideosModality(1, 4).subscribe(videos => {
      this.videosSinEquipamiento = videos;
      this.todos = this.todos.concat(videos);
      this.filteredItems = [...this.todos];
    });

  }

  openModal() {
    this.modalOpen = true;
    document.body.classList.add('modal-open');
    // Agrega una clase para evitar el scroll del body
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalOpen = false;
    document.body.classList.remove('modal-open');
    // Remueve la clase que evita el scroll del body
  }

  selectVideo(video: Video) {
    if (video.exclusive && this.role != "standard" && this.role != "premium" ) {
      this.openModal();
      // Abre el modal si el video es premium y el usuario no tiene un rol premium
    } else {
      this.router.navigate(['/player', video.id]);
      // Navega al componente de reproductor si el usuario tiene permiso para ver el video
    }
  }
}

