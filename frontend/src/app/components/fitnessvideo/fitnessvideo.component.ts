import { Component, OnInit} from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';

@Component({
  selector: 'app-fitnessvideo',
  templateUrl: './fitnessvideo.component.html',
  styleUrls: ['./fitnessvideo.component.css']
})
export class FitnessvideoComponent implements OnInit {
 // Arreglo para almacenar los videos
 todos: Video[] = [];
 videosConEquipamiento: Video[] = [];
 videosSinEquipamiento: Video[] = [];
 filteredItems: Video[] = [];
 selectedType: string = 'Todos';

 constructor(private http: HttpService) { }

 ngOnInit(): void {
   this.http.getVideosModality(3, 3).subscribe(videos => {
     this.videosConEquipamiento = videos;
     this.todos = this.todos.concat(videos);
     this.filteredItems = [...this.todos];
   });
   this.http.getVideosModality(3, 4).subscribe(videos => {
     this.videosSinEquipamiento = videos;
     this.todos = this.todos.concat(videos);
     this.filteredItems = [...this.todos];
   });

 }
}

