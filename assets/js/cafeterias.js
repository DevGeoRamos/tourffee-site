// ============================================================================
// CAFETERIAS MODULE - Search, Filter and Display functionality
// ============================================================================

class CafeteriasApp {
  constructor() {
    this.cafeterias = [];
    this.filteredCafeterias = [];
    this.currentFilter = 'all';
    this.searchTerm = '';
    this.favorites = this.loadFavorites();
    
    this.init();
  }

  init() {
    this.initializeElements();
    this.bindEvents();
    this.loadCafeterias();
  }

  initializeElements() {
    this.searchInput = document.querySelector('.search-input');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.cafeteriasGrid = document.querySelector('.cafeterias__grid');
    this.loadingElement = document.querySelector('.cafeterias__loading');
    this.emptyElement = document.querySelector('.cafeterias__empty');
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', 
        this.debounce((e) => this.handleSearch(e.target.value), 300)
      );
    }

    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilter(e.target.dataset.filter));
    });

    // Handle favorite clicks with event delegation
    if (this.cafeteriasGrid) {
      this.cafeteriasGrid.addEventListener('click', (e) => {
        if (e.target.closest('.cafe-card__favorite')) {
          this.toggleFavorite(e.target.closest('.cafe-card'));
        }
      });
    }
  }

  async loadCafeterias() {
    try {
      this.showLoading(true);
      
      // Simulate API call - replace with actual data source
      await this.delay(1000);
      
      this.cafeterias = await this.fetchCafeteriasData();
      this.filteredCafeterias = [...this.cafeterias];
      
      this.renderCafeterias();
      this.showLoading(false);
    } catch (error) {
      console.error('Error loading cafeterias:', error);
      this.showError('Erro ao carregar cafeterias. Tente novamente.');
    }
  }

  async fetchCafeteriasData() {
    // Mock data - replace with actual API call
    return [
      {
        id: 'perseu-coffee',
        name: 'PERSEU COFFEE',
        description: 'Café, pratos de brunch e sanduíches servidos em um ambiente moderno com janelas grandes e estilo industrial.',
        image: 'https://vejasp.abril.com.br/wp-content/uploads/2018/09/perseu-coffee-house_ambiente-2.jpg?quality=70&strip=info&w=928&w=636',
        category: 'gourmet',
        rating: 4.5,
        tags: ['Moderno', 'Brunch', 'Industrial'],
        link: './pages/cafeterias/perseu-coffee.html'
      },
      {
        id: 'sao-luis-84',
        name: 'SÃO LUÍS 84',
        description: 'Cafeteria clássica no centro da cidade com ambiente aconchegante e café tradicional.',
        image: 'https://vejasp.abril.com.br/wp-content/uploads/2024/05/cafe3.png?w=720&h=440&crop=1',
        category: 'classica',
        rating: 4.3,
        tags: ['Tradicional', 'Centro', 'Aconchegante'],
        link: './pages/cafeterias/sao-luis.html'
      },
      {
        id: 'hello-kitty-cafe',
        name: 'HELLO KITTY CAFÉ',
        description: 'Cafeteria temática dedicada à Hello Kitty com decoração kawaii e bebidas especiais.',
        image: 'https://f.i.uol.com.br/fotografia/2023/03/24/1679689190641e05e65ce2d_1679689190_3x2_xl.jpg',
        category: 'tematica',
        rating: 4.7,
        tags: ['Temática', 'Kawaii', 'Instagram'],
        link: './pages/cafeterias/hello-kitty.html'
      },
      {
        id: 'we-coffee',
        name: 'WE COFFEE',
        description: 'Cafeteria moderna com opções de delivery e foco em café especial.',
        image: 'https://blog.pixpel.com.br/wp-content/uploads/2023/08/delivery-de-cafe-vale-a-pena-1.jpg',
        category: 'delivery',
        rating: 4.2,
        tags: ['Delivery', 'Café Especial', 'Moderno'],
        link: './pages/cafeterias/we-coffee.html'
      }
    ];
  }

  renderCafeterias() {
    if (!this.cafeteriasGrid) return;

    if (this.filteredCafeterias.length === 0) {
      this.showEmpty(true);
      return;
    }

    this.showEmpty(false);

    const html = this.filteredCafeterias.map(cafe => this.createCafeCard(cafe)).join('');
    this.cafeteriasGrid.innerHTML = html;

    // Trigger animation
    this.animateCards();
  }

  createCafeCard(cafe) {
    const isFavorite = this.favorites.includes(cafe.id);
    const stars = this.generateStars(cafe.rating);
    const tags = cafe.tags.map(tag => `<span class="cafe-card__tag">${tag}</span>`).join('');

    return `
      <article class="cafe-card" data-id="${cafe.id}" data-category="${cafe.category}">
        <div class="cafe-card__image-container">
          <img class="cafe-card__image" src="${cafe.image}" alt="${cafe.name}" loading="lazy">
          <div class="cafe-card__overlay"></div>
        </div>
        
        <div class="cafe-card__content">
          <h3 class="cafe-card__title">
            <a href="${cafe.link}" aria-label="Visitar página de ${cafe.name}">${cafe.name}</a>
          </h3>
          
          <div class="cafe-card__meta">
            <div class="cafe-card__rating">
              <span class="cafe-card__stars" aria-label="Avaliação ${cafe.rating} de 5 estrelas">${stars}</span>
              <span>${cafe.rating}</span>
            </div>
          </div>
          
          <p class="cafe-card__description">${cafe.description}</p>
          
          <div class="cafe-card__tags">
            ${tags}
          </div>
          
          <div class="cafe-card__actions">
            <a href="${cafe.link}" class="btn btn--primary cafe-card__link">
              Visitar
            </a>
            <button 
              class="cafe-card__favorite ${isFavorite ? 'cafe-card__favorite--active' : ''}"
              aria-label="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
              title="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }

    if (hasHalfStar) {
      stars += '☆';
    }

    // Fill remaining with empty stars up to 5
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars += '☆';
    }

    return stars;
  }

  animateCards() {
    const cards = this.cafeteriasGrid.querySelectorAll('.cafe-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  handleSearch(term) {
    this.searchTerm = term.toLowerCase();
    this.filterCafeterias();
  }

  handleFilter(filter) {
    this.currentFilter = filter;
    
    // Update active filter button
    this.filterButtons.forEach(btn => {
      btn.classList.toggle('filter-btn--active', btn.dataset.filter === filter);
    });
    
    this.filterCafeterias();
  }

  filterCafeterias() {
    this.filteredCafeterias = this.cafeterias.filter(cafe => {
      const matchesFilter = this.currentFilter === 'all' || cafe.category === this.currentFilter;
      const matchesSearch = this.searchTerm === '' || 
        cafe.name.toLowerCase().includes(this.searchTerm) ||
        cafe.description.toLowerCase().includes(this.searchTerm) ||
        cafe.tags.some(tag => tag.toLowerCase().includes(this.searchTerm));
      
      return matchesFilter && matchesSearch;
    });

    this.renderCafeterias();
  }

  toggleFavorite(cardElement) {
    const cafeId = cardElement.dataset.id;
    const favoriteBtn = cardElement.querySelector('.cafe-card__favorite');
    
    if (this.favorites.includes(cafeId)) {
      this.favorites = this.favorites.filter(id => id !== cafeId);
      favoriteBtn.classList.remove('cafe-card__favorite--active');
      favoriteBtn.setAttribute('aria-label', 'Adicionar aos favoritos');
      favoriteBtn.setAttribute('title', 'Adicionar aos favoritos');
    } else {
      this.favorites.push(cafeId);
      favoriteBtn.classList.add('cafe-card__favorite--active');
      favoriteBtn.setAttribute('aria-label', 'Remover dos favoritos');
      favoriteBtn.setAttribute('title', 'Remover dos favoritos');
    }
    
    this.saveFavorites();
  }

  loadFavorites() {
    try {
      return JSON.parse(localStorage.getItem('tourffee-favorites') || '[]');
    } catch {
      return [];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem('tourffee-favorites', JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  showLoading(show) {
    if (this.loadingElement) {
      this.loadingElement.style.display = show ? 'block' : 'none';
    }
    if (this.cafeteriasGrid) {
      this.cafeteriasGrid.style.display = show ? 'none' : 'grid';
    }
  }

  showEmpty(show) {
    if (this.emptyElement) {
      this.emptyElement.style.display = show ? 'block' : 'none';
    }
  }

  showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'cafeterias__error';
    errorElement.innerHTML = `
      <h3>Ops! Algo deu errado</h3>
      <p>${message}</p>
      <button class="btn btn--primary" onclick="window.location.reload()">
        Tentar novamente
      </button>
    `;
    
    if (this.cafeteriasGrid) {
      this.cafeteriasGrid.parentNode.insertBefore(errorElement, this.cafeteriasGrid);
    }
    
    this.showLoading(false);
  }

  // Utility methods
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if cafeterias grid exists
  if (document.querySelector('.cafeterias__grid')) {
    new CafeteriasApp();
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CafeteriasApp;
}
