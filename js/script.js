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
// AI CHAT MODAL
// ===============================================
function openModal() {
  const modal = document.getElementById('aiModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on input
    setTimeout(() => {
      const input = document.getElementById('userInput');
      input?.focus();
    }, 300);
  }
}

function closeModal() {
  const modal = document.getElementById('aiModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Close modal on outside click
window.addEventListener('click', (event) => {
  const modal = document.getElementById('aiModal');
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ===============================================
// AI CHAT FUNCTIONALITY
// ===============================================
const aiResponses = {
  // Приветствия
  'привет': 'Здравствуйте! Рад вас видеть! Чем могу помочь? Интересуют дома, бани или оформление земли?',
  'здравствуйте': 'Добрый день! Я ИИ-консультант компании «Дом на юге». Расскажите, что вас интересует?',
  'добрый день': 'Здравствуйте! Готов ответить на ваши вопросы о каркасных домах и наших услугах.',
  
  // Цены
  'цена': 'Наши цены:\n• А-фрейм: от 1.6 млн ₽ (26 м²)\n• Барнхаус: от 2.5 млн ₽ (60 м²)\n• Бани-бочки: от 350 тыс ₽\n• Купели: от 180 тыс ₽\n\nХотите узнать подробнее о конкретном проекте?',
  'стоимость': 'Стоимость зависит от модели и комплектации. А-фреймы от 1.6 млн ₽, барнхаусы от 2.5 млн ₽. Могу рассказать подробнее!',
  'сколько стоит': 'Всё зависит от ваших потребностей! Расскажите, что именно вас интересует — дом, баня или участок?',
  
  // А-фрейм
  'а-фрейм': 'А-фрейм дома — это компактные треугольные дома, идеальные для отдыха или сдачи в аренду.\n\nМодели:\n• Мини (26 м²) — 1.6 млн ₽\n• Стандарт (45 м²) — 2.1 млн ₽\n• Макс (51 м²) — 2.2 млн ₽\n\nСобираются за 5-7 дней!',
  'треугольный': 'Вы про А-фрейм дома? Это отличный выбор! Треугольная форма обеспечивает устойчивость и создаёт уникальный уютный интерьер. Цены от 1.6 млн ₽.',
  
  // Барнхаус
  'барнхаус': 'Барнхаус — просторные дома в скандинавском стиле для постоянного проживания.\n\nМодели:\n• S (60 м²) — 2.5 млн ₽\n• M (90 м²) — 3.2 млн ₽\n• L (130 м²) — 4.5 млн ₽\n\nБольшие окна, открытые пространства, энергоэффективность.',
  
  // Модульные дома
  'модульн': 'Модульные дома — готовые модули, собираемые на заводе!\n\nМодели:\n• Studio 24 (24 м²) — 1.45 млн ₽\n• Comfort 36 (36 м²) — 1.95 млн ₽\n• Family 54 (54 м²) — 2.75 млн ₽\n\nСборка за 1 день! Полная заводская готовность: электрика, отделка, сантехника.',
  'модуль': 'Модульные дома — это полностью готовое жильё с завода. Устанавливаются за 1 день! Внутри уже есть электрика, отделка и сантехника. Цены от 1.45 млн ₽.',
  
  // Бани
  'баня': 'У нас есть бани-бочки из сибирского кедра:\n• 2 м (2-3 чел.) — 350 тыс ₽\n• 4 м (4-6 чел.) — 480 тыс ₽\n• 6 м (6-8 чел.) — 650 тыс ₽\n\nДоставка и установка за 1 день!',
  'сауна': 'Интересуют бани? У нас бани-бочки из натурального кедра от 350 тыс ₽. Готовы к использованию сразу после установки!',
  
  // Купели
  'купель': 'Наши купели:\n• Дровяная (Ø 1.5 м) — 180 тыс ₽\n• С гидромассажем (Ø 1.8 м) — 320 тыс ₽\n• Японская офуро — 250 тыс ₽\n\nВсе из натурального кедра или лиственницы.',
  
  // Земля
  'участок': 'Помогаем с подбором и оформлением земли в Краснодарском крае и Адыгее.\n\nУслуги:\n• Подбор участка — от 15 000 ₽\n• Юридическая проверка — от 10 000 ₽\n• Сопровождение сделки — от 25 000 ₽',
  'земля': 'Нужен участок? Работаем по всему ЮФО: Горячий Ключ, Геленджик, Анапа, Красная Поляна, Апшеронский район. Поможем найти и оформить!',
  
  // Сроки
  'срок': 'Сроки строительства:\n• Сборка на участке: 5-7 дней\n• Полный цикл от заказа до заселения: 30-45 дней\n• Бани и купели: доставка и установка за 1 день',
  'сколько времени': 'Дом собирается на участке за 5-7 дней. С учётом производства — готов за 30-45 дней. Бани устанавливаем за 1 день!',
  
  // Гарантия
  'гарантия': 'Даём гарантию:\n• На дома: 5 лет на конструктив, 2 года на отделку\n• На бани и купели: 3 года\n• Бесплатное гарантийное обслуживание',
  
  // Контакты
  'телефон': 'Наш телефон: +7 (989) 232-11-77\nЗвоните ежедневно с 9:00 до 20:00!\n\nТакже можете написать в WhatsApp или Telegram.',
  'контакт': 'Связаться с нами:\n📞 +7 (989) 232-11-77\n✉️ info@domnayuge.ru\n💬 WhatsApp: wa.me/79892321177\n\nОтветим на все вопросы!',
  'позвонить': 'Звоните нам: +7 (989) 232-11-77! Работаем ежедневно с 9:00 до 20:00. Или оставьте заявку на сайте — перезвоним в течение часа.',
  
  // Локация
  'где': 'Мы находимся в Краснодарском крае, г. Горячий Ключ. Строим по всему ЮФО: Краснодарский край, Адыгея, Ростовская область. Доставка по всей России!',
  'регион': 'Основной регион — юг России: Краснодарский край, Адыгея, Ростовская область. Но доставим дом в любую точку страны!',
  
  // Материалы
  'материал': 'Используем качественные материалы:\n• Каркас: клеёный брус, LVL-брус\n• Утепление: 200-250 мм\n• Древесина: сибирский кедр, алтайская лиственница\n• Окна: двухкамерные ПВХ или панорамные',
  'из чего': 'Наши дома из клеёного бруса с утеплением 200-250 мм. Бани и купели — из сибирского кедра и лиственницы. Всё экологично и долговечно!',
  
  // Default
  'default': 'Спасибо за вопрос! Для подробной консультации рекомендую:\n\n📞 Позвонить: +7 (989) 232-11-77\n✉️ Написать: info@domnayuge.ru\n\nИли оставьте заявку на сайте — мы перезвоним!'
};

function getAIResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check for keywords in the message
  for (const [keyword, response] of Object.entries(aiResponses)) {
    if (keyword !== 'default' && lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return aiResponses['default'];
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const chat = document.getElementById('chatBox');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'user-message';
  userMsgDiv.innerHTML = `
    <span class="message-avatar">👤</span>
    <div class="message-content">${escapeHtml(message)}</div>
  `;
  chat.appendChild(userMsgDiv);
  
  // Clear input
  input.value = '';
  
  // Scroll to bottom
  chat.scrollTop = chat.scrollHeight;
  
  // Show typing indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-message typing';
  typingDiv.innerHTML = `
    <span class="message-avatar">🤖</span>
    <div class="message-content">Печатаю...</div>
  `;
  chat.appendChild(typingDiv);
  chat.scrollTop = chat.scrollHeight;
  
  // Simulate AI response with delay
  setTimeout(() => {
    // Remove typing indicator
    typingDiv.remove();
    
    // Get AI response
    const response = getAIResponse(message);
    
    // Add AI message
    const aiMsgDiv = document.createElement('div');
    aiMsgDiv.className = 'ai-message';
    aiMsgDiv.innerHTML = `
      <span class="message-avatar">🤖</span>
      <div class="message-content">${response.replace(/\n/g, '<br>')}</div>
    `;
    chat.appendChild(aiMsgDiv);
    
    // Scroll to bottom
    chat.scrollTop = chat.scrollHeight;
  }, 1000 + Math.random() * 1000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

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
  modular: 0
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
    
    sliderWrapper.addEventListener('mouseenter', () => {
      if (slideIntervals[sliderId]) clearInterval(slideIntervals[sliderId]);
      const slides = sliderTrack.querySelectorAll('.slide');
      slideIntervals[sliderId] = setInterval(() => {
        changeSlide(sliderId, 1);
      }, 2000);
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
function openImageModal(imageSrc) {
  // Create modal if it doesn't exist
  let modal = document.getElementById('imageModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="image-modal-content">
        <span class="image-modal-close">&times;</span>
        <img src="" alt="Увеличенное изображение" class="image-modal-img">
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close on click outside or close button
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('image-modal-close')) {
        closeImageModal();
      }
    });
  }
  
  const img = modal.querySelector('.image-modal-img');
  img.src = imageSrc;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeImageModal();
  }
});

// ===============================================
// LOAD PRODUCTS FROM JSON (отключено - используем статические карточки)
// ===============================================
// Функция отключена, чтобы не перезаписывать статические карточки на главной странице
// Для админ-панели используется отдельный скрипт в admin.html

