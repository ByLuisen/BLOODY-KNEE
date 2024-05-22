import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, of, switchMap, tap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-boxingvideos',
  templateUrl: './boxingvideos.component.html',
  styleUrls: ['./boxingvideos.component.css'],
})
export class BoxingvideosComponent implements OnInit {
  // Array to hold all videos
  todos: Video[] = [];
  // Arrays to hold videos of different modalities
  videosSaco: Video[] = [];
  videosPareja: Video[] = [];
  videosConEquipamiento: Video[] = [];
  videosSinEquipamiento: Video[] = [];
  editingVideo: Video | null = null;
  loading: boolean = false;

  // Admin mode variable
  adminModeActivated: boolean = false;

  filteredItems: Video[] = [];
  // Default selected type
  selectedType: string = 'Todos';
  // Flag to control modal visibility
  modalOpen: boolean = false;
  role!: string;

  // Edit form
  editForm: FormGroup;

  constructor(private http: HttpService, private router: Router, private auth: AuthService) {
    this.editForm = new FormGroup({
      title: new FormControl('', Validators.required),
      coach: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
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
  /**
   *
   */
  ngOnInit(): void {
    // this.http.getRole().subscribe((data) => {
    //   this.role = data[0].name;
    //   console.log(this.role)
    // })

    // Set loading flag to true
    this.loading = true;

    // Fetch videos for each modality
    this.http
      .getVideosModality(1, 1)
      .pipe(
        switchMap((videos) => {

          this.videosSaco = videos;
          this.todos = this.todos.concat(videos);
          this.filteredItems = [...this.todos];

          // Return the fetched videos
          return of(videos);
        }),
        switchMap(() => {
          return this.http.getVideosModality(1, 2);
        }),
        tap((videos) => {
          this.videosPareja = videos;
          this.todos = this.todos.concat(videos);
          this.filteredItems = [...this.todos];
          return of(videos);
        }),
        switchMap(() => {
          return this.http.getVideosModality(1, 3);
        }),
        tap((videos) => {
          this.videosConEquipamiento = videos;
          this.todos = this.todos.concat(videos);
          this.filteredItems = [...this.todos];
          return of(videos);
        }),
        switchMap(() => {
          return this.http.getVideosModality(1, 4);
        }),
        tap((videos) => {
          this.videosSinEquipamiento = videos;
          this.todos = this.todos.concat(videos);
          this.filteredItems = [...this.todos];
          return videos;
        }),
       
        // Set loading flag to false after all requests are completed
        finalize(() => (this.loading = false))
      )
   
      // Subscribe to the observable
      .subscribe();

  }

  /**
   * Toggle admin mode
   */
  toggleAdminMode() {
    this.adminModeActivated = !this.adminModeActivated;
  }

  /**
   * Open modal dialog
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

  /**
   * Handle change in filtered items
   * @param filteredItems The filtered video items
   */
  onFilteredItemsChanged(filteredItems: Video[]) {
    this.filteredItems = filteredItems;
  }

  /**
  * Edit a video
  * @param video The video to edit
  */
  editVideo(video: Video) {
    // Assign the video to editingVideo property
    this.editingVideo = video;
    console.log('Editando video:', video);

    // Set the edit form values with the video data
    this.editForm!.setValue({
      title: video.title,
      coach: video.coach,
      description: video.description,
    });
  }

  /**
   * Close edit modal
   */
  closeEditModal() {
    this.editingVideo = null;
  }

  /**
   * Submit edit form
   */
  submitEditForm() {
    if (this.editingVideo && this.editForm) {
      // Update video data with form values
      this.editingVideo.title = this.editForm.value.title;
      this.editingVideo.coach = this.editForm.value.coach;
      this.editingVideo.description = this.editForm.value.description;

      // Send HTTP request to edit the video
      this.http.editVideo(this.editingVideo).subscribe(
        (updatedVideo) => {
          console.log('Video edited successfully:', updatedVideo);
          // Close the modal after saving changes
          this.closeEditModal();
        },
        (error) => {
          console.error('Error editing video:', error);
        }
      );
    }
  }

  /**
   * Delete a video
   * @param video The video to delete
   */
  deleteVideo(video: Video) {
    // Implement logic to delete the video
    console.log('Eliminando video:', video);

    this.http.deleteVideo(video.id).subscribe(
      () => {
        console.log('Video eliminado exitosamente');
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
   * Filter videos by type
   * @param type The type of videos to filter
   */
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
}
