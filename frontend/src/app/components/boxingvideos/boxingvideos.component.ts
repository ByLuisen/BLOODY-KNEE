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
  // Array to hold all videos
  todos: Video[] = [];
  // Arrays to hold videos of different modalities
  videosSaco: Video[] = [];
  videosPareja: Video[] = [];
  videosConEquipamiento: Video[] = [];
  videosSinEquipamiento: Video[] = [];
  // Array to hold filtered videos
  filteredItems: Video[] = [];
  // Default selected type
  selectedType: string = 'Todos';
  // Flag to control modal visibility
  modalOpen: boolean = false;
  role: string = "admin";

  constructor(private http: HttpService, private router: Router) { }

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

  // Open modal method
  openModal() {
    this.modalOpen = true;
    document.body.classList.add('modal-open');
  }

  // Close modal method
  closeModal() {
    this.modalOpen = false;
    document.body.classList.remove('modal-open');
  }

  // Method to select a video
  selectVideo(video: Video) {
    // Check if video is exclusive and user role permits access
    if (video.exclusive && this.role != "standard" && this.role != "premium") {
      // Open modal if access is restricted
      this.openModal();
    } else {
      // Navigate to video player if access is permitted
      this.router.navigate(['/player', video.id]);
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
