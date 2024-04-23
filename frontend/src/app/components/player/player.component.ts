import { Component, AfterViewInit, ElementRef,OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {

  constructor(private elementRef: ElementRef, private http: HttpService,public sanitizer: DomSanitizer, private route: ActivatedRoute,private cdr: ChangeDetectorRef) { }
  commentsVisible: boolean = true;
  descriptionVisible: boolean = false;
  videoId!: number;
  selectedVideo: Video | null = null;
  safeUrl: SafeResourceUrl | null = null;
  videos: Video[]=[];
  destacados: Video[]=[];
  videosAleatorios: Video[] = [];

  toggleDescription() {
    this.descriptionVisible = !this.descriptionVisible;
  }

  ngOnInit() {
    this.setupButtons();

    this.route.params.subscribe(params => {
        this.videoId = +params['videoId'];
        this.getVideo();
        this.getDestacados();
    });
}


likeVideo(videoId: number): void {
  this.http.updateLikes(videoId).subscribe(
    response => {
      console.log('Like actualizado correctamente', response);
    },
    error => {
      console.error('Error al actualizar like', error);
    }
  );
}

dislikeVideo(videoId: number): void {
  this.http.updateDislikes(videoId).subscribe(
    response => {
      console.log('Dislike actualizado correctamente', response);
    },
    error => {
      console.error('Error al actualizar dislike', error);
    }
  );
}





  getVideo(): void {
    this.http.getVideoById(this.videoId).subscribe(
      (videos) => {
        console.log("Video obtenido:", videos);
        this.videos = videos;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      (error) => {
        console.error("Error al obtener el video:", error);
      }
    );
  }

  getDestacados(): void {
    this.http.getVideos().subscribe(
      (videos) => {
        console.log("Videos destacados obtenidos:", videos);
        this.destacados = videos;
          // Obtener 5 videos aleatorios
          this.videosAleatorios = this.getRandomVideos(this.destacados, 7);
      },
      (error) => {
        console.error("Error al obtener los videos destacados:", error);
      }
    );
  }

  getRandomVideos(array: Video[], count: number): Video[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }


  selectVideo(video: Video): void {
    this.selectedVideo = video;
    const url = this.selectedVideo ? this.selectedVideo.url : '';
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  



  setupButtons() {
    const likeButton = this.elementRef.nativeElement.querySelector('.like-button');
    const dislikeButton = this.elementRef.nativeElement.querySelector('.dislike-button');

    if (likeButton) {
      likeButton.addEventListener('click', (e: PointerEvent) => {
        e.preventDefault();
        likeButton.classList.toggle('active');
        likeButton.classList.add('animated');
        dislikeButton?.classList.remove('active', 'animated');
        this.generateClones(likeButton);
      });
    }

    if (dislikeButton) {
      dislikeButton.addEventListener('click', (e: PointerEvent) => {
        e.preventDefault();
        dislikeButton.classList.toggle('active');
        dislikeButton.classList.add('animated');
        likeButton?.classList.remove('active', 'animated');
        this.generateClones(dislikeButton);
      });
    }

    this.setupCommentButtons();
  }

  setupCommentButtons() {
    const likeComments: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.like-comment');
    const dislikeComments: NodeListOf<HTMLElement> = this.elementRef.nativeElement.querySelectorAll('.dislike-comment');

    likeComments.forEach((likeComment) => {
      likeComment.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        this.toggleLikeState(likeComment);
      });
    });

    dislikeComments.forEach((dislikeComment) => {
      dislikeComment.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        this.toggleDislikeState(dislikeComment);
      });
    });
  }

  toggleComments() {
    this.commentsVisible = !this.commentsVisible;
    if (this.commentsVisible) {
      this.setupCommentButtons();
    }
  }

  resetAnimation(button: HTMLElement) {
    button.querySelectorAll('svg').forEach((svg) => {
      button.removeChild(svg);
    });
    button.classList.remove('animated', 'active');
  }

  toggleLikeState(comment: HTMLElement) {
    comment.classList.toggle('active');
    comment.classList.add('animated');
    const container = comment.parentElement;
    if (container) {
      const dislikeComment = container.querySelector('.dislike-comment');
      if (dislikeComment) {
        dislikeComment.classList.remove('active', 'animated');
      }
    }
    this.generateClones(comment);
  }

  toggleDislikeState(comment: HTMLElement) {
    comment.classList.toggle('active');
    comment.classList.add('animated');
    const container = comment.parentElement;
    if (container) {
      const likeComment = container.querySelector('.like-comment');
      if (likeComment) {
        likeComment.classList.remove('active', 'animated');
      }
    }
    this.generateClones(comment);
  }

  generateClones(button: HTMLElement) {
    let clones = this.randomInt(2, 4);
    const svgElement = button.querySelector('svg');
    if (svgElement) {
      for (let it = 1; it <= clones; it++) {
        let clone = svgElement.cloneNode(true) as HTMLElement,
          size = this.randomInt(5, 16);
        button.appendChild(clone);
        clone.setAttribute('width', size.toString());
        clone.setAttribute('height', size.toString());
        clone.style.position = 'absolute';
        clone.style.transition =
          'transform 0.5s cubic-bezier(0.12, 0.74, 0.58, 0.99) 0.3s, opacity 1s ease-out .5s';
        let animTimeout = setTimeout(() => {
          clearTimeout(animTimeout);
          clone.style.transform =
            'translate3d(' +
            this.plusOrMinus() * this.randomInt(10, 25) +
            'px,' +
            this.plusOrMinus() * this.randomInt(10, 25) +
            'px,0)';
          clone.style.opacity = '0';
        }, 1);
        let removeNodeTimeout = setTimeout(() => {
          if (clone.parentNode) {
            clone.parentNode.removeChild(clone);
          }
          clearTimeout(removeNodeTimeout);
        }, 900);
        let removeClassTimeout = setTimeout(() => {
          button.classList.remove('animated');
        }, 600);
      }
    } else {
      console.error('No se encontró ningún elemento SVG dentro del botón.');
    }
  }

  plusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  comentarios = [
    { texto: 'Ay amiga que guapo es el entrenador' },
    { texto: 'Joel te odio mucho nunca te rindas' },
    { texto: 'Ostia no he visto nada de nada ayuda' },
    { texto: 'Me ha ayudado mucho a mejorar ahora nadie me para' },
    { texto: 'El entrenador va un poco fumadete pero se le ve majo' },
  ];
}
