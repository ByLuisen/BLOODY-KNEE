import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Video } from 'src/app/models/Video';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Comment } from 'src/app/models/Comment';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  commentsVisible: boolean = true;
  descriptionVisible: boolean = false;
  videoId!: number;
  video!: Video;
  destacados: Video[] = [];
  videosAleatorios: Video[] = [];
  modalOpen: boolean = false;
  modalOpen2: boolean = false;
  role!: string;
  comentariosToShow: Comment[] = [];
  loading: boolean = false;
  batchSize: number = 5;
  comments: Comment[] = [];
  videoUrl!: SafeResourceUrl;
  editingCommentId: number | null = null;
  editedCommentText: string = '';
  commentInputValue: string = ''; // Propiedad para almacenar el valor del campo de entrada
  isCommentInputEmpty: boolean = true; // Propiedad para controlar si el campo de entrada está vacío
  currentUser: User | null = null;
  @ViewChild('commentInput') commentInput!: ElementRef;
  constructor(
    private elementRef: ElementRef,
    private http: HttpService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public auth: AuthService
  ) {
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
  ngOnInit() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://player.vimeo.com/video/942272495?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
    );
    this.loadButtons();
    this.route.params.subscribe((params) => {
      this.videoId = +params['videoId'];
      this.getVideo();
      this.getDestacados();
      this.getCommentsByVideoId(this.videoId);
    });
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
    if (this.loading || this.comentariosToShow.length === this.comments.length)
      return;

    this.loading = true;

    setTimeout(() => {
      const startIndex = this.comentariosToShow.length;
      const endIndex = startIndex + this.batchSize;
      const newComments = this.comments.slice(startIndex, endIndex);
      this.comentariosToShow = this.comentariosToShow.concat(newComments);
      this.loading = false;
    }, 1000);
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
        this.loadInitialComments();
      },
      (error) => {
        console.error('Error al obtener comentarios:', error);
      }
    );
  }

  addComment(comment: string): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.http.addComment(this.videoId, comment).subscribe(
          () => {
            console.log('Comentario agregado correctamente');
            // Actualizar la lista de comentarios después de agregar uno nuevo
            this.getCommentsByVideoId(this.videoId);
            this.countAndUpdateComments(this.videoId); // Llamar a la función countAndUpdateComments
            this.commentInput.nativeElement.value = '';
            // También podrías mostrar un mensaje de éxito o realizar otras acciones necesarias
          },
          (error) => {
            console.error('Error al agregar comentario:', error);
            // Manejar el error, mostrar un mensaje de error, o realizar otras acciones según sea necesario
          }
        );
      } else {
        console.log('El usuario debe estar autenticado para agregar un comentario.');
        this.auth.loginWithRedirect();
        // Aquí podrías mostrar un mensaje al usuario indicando que necesita iniciar sesión para agregar un comentario
      }
    });
  }

  toggleDescription() {
    this.descriptionVisible = !this.descriptionVisible;
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
    }); this.auth.user$.subscribe((user) => {
      if (user) {
        this.currentUser = user; // Almacena la información del usuario autenticado
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
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.video.url
        );
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
    if (video.exclusive && this.role != 'Standard' && this.role != 'Premium') {
      this.openModal();
      // Abre el modal si el video es premium y el usuario no tiene un rol premium
    } else {
      this.router.navigate(['/player', video.id]);
      // Navega al componente de reproductor si el usuario tiene permiso para ver el video
    }
  }

  deleteComment(commentId: number): void {
    this.http.deleteComment(commentId).subscribe(
      () => {
        console.log('Comentario eliminado correctamente');
        this.getCommentsByVideoId(this.videoId);
        this.countAndUpdateComments(this.videoId); // Llamar a la función countAndUpdateComments
      },
      (error) => {
        console.error('Error al eliminar el comentario', error);
        // Manejar el error, mostrar un mensaje de error, o realizar otras acciones según sea necesario
      }
    );
  }
  startEditingComment(commentId: number, commentText: string): void {
    // Establece el ID del comentario y el texto editado en las propiedades correspondientes
    this.editingCommentId = commentId;
    this.editedCommentText = commentText;
  }

  saveEditedComment(commentId: number, editedText: string): void {
    this.http.editComment(commentId, editedText).subscribe(
      () => {
        console.log('Comentario editado correctamente');
        // Update the comment locally in the comments list
        const editedCommentIndex = this.comments.findIndex(comment => comment.id === commentId);
        if (editedCommentIndex !== -1) {
          this.comments[editedCommentIndex].comment = editedText;
        }
        this.editingCommentId = null; // To stop editing after saving changes
        this.countAndUpdateComments(this.videoId); // Llamar a la función countAndUpdateComments
      },
      (error) => {
        console.error('Error al editar el comentario:', error);
        // Handle the error, display an error message, or take other necessary actions
      }
    );
  }
  updateCommentInputState(): void {
    this.isCommentInputEmpty = this.commentInputValue.trim() === '';
  }

  countAndUpdateComments(videoId: number): void {
    this.http.countAndUpdateComments(videoId).subscribe(
      () => {
        console.log('Conteo de comentarios actualizado correctamente');
        // Aquí puedes realizar otras acciones después de actualizar el conteo de comentarios, si es necesario
      },
      (error) => {
        console.error('Error al contar y actualizar comentarios:', error);
        // Manejar el error, mostrar un mensaje de error, o realizar otras acciones según sea necesario
      }
    );
  }

}
