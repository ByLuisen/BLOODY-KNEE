import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fitnessvideo',
  templateUrl: './fitnessvideo.component.html',
  styleUrls: ['./fitnessvideo.component.css'],
})
export class FitnessvideoComponent implements OnInit {
  // Arreglo para almacenar los videos
  todos: Video[] = [];
  videosConEquipamiento: Video[] = [];
  videosSinEquipamiento: Video[] = [];
  filteredItems: Video[] = [];
  selectedType: string = 'Todos';
  modalOpen: boolean = false;
  role: string = "admin";

  // Admin mode variable
  adminModeActivated: boolean = false;


  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    // this.http.getRole().subscribe((data) => {
    //   this.role = data[0].name;
    //   console.log(this.role)

    // })
    this.http.getVideosModality(3, 3).subscribe((videos) => {
      this.videosConEquipamiento = videos;
      this.todos = this.todos.concat(videos);
      this.filteredItems = [...this.todos];
    });
    this.http.getVideosModality(3, 4).subscribe((videos) => {
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
    if (video.exclusive && this.role != 'standard' && this.role != 'premium') {
      this.openModal();
      // Abre el modal si el video es premium y el usuario no tiene un rol premium
    } else {
      this.router.navigate(['/player', video.id]);
      // Navega al componente de reproductor si el usuario tiene permiso para ver el video
    }
  }
  // Método que se ejecutará cuando cambien los elementos filtrados
  onFilteredItemsChanged(filteredItems: Video[]) {
    this.filteredItems = filteredItems;
  }

  filterVideos(type: string) {
    this.selectedType = type;

    switch (type) {
      case 'Todos':
        this.filteredItems = this.todos;
        break;
      case 'ConEquipamiento':
        this.filteredItems = this.videosConEquipamiento;
        break;
      case 'SinEquipamiento':
        this.filteredItems = this.videosSinEquipamiento;
        break;
      default:
        this.filteredItems = this.todos;
    }
  }

  // Método para activar o desactivar el modo admin
  toggleAdminMode() {
    this.adminModeActivated = !this.adminModeActivated;
  }
  editVideo(video: Video) {
    // Aquí implementa la lógica para editar el video
    console.log("Editando video:", video);
  }

  deleteVideo(video: Video) {
    // Aquí implementa la lógica para eliminar el video
    console.log("Eliminando video:", video);
  }
}
