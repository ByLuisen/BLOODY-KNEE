import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private http: HttpService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public auth: AuthService
  ) {}
  commentsVisible: boolean = true;
  descriptionVisible: boolean = false;
  videoId!: number;
  selectedVideo: Video | null = null;
  safeUrl: SafeResourceUrl | null = null;
  videos: Video[] = [];
  destacados: Video[] = [];
  videosAleatorios: Video[] = [];
  modalOpen: boolean = false;
  modalOpen2: boolean = false;
  role!: string;
  // "Paginate" comentarios
  comentariosToShow: any[] = [];
  loading: boolean = false;
  batchSize: number = 5;

  toggleDescription() {
    this.descriptionVisible = !this.descriptionVisible;
  }

  ngOnInit() {
    this.loadButtons();
    this.loadInitialComments();
    this.route.params.subscribe((params) => {
      this.videoId = +params['videoId'];
      this.getVideo();
      this.getDestacados();
    });
  }

  loadInitialComments() {
    this.comentariosToShow = this.comentarios.slice(0, this.batchSize);
  }
  onScroll(event: any) {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadMoreComments();
    }
  }

  loadMoreComments() {
    if (this.loading || this.comentariosToShow.length === this.comentarios.length) return;

    this.loading = true;

    setTimeout(() => {
      const startIndex = this.comentariosToShow.length;
      const endIndex = startIndex + this.batchSize;
      const newComments = this.comentarios.slice(startIndex, endIndex);
      this.comentariosToShow = this.comentariosToShow.concat(newComments);
      this.loading = false;
    }, 1000);
  }

  saveVideo(videoId: number): void {}

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
      (videos) => {
        console.log('Video obtenido:', videos);
        this.videos = videos;
        this.cdr.detectChanges();
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

  selectVideo(video: Video): void {
    this.selectedVideo = video;
    const url = this.selectedVideo ? this.selectedVideo.url : '';
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
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

  comentarios = [
    { texto: 'La energía de hoy fue increíble, gracias a todos!' },
    { texto: '¿Soy el único que termina exhausto después de las sesiones?' },
    { texto: 'Cada día me siento más fuerte, este entrenamiento es lo máximo' },
    { texto: '¿Alguien tiene tips para recuperarse más rápido?' },
    { texto: 'El entrenador siempre tiene la mejor actitud, me inspira mucho' },
    { texto: 'Nunca pensé que podría hacer tanto en tan poco tiempo' },
    { texto: 'Chicos, ¿qué comen antes de entrenar para tener tanta energía?' },
    { texto: 'Definitivamente me estoy volviendo adicto a estas clases' },
    { texto: '¿El entrenador siempre es tan exigente o solo es conmigo?' },
    { texto: '¡Vamos equipo, podemos superar cualquier desafío!' },
    { texto: 'Al principio dudaba, pero ahora estoy viendo los resultados' },
    { texto: 'Me encantaría que hubiera más clases por semana' },
    { texto: 'Es mi tercer mes y sigo sintiendo que cada día es un nuevo reto' },
    { texto: '¡Ese ejercicio nuevo de hoy estuvo brutal!' },
    { texto: 'Siento que este grupo se ha convertido en mi segunda familia' },
    { texto: '¡Qué risa hoy con los errores que cometimos todos!' },
    { texto: 'A veces me pregunto cómo el entrenador tiene tanta paciencia' },
    { texto: 'Ojalá hubiera empezado a entrenar aquí mucho antes' },
    { texto: '¿Alguien más siente que ha mejorado su vida en general?' },
    { texto: 'Cada vez que pienso en rendirme, veo al resto y me motivo' },
    { texto: 'Después de cada sesión me siento como nuevo, ¡es mágico!' },
    { texto: 'El entrenador dijo que estoy progresando bien, ¡estoy tan feliz!' },
    { texto: 'Necesito consejos para mantenerme motivado los días difíciles' },
    { texto: 'Agradecido por encontrar un grupo tan bueno y un entrenador excepcional' },
    { texto: '¿Quién más está sintiendo esos músculos que no sabía que tenía?' },
    { texto: 'Creo que todos deberíamos salir a celebrar nuestros progresos' },
    { texto: 'El entrenador me ayudó a superar un bloqueo mental, increíble' },
    { texto: '¡Hoy me superé a mí mismo y logré un nuevo récord personal!' },
    { texto: 'A veces me cuesta seguir el ritmo, pero no me voy a rendir' },
    { texto: '¡La clase de hoy fue fuego puro, quemé tantas calorías!' }
  ];
}
