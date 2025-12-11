/**
 * ДОМ на ЮГЕ - Main JavaScript
 * Modern interactive functionality
 */

// ===============================================
// MOBILE MENU
// ===============================================
function toggleMenu() {
  const menu = document.getElementById('menu');
  const hamburger = document.getElementById('hamburger');
  
  menu.classList.toggle('active');
  hamburger.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const menu = document.getElementById('menu');
  const hamburger = document.getElementById('hamburger');
  
  if (menu && menu.classList.contains('active')) {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      menu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Close menu on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const menu = document.getElementById('menu');
    const hamburger = document.getElementById('hamburger');
    
    if (menu) {
      menu.classList.remove('active');
      hamburger?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// ===============================================
// NAVBAR SCROLL EFFECT
// ===============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class for styling
  if (currentScroll > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===============================================
// MODAL (for "Оставить заявку" buttons)
// ===============================================
function openModal() {
  // Open catalog modal instead
  openCatalogModal();
}

function closeModal() {
  // Close catalog modal instead
  closeCatalogModal();
}

// ===============================================
// CATALOG MODAL
// ===============================================
function openCatalogModal() {
  const modal = document.getElementById('catalogModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeCatalogModal() {
  const modal = document.getElementById('catalogModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Close catalog modal on outside click
window.addEventListener('click', (event) => {
  const modal = document.getElementById('catalogModal');
  if (event.target === modal) {
    closeCatalogModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCatalogModal();
  }
});


// ===============================================
// FORM HANDLING
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.contact-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      
      // Show success message
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      button.textContent = 'Отправлено! ✓';
      button.disabled = true;
      button.style.background = '#4ade80';
      
      // Reset after 3 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.background = '';
        form.reset();
      }, 3000);
      
      // Here you would normally send the data to a server
      console.log('Form submitted:', Object.fromEntries(formData));
    });
  });
});

// ===============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===============================================
// LAZY LOADING IMAGES
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// ===============================================
// PHONE NUMBER FORMATTING
// ===============================================
document.querySelectorAll('input[type="tel"]').forEach(input => {
  input.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (value[0] === '8') {
        value = '7' + value.slice(1);
      }
      if (value[0] !== '7') {
        value = '7' + value;
      }
      
      let formatted = '+7';
      if (value.length > 1) formatted += ' (' + value.slice(1, 4);
      if (value.length > 4) formatted += ') ' + value.slice(4, 7);
      if (value.length > 7) formatted += '-' + value.slice(7, 9);
      if (value.length > 9) formatted += '-' + value.slice(9, 11);
      
      e.target.value = formatted;
    }
  });
});

// ===============================================
// ANIMATE ON SCROLL ENHANCEMENT
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
  // Add stagger animation to grid items
  const grids = document.querySelectorAll('.features-grid, .products-grid, .models-grid');
  
  grids.forEach(grid => {
    const items = grid.children;
    Array.from(items).forEach((item, index) => {
      if (!item.hasAttribute('data-aos-delay')) {
        item.setAttribute('data-aos-delay', (index * 100).toString());
      }
    });
  });
});

// ===============================================
// PROJECT TABS
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Here you could add filtering logic if needed
    });
  });
});

// ===============================================
// COOKIE CONSENT
// ===============================================
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  hideCookieBanner();
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  hideCookieBanner();
}

function hideCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (banner) {
    banner.style.animation = 'none';
    banner.style.transform = 'translateY(100%)';
    banner.style.transition = 'transform 0.3s ease';
    setTimeout(() => {
      banner.classList.add('hidden');
    }, 300);
  }
}

function checkCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');
  if (consent) {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
      banner.classList.add('hidden');
      banner.style.animation = 'none';
    }
  }
}

// Check cookie consent on page load
document.addEventListener('DOMContentLoaded', checkCookieConsent);

// ===============================================
// CONSOLE EASTER EGG
// ===============================================
console.log(`
%c🏠 ДОМ на ЮГЕ
%cСовременные каркасные дома

📞 +7 (989) 232-11-77
🌐 domnayuge.ru

Мы строим дома мечты! 🏡
`, 
'font-size: 24px; font-weight: bold; color: #d4a853;',
'font-size: 14px; color: #a1a1aa;'
);

// ===============================================
// IMAGE SLIDER FUNCTIONALITY
// ===============================================
let currentSlide = {
  aframe: 0,
  barnhouse: 0,
  sauna: 0,
  modular: 0,
  studio: 0,
  comfort: 0,
  family: 0,
  barn: 0,
  'g-shaped': 0,
  z: 0,
  single: 0,
  cub: 0,
  modern: 0,
  scandinavian: 0,
  corner: 0
};
let slideIntervals = {};

function changeSlide(sliderId, direction) {
  const slider = document.getElementById('slider-' + sliderId);
  if (!slider) return;
  const dots = slider.parentElement.querySelectorAll('.dot');
  const slides = slider.querySelectorAll('.slide');
  
  currentSlide[sliderId] += direction;
  
  if (currentSlide[sliderId] < 0) {
    currentSlide[sliderId] = slides.length - 1;
  } else if (currentSlide[sliderId] >= slides.length) {
    currentSlide[sliderId] = 0;
  }
  
  slider.className = 'slider-track active-slide-' + currentSlide[sliderId];
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide[sliderId]);
  });
}

function goToSlide(sliderId, index) {
  const slider = document.getElementById('slider-' + sliderId);
  if (!slider) return;
  const dots = slider.parentElement.querySelectorAll('.dot');
  
  currentSlide[sliderId] = index;
  slider.className = 'slider-track active-slide-' + currentSlide[sliderId];
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Auto-play on hover
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-image-slider').forEach(sliderWrapper => {
    const sliderTrack = sliderWrapper.querySelector('.slider-track');
    if (!sliderTrack) return;

    const sliderId = sliderTrack.id.replace('slider-', '');

    // Инициализация currentSlide если его нет
    if (currentSlide[sliderId] === undefined) {
      currentSlide[sliderId] = 0;
    }

    // Убеждаемся, что слайдер показывает первое фото
    sliderTrack.className = 'slider-track active-slide-0';

    sliderWrapper.addEventListener('mouseenter', () => {
      if (slideIntervals[sliderId]) clearInterval(slideIntervals[sliderId]);
      const slides = sliderTrack.querySelectorAll('.slide');
      if (slides.length > 1) { // Only auto-play if there's more than one slide
        // Для карточек бань - более медленная прокрутка (4 секунды)
        const isSaunaCard = sliderWrapper.closest('.saunas-grid') !== null;
        const interval = isSaunaCard ? 4000 : 2000;
        slideIntervals[sliderId] = setInterval(() => {
          changeSlide(sliderId, 1);
        }, interval);
      }
    });

    sliderWrapper.addEventListener('mouseleave', () => {
      if (slideIntervals[sliderId]) clearInterval(slideIntervals[sliderId]);
      currentSlide[sliderId] = 0;
      sliderTrack.className = 'slider-track active-slide-0';
      const dots = sliderWrapper.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
      });
    });
  });
});

// ===============================================
// IMAGE MODAL FUNCTIONALITY
// ===============================================
// Глобальные переменные для модального окна
let modalImageIndex = 0;
let modalImages = [];
let modalKeyboardHandler = null;

function openImageModal(imageSrc, clickedElement) {
  // Находим кликнутое изображение
  let clickedImg = clickedElement;
  
  // Если clickedElement не передан, пытаемся найти через event
  if (!clickedImg) {
    clickedImg = window.event?.target || (typeof event !== 'undefined' ? event.target : null);
  }
  
  // Если нашли изображение, используем его
  if (clickedImg && clickedImg.tagName === 'IMG') {
    const slider = clickedImg.closest('.slider-track');
    if (slider) {
      openImageModalWithSlider(clickedImg.src, slider.id || null);
      return;
    }
  }
  
  // Если event не доступен, ищем изображение по src
  const img = document.querySelector(`img[src*="${imageSrc.split('/').pop()}"]`);
  if (img) {
    const slider = img.closest('.slider-track');
    openImageModalWithSlider(img.src, slider?.id || null);
    return;
  }
  
  // Если ничего не найдено, открываем просто изображение
  openImageModalWithSlider(imageSrc, null);
}

function openImageModalWithSlider(imageSrc, sliderId) {
  // Собираем все изображения из слайдера
  if (sliderId) {
    const slider = document.getElementById(sliderId);
    if (slider) {
      const slides = slider.querySelectorAll('.slide img');
      modalImages = Array.from(slides).map(img => img.src);
      const imageName = imageSrc.split('/').pop();
      modalImageIndex = modalImages.findIndex(src => src.includes(imageName));
      if (modalImageIndex === -1) modalImageIndex = 0;
    } else {
      modalImages = [imageSrc];
      modalImageIndex = 0;
    }
  } else {
    // Ищем слайдер в родительском элементе
    const clickedImg = event?.target || document.querySelector(`img[src*="${imageSrc.split('/').pop()}"]`);
    if (clickedImg) {
      const slider = clickedImg.closest('.slider-track');
      if (slider) {
        const slides = slider.querySelectorAll('.slide img');
        modalImages = Array.from(slides).map(img => img.src);
        modalImageIndex = modalImages.findIndex(src => src === clickedImg.src);
        if (modalImageIndex === -1) modalImageIndex = 0;
      } else {
        modalImages = [imageSrc];
        modalImageIndex = 0;
      }
    } else {
      modalImages = [imageSrc];
      modalImageIndex = 0;
    }
  }

  // Создаем или обновляем модальное окно
  let modal = document.getElementById('imageModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    document.body.appendChild(modal);
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeImageModal();
      }
    });
  }
  
  modal.innerHTML = `
    <div class="image-modal-content" onclick="event.stopPropagation()">
      <button class="image-modal-close" onclick="closeImageModal()">×</button>
      ${modalImages.length > 1 ? `<button class="image-modal-prev" onclick="changeModalImage(-1)">‹</button>` : ''}
      <img id="modalImage" src="${modalImages[modalImageIndex]}" alt="Увеличенное изображение">
      ${modalImages.length > 1 ? `<button class="image-modal-next" onclick="changeModalImage(1)">›</button>` : ''}
      ${modalImages.length > 1 ? `<div class="image-modal-counter">${modalImageIndex + 1} / ${modalImages.length}</div>` : ''}
    </div>
  `;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Добавляем обработчик клавиатуры
  if (modalKeyboardHandler) {
    document.removeEventListener('keydown', modalKeyboardHandler);
  }
  modalKeyboardHandler = handleModalKeyboard;
  document.addEventListener('keydown', modalKeyboardHandler);
}

function changeModalImage(direction) {
  modalImageIndex += direction;
  
  if (modalImageIndex < 0) {
    modalImageIndex = modalImages.length - 1;
  } else if (modalImageIndex >= modalImages.length) {
    modalImageIndex = 0;
  }
  
  const modalImage = document.getElementById('modalImage');
  const counter = document.querySelector('.image-modal-counter');
  
  if (modalImage) {
    modalImage.src = modalImages[modalImageIndex];
  }
  
  if (counter) {
    counter.textContent = `${modalImageIndex + 1} / ${modalImages.length}`;
  }
}

function handleModalKeyboard(e) {
  const modal = document.getElementById('imageModal');
  if (modal && modal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') {
      changeModalImage(-1);
    } else if (e.key === 'ArrowRight') {
      changeModalImage(1);
    } else if (e.key === 'Escape') {
      closeImageModal();
    }
  }
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalImages = [];
    modalImageIndex = 0;
    if (modalKeyboardHandler) {
      document.removeEventListener('keydown', modalKeyboardHandler);
      modalKeyboardHandler = null;
    }
  }
}

// ===============================================
// LOAD PRODUCTS FROM JSON (отключено - используем статические карточки)
// ===============================================
// Функция отключена, чтобы не перезаписывать статические карточки на главной странице
// Для админ-панели используется отдельный скрипт в admin.html

