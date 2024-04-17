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
  videos: Video[] = [];

  filteredItems: any[] = [];
  selectedType: string = 'Todos';

  constructor(private http: HttpService) { }


  ngOnInit(): void {
    this.http.getVideosModality(2).subscribe(videos => {
      console.log('Datos recibidos del servicio HTTP:', videos);  
      this.videos = videos;
      this.filteredItems = [...this.videos];  // Inicialmente mostramos todos los videos
      console.log('Videos cargados:', this.videos);  
    });
  }
  


filterVideos(type: number): void {
  console.log('Tipo seleccionado:', type);
  console.log('Videos cargados:', this.videos);  // Imprime los videos cargados
  
  if (type === 0) {
    console.log('Mostrando todos los videos');
    this.filteredItems = [...this.videos];
  } else {
    this.filteredItems = this.videos.filter(video => {
      console.log('Video typeId:', video.typeId);  // Imprime el typeId del video
      return video.typeId === type;
    });
  }
  
  console.log('Videos filtrados:', this.filteredItems);  
}





}


