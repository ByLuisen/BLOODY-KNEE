import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { Router } from '@angular/router';
import { finalize, of, switchMap, tap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-thaivideos',
  templateUrl: './thaivideos.component.html',
  styleUrls: ['./thaivideos.component.css'],
})
export class ThaivideosComponent implements OnInit {
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
  searchTerm: string = '';
  // Admin mode variable
  adminModeActivated: boolean = false;
  loading: boolean = false;

  constructor(private http: HttpService, private router: Router, private auth: AuthService) {
    this.auth.isAuthenticated$.subscribe((isauth) => {
      if (isauth) {
        this.http.getRole().subscribe((role) => {
          console.log(role.data);
          this.role = role.data;
        });
      } else {
        this.role = 'Basic';
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.http
      .getVideosModality(2, 1)
      .pipe(
        switchMap((videos) => {
          this.videosSaco = videos;
          this.todos = this.todos.concat(videos);
          console.log('videosSaco:', this.videosSaco);
          console.log('todos:', this.todos);
          this.filteredItems = [...this.todos];
          return of(videos);
        }),
        switchMap(() => {
          return this.http.getVideosModality(2, 2);
        }),
        tap((videos) => {
          this.videosPareja = videos;
          this.todos = this.todos.concat(videos);
          console.log('videosPareja:', this.videosPareja);
          console.log('todos:', this.todos);
          this.filteredItems = [...this.todos];
          return of(videos);
        }),
        switchMap(() => {
          return this.http.getVideosModality(2, 3);
        }),
        tap((videos) => {
          this.videosConEquipamiento = videos;
          this.todos = this.todos.concat(videos);
          console.log('videosConEquipamiento:', this.videosConEquipamiento);
          console.log('todos:', this.todos);
          this.filteredItems = [...this.todos];
          return of(videos);
        }),
        switchMap(() => {
          return this.http.getVideosModality(2, 4);
        }),
        tap((videos) => {
          this.videosSinEquipamiento = videos;
          this.todos = this.todos.concat(videos);
          console.log('videosSinEquipamiento:', this.videosSinEquipamiento);
          console.log('todos:', this.todos);
          this.filteredItems = [...this.todos];
          return videos;
        }),
        finalize(() => {
          this.loading = false;
          console.log('Final todos:', this.todos);
        })
      )
      .subscribe();
  }

  openModal() {
    this.modalOpen = true;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.modalOpen = false;
    document.body.classList.remove('modal-open');
  }

  selectVideo(video: Video) {
    if (video.exclusive && this.role != 'Standard' && this.role != 'Premium') {
      this.openModal();
      // Abre el modal si el video es premium y el usuario no tiene un rol premium
    } else {
      this.router.navigate(['/player', video.id]);
      // Navega al componente de reproductor si el usuario tiene permiso para ver el video
    }
  }

  onFilteredItemsChanged(filteredItems: Video[]) {
    this.filteredItems = filteredItems;
  }

  filterVideos(type: string) {
    this.selectedType = type;

    switch (type) {
      case 'Todos':
        this.filteredItems = this.todos;
        break;
      case 'ConSaco':
        this.filteredItems = this.videosSaco;
        break;
      case 'ConPareja':
        this.filteredItems = this.videosPareja;
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

  toggleAdminMode() {
    this.adminModeActivated = !this.adminModeActivated;
  }

  editVideo(video: Video) {
    console.log('Editando video:', video);
  }

  deleteVideo(video: Video) {
    console.log('Eliminando video:', video);
  }
}
