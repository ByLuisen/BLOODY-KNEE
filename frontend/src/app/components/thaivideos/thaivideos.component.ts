import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-thaivideos',
  templateUrl: './thaivideos.component.html',
  styleUrls: ['./thaivideos.component.css']
})
export class ThaivideosComponent implements OnInit {

  items = [
    { image: '../../../assets/img/sacothai.png', title: 'Entreno con saco #1.', category: 'saco', premium: true },
    { image: '../../../assets/img/sacothai.png', title: 'Entreno con saco #2.', category: 'saco', premium: false },
    { image: '../../../assets/img/sacothai.png', title: 'Entreno con saco #3.', category: 'saco', premium: true }
  ];

  items2 = [
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #1.', category: 'pareja', premium: false },
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #2.', category: 'pareja', premium: true },
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #3.', category: 'pareja', premium: false },
  ];

  items3 = [
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #1.', category: 'con-equipamiento', premium: false },
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #2.', category: 'con-equipamiento', premium: true },
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #3.', category: 'con-equipamiento', premium: false },
  ];

  items4 = [
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #1.', category: 'sin-equipamiento', premium: true },
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #2.', category: 'sin-equipamiento', premium: false },
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #3.', category: 'sin-equipamiento', premium: true },
  ];

  // Variable para almacenar los elementos filtrados
  filteredItems!: any[];

  // Variable para almacenar la categoría seleccionada
  selectedCategory: string = '';

  // Variable para almacenar si el usuario está logueado
  loged: boolean = false;

  // Variable para almacenar el rol del usuario
  role: string = "premium";

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    // Llamar a la función de filtrado al inicializar el componente para mostrar todos los elementos por defecto
    this.filterItems('todos');

    // Verifica si el usuario está logeado obteniendo el token del almacenamiento local
    const token = localStorage.getItem('token');
    if (token) {
      this.loged = true;
    }
    // // Si el usuario no está registrado redirige al login
    // if (!this.loged) {
    //   // TODO: Redirigir al login pero de verdad
    //   this.router.navigate(['dev-yyzuj3kafug18e38.eu.auth0.com/u/login/identifier']);
    // }

    // Obtengo el rol del usuario TODO: descomentar
    // this.role = this.http.getRole();

  }

  // Función para manejar la selección de un video
  selectVideo(item: any) {
    // Si el video es premium y el usuario no tiene un rol premium
    if (item.premium && this.role !== 'premium') {
      // Redirige al usuario al componente de pricing
      this.router.navigate(['/pricing']);
    } else {
      // Si el usuario tiene permiso para ver el video, navega al componente de reproductor
      this.router.navigate(['/player']);
    }
  }

  // Agrupar elementos por categoría
  get groupedItems() {
    return [
      this.items,
      this.items2,
      this.items3,
      this.items4
    ];
  }

  // Función para obtener el título basado en la categoría
  getTitle(category: string) {
    return category.toUpperCase();
  }

  // Implementar la lógica para filtrar los elementos y actualizar la categoría seleccionada
  filterItems(category: string) {
    this.selectedCategory = category;
    switch (category) {
      case 'todos':
        this.filteredItems = [...this.items, ...this.items2, ...this.items3, ...this.items4];
        break;
      case 'saco':
        this.filteredItems = this.items;
        break;
      case 'pareja':
        this.filteredItems = this.items2;
        break;
      case 'con-equipamiento':
        this.filteredItems = this.items3;
        break;
      case 'sin-equipamiento':
        this.filteredItems = this.items4;
        break;
      default:
        this.filteredItems = [];
        break;
    }
  }
}
