import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thaivideos',
  templateUrl: './thaivideos.component.html',
  styleUrls: ['./thaivideos.component.css']
})
export class ThaivideosComponent implements OnInit {

  
  searchTerm: string = '';
  items = [
    { image: '../../../assets/img/sacothai.png', title: 'Entreno con saco #1.', category: 'saco' },
    { image: '../../../assets/img/sacothai.png', title: 'Entreno con saco #2.', category: 'saco' },
    { image: '../../../assets/img/sacothai.png', title: 'Entreno con saco #3.', category: 'saco' }
  ];

  items2 = [
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #1.', category: 'pareja' },
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #2.', category: 'pareja' },
    { image: '../../../assets/img/pareja.png', title: 'Entreno con pareja #3.', category: 'pareja' },
  ];

  items3 = [
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #1.', category: 'con-equipamiento' },
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #2.', category: 'con-equipamiento' },
    { image: '../../../assets/img/conequipamiento.png', title: 'Entreno con equipamiento #3.', category: 'con-equipamiento' },
  ];
  
  items4 = [
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #1.', category: 'sin-equipamiento' },
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #2.', category: 'sin-equipamiento' },
    { image: '../../../assets/img/sombrathai.png', title: 'Entreno sin equipamiento #3.', category: 'sin-equipamiento' },
  ];

  // Variable para almacenar los elementos filtrados
  filteredItems!: any[];

  // Variable para almacenar la categoría seleccionada
  selectedCategory: string = '';

  constructor() { }

  ngOnInit(): void {
    // Llamar a la función de filtrado al inicializar el componente para mostrar todos los elementos por defecto
    this.filterItems('todos');
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
