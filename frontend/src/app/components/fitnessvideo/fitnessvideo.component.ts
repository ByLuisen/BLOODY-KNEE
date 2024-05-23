import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { Router } from '@angular/router';
import { finalize, of, switchMap, tap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  loading: boolean = false;
  role!: string;
  editingVideo: Video | null = null;
  adminModeActivated: boolean = false;
  createModal: boolean = false;
  editModal: boolean = false;
  deleteModal: boolean = false;
  editedVideo: Video = new Video;
  selectedVideo: Video | null = null;
  editVideoForm!: FormGroup;

  /**
   *
   * @param http
   * @param router
   * @param auth
   */
  constructor(
    private http: HttpService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.http.getRole().subscribe((response) => {
      this.role = response
    });
    this.http
      .getVideosModality(3, 3)
      .pipe(
        switchMap((videos) => {
          this.videosConEquipamiento = videos;
          this.todos = this.todos.concat(videos);
          this.filteredItems = [...this.todos];

          return of(videos);
        }),
        switchMap(() => {
          return this.http.getVideosModality(3, 4);
        }),
        tap((videos) => {
          if (videos) {
            this.videosSinEquipamiento = videos;
            this.todos = this.todos.concat(videos);
            this.filteredItems = [...this.todos];
          }
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
    // Inicializa el formulario de edición con las validaciones requeridas
    this.editVideoForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/),
        Validators.maxLength(20),
        Validators.minLength(7)
      ]), // Título requerido
      coach: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s]+$/),
        Validators.minLength(5),
        Validators.maxLength(150)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1000)
      ]),
      url: new FormControl('', [
        Validators.required,
        Validators.minLength(35),
        Validators.pattern(/^https:\/\/player\.vimeo\.com\/video\/\d+(\?.*)?$/)
      ]),
      duration: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9:]+$/),
        Validators.maxLength(6)
      ]),
      exclusive: new FormControl('', []),
    });
  }


  // Método que se ejecutará cuando cambien los elementos filtrados
  onFilteredItemsChanged(filteredItems: Video[]) {
    this.filteredItems = filteredItems;
  }
  /**
   *
   * @param type
   */
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

  /**
   *
   */
  submitEditVideoForm() {
    // Actualizar editedVideo con los valores del formulario
    this.editedVideo.title = this.editVideoForm.get('title')?.value;
    this.editedVideo.coach = this.editVideoForm.get('coach')?.value;
    this.editedVideo.description = this.editVideoForm.get('description')?.value;
    this.editedVideo.url = this.editVideoForm.get('url')?.value;
    this.editedVideo.duration = this.editVideoForm.get('duration')?.value;
    this.editedVideo.exclusive = this.editVideoForm.get('exclusive')?.value;

    this.http.updateVideo(this.editedVideo.id, this.editedVideo).subscribe(
      (updatedVideo) => {
        //Actualizo el video en lista local
        const index = this.todos.findIndex(video => video.id === updatedVideo.id);
        if (index !== -1) {
          this.todos[index] = updatedVideo;
        }
        this.closeEditModal();
      },
      (error) => {
        console.error("Error al actualizar el Video:", error)
      }
    )
  }

  /**
   *
   */
  closeCreateModal() {
    if (this.createModal) {
      this.createModal = false;
    }
  }


  /**
   * Cancel delete operation
   */
  cancelDelete() {
    this.selectedVideo = null;
    this.deleteModal = false;
  }

  /**
   * Confirm delete operation
   */
  confirmDelete() {
    if (this.selectedVideo !== null) {
      this.http.destroyVideo(this.selectedVideo.id).subscribe(() => {
        this.todos = this.todos.filter(video => video.id !== this.selectedVideo?.id);
        this.selectedVideo = null;
        this.deleteModal = false;
      });
    }
  }

  /**
  * Busca el video que se seleccione por ID para mostrar el modal
  *
  * @param video
  */
  openDeleteModal(video: Video) {
    this.selectedVideo = video;
    this.deleteModal = true;
  }

  /**
   *
   * @param video
   */
  editVideo(videoId: number) {
    const selectedVideo = this.todos.find(video => video.id === videoId)
    if (selectedVideo) {
      this.editedVideo = selectedVideo;
      // Actualizar los valores del formulario con los valores de la dieta seleccionada
      this.editVideoForm.patchValue({
        title: selectedVideo.title,
        coach: selectedVideo.coach,
        description: selectedVideo.description,
        url: selectedVideo.url,
        duration: selectedVideo.duration,
        exclusive: selectedVideo.exclusive
      });
      this.editModal = true;
    }
  }

  /**
   * Clean editedVideo & close edit modal
   */
  closeEditModal() {
    // Limpia el video editado y cierra el modal
    this.editedVideo = new Video();
    this.editModal = false;
  }

  /**
   * Submit edit form
   */
  submitEditForm() {
    this.http.updateVideo(this.editedVideo.id, this.editedVideo).subscribe(
      (updatedVideo) => {
        //Actualizo el video en lista local
        const index = this.todos.findIndex(video => video.id === updatedVideo.id);
        if (index !== -1) {
          this.todos[index] = updatedVideo;
        }
        this.closeEditModal();
      },
      (error) => {
        console.error("Error al actualizar el Video:", error)
      }
    )
  }

  /**
   *
   */
  addVideo() {
    if (!this.createModal) {
      this.createModal = true;
    }
  }

  /**
   * Delete a video
   * @param video The video to delete
   */
  deleteVideo(video: Video) {
    // Implement logic to delete the video

    this.http.destroyVideo(video.id).subscribe(
      () => {
        // Remove the video from the local list if necessary
        this.filteredItems = this.filteredItems.filter(
          (item) => item.id !== video.id
        );
      },
      (error) => {
        console.error('Error deleting video:', error);
      }
    );
  }

  /**
* Toggle admin mode
*/
  toggleAdminMode() {
    this.adminModeActivated = !this.adminModeActivated;
  }

  /**
   * Open modal video premium
   */
  openModal() {
    this.modalOpen = true;
    document.body.classList.add('modal-open');
  }

  /**
   * Close modal dialog
   */
  closeModal() {
    this.modalOpen = false;
    document.body.classList.remove('modal-open');
  }

  /**
   * Select a video to play
   * @param video The selected video
   */
  selectVideo(video: Video) {
    // Check if video is exclusive and user role permits access
    if (video.exclusive && this.role != 'Standard' && this.role != 'Premium') {
      // Open modal if access is restricted
      this.openModal();
    } else {
      // Navigate to video player if access is permitted
      this.router.navigate(['/player', video.id]);
    }
  }

}
