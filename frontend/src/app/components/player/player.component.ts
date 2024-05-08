import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Comment } from 'src/app/models/Comment';
import {SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  constructor(private elementRef: ElementRef, private http: HttpService, public sanitizer: DomSanitizer, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private router: Router, public auth: AuthService) { }
  commentsVisible: boolean = true;
  descriptionVisible: boolean = false;
  videoId!: number;
  video!: Video;
  destacados: Video[] = [];
  videosAleatorios: Video[] = [];
  modalOpen: boolean = false;
  modalOpen2: boolean = false;
  role!: string;
  comentariosToShow: any[] = [];
  loading: boolean = false;
  batchSize: number = 5;
  comments: Comment[] = [];
  videoUrl!: SafeResourceUrl;

  ngOnInit() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/942272495?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479');
    this.loadButtons();
    this.loadInitialComments();
    this.route.params.subscribe((params) => {
      this.videoId = +params['videoId'];
      this.getVideo();
      this.getDestacados();
      this.countAndUpdateComments(this.videoId);
      this.getCommentsByVideoId(this.videoId);
    });
    

  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  getCommentsByVideoId(videoId: number): void {
    this.http.getCommentById(videoId).subscribe(
      (comments: Comment[]) => {
        console.log('Comentarios obtenidos:', comments);
        // Aquí puedes manejar los comentarios obtenidos, por ejemplo, asignarlos a una propiedad del componente
        this.comments = comments;
      },
      (error) => {
        console.error('Error al obtener comentarios:', error);
      }
    );
  }

  countAndUpdateComments(videoId: number): void {
    this.http.countAndUpdateComments(videoId).subscribe(
      () => {
        console.log('Comentarios contados y actualizados correctamente');
      },
      (error) => {
        console.error('Error al contar y actualizar comentarios:', error);
      }
    );
  }


  toggleDescription() {
    this.descriptionVisible = !this.descriptionVisible;
  }

  loadInitialComments() {
    this.comentariosToShow = this.comments.slice(0, this.batchSize);
  }
  onScroll(event: any) {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadMoreComments();
    }
  }

  loadMoreComments() {
    if (this.loading || this.comentariosToShow.length === this.comments.length) return;

    this.loading = true;

    setTimeout(() => {
      const startIndex = this.comentariosToShow.length;
      const endIndex = startIndex + this.batchSize;
      const newComments = this.comments.slice(startIndex, endIndex);
      this.comentariosToShow = this.comentariosToShow.concat(newComments);
      this.loading = false;
    }, 1000);
  }

  loadButtons() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.setupButtons();
        this.setupCommentButtons();
      }
    });
  }

  islogged() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
      } else {
        this.likeOpenModal();
      }
    });
  }

  likeVideo(videoId: number): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.http.updateLikes(videoId).subscribe(
          (response) => {
            console.log('Like actualizado correctamente', response);
          },
          (error) => {
            console.error('Error al actualizar like', error);
          }
        );
      } else {
        console.log(
          'El usuario debe estar autenticado para dar me gusta al video.'
        );
      }
    });
  }

  dislikeVideo(videoId: number): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.http.updateDislikes(videoId).subscribe(
          (response) => {
            console.log('Dislike actualizado correctamente', response);
          },
          (error) => {
            console.error('Error al actualizar dislike', error);
          }
        );
      } else {
        console.log(
          'El usuario debe estar autenticado para dar no me gusta al video.'
        );
      }
    });
  }

  getVideo(): void {
    this.http.getVideoById(this.videoId).subscribe(
      (video) => {
        console.log('Video obtenido:', video);
        this.video = video;
        this.cdr.detectChanges();
        // this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
      },
      (error) => {
        console.error('Error al obtener el video:', error);
      }
    );
  }

  getDestacados(): void {
    this.http.getVideos().subscribe(
      (videos) => {
        console.log('Videos destacados obtenidos:', videos);
        this.destacados = videos;
        this.videosAleatorios = this.getRandomVideos(this.destacados, 7);
      },
      (error) => {
        console.error('Error al obtener los videos destacados:', error);
      }
    );
  }

  getRandomVideos(array: Video[], count: number): Video[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  setupButtons() {
    const likeButton =
      this.elementRef.nativeElement.querySelector('.like-button');
    const dislikeButton =
      this.elementRef.nativeElement.querySelector('.dislike-button');

    if (likeButton) {
      likeButton.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        likeButton.classList.toggle('active');
        likeButton.classList.add('animated');
        dislikeButton?.classList.remove('active', 'animated');
      });
    }

    if (dislikeButton) {
      dislikeButton.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        dislikeButton.classList.toggle('active');
        dislikeButton.classList.add('animated');
        likeButton?.classList.remove('active', 'animated');
      });
    }
  }

  setupCommentButtons() {
    const likeComments: NodeListOf<HTMLElement> =
      this.elementRef.nativeElement.querySelectorAll('.like-comment');
    const dislikeComments: NodeListOf<HTMLElement> =
      this.elementRef.nativeElement.querySelectorAll('.dislike-comment');

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
  }

  plusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

  likeOpenModal() {
    this.modalOpen2 = true;
    document.body.classList.add('modal-open');
    // Agrega una clase para evitar el scroll del body
  }

  // Método para cerrar el modal
  likeCloseModal() {
    this.modalOpen2 = false;
    document.body.classList.remove('modal-open');
    // Remueve la clase que evita el scroll del body
  }

  getExclusive(video: Video) {
    if (video.exclusive && this.role != 'standard' && this.role != 'premium') {
      this.openModal();
      // Abre el modal si el video es premium y el usuario no tiene un rol premium
    } else {
      this.router.navigate(['/player', video.id]);
      // Navega al componente de reproductor si el usuario tiene permiso para ver el video
    }
  }
}
