import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';

@Component({
  selector: 'app-thaivideos',
  templateUrl: './thaivideos.component.html',
  styleUrls: ['./thaivideos.component.css']
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

  constructor(private http: HttpService) { }


  ngOnInit(): void {
    this.http.getVideosModality(2, 1).subscribe(videos => {
      this.videosSaco = videos;
      this.todos = this.todos.concat(videos);
      this.filteredItems = [...this.todos];
    });
    this.http.getVideosModality(2, 2).subscribe(videos => {
      this.videosPareja = videos;
      this.todos = this.todos.concat(videos);
      this.filteredItems = [...this.todos];
    });
    this.http.getVideosModality(2, 3).subscribe(videos => {
      this.videosConEquipamiento = videos;
      this.todos = this.todos.concat(videos);
      this.filteredItems = [...this.todos];
    });
    this.http.getVideosModality(2, 4).subscribe(videos => {
      this.videosSinEquipamiento = videos;
      this.todos = this.todos.concat(videos);
      this.filteredItems = [...this.todos];
    });

  }
}


