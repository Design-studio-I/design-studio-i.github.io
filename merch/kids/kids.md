---
layout: single
title: "Детский мир"
permalink: /merch/kids/
sidebar:
  nav: "merch_sidebar"
---

<style> 
  /* Фон всей страницы */
  body.layout--single {
    background-image: linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), 
                      url('{{ "/assets/images/bg/bg_cloud.jpg" | relative_url }}') !important;
    background-attachment: fixed !important;
    background-size: cover !important;
    background-position: center !important;
  }

  /* Убираем лишние белые фоны темы */
  #main, .page, .archive, .inner {
    background: transparent !important;
  }

/* --- ТВОИ ОРИГИНАЛЬНЫЕ СТИЛИ СЕТКИ --- */
.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 25px; 
    padding: 20px 0;
    background: transparent;
}

/* Адаптивность */
@media (max-width: 1080px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .product-grid { grid-template-columns: 1fr; } }

/* --- КАРТОЧКА (БАЗА СЛОЁВ) --- */
.product-card {
    position: relative;
    background-image: url('/assets/images/bg/bg_0002.jpg') !important;
    background-size: cover;
    padding: 15px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 320px;
    min-width: 220px;
    
    box-shadow: -2px -2px 15px rgba(0,0,0,0.3);
    transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    /* КРИТИЧЕСКОЕ: Управление слоями всей карточки */
    z-index: 1; /* Фон и основной контент */
    /* УБРАЛИ overflow: hidden, чтобы persistent уголок мог торчать */
}

/* ЭФФЕКТ ПОДПРЫГИВАНИЯ */
.product-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.4);
    z-index: 10;
}

/* ЦЕНТРОВКА ССЫЛКИ */
.product-card a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-decoration: none;
    width: 100%;
    z-index: 1; /* Под кармашком */
}

/* ФОТО ТОВАРА (Оригинал) */
.merch-img {
    width: 100%;
    height: 180px; 
    object-fit: cover;
    border-radius: 4px;
    border: 3px solid #fff;
    box-shadow: 0px 2px 6px rgba(0,0,0,0.6);
    margin-bottom: 15px;
}

/* ТЕКСТ ЗАГОЛОВКА */
.product-card-title {
    font-size: 0.85rem;
    font-weight: 800;
    text-transform: uppercase;
    color: #520;
    text-shadow: 1.5px 1.5px 2px #FFE4C4;
    margin-bottom: 10px;
}

/* --- КОНТЕЙНЕР ПЕРЕДНЕЙ СТЕНКИ КАРМАНА (ОБЪЕМ) --- */
.pocket-front {
    position: relative;
    width: 100%;
    margin-top: 5px;
    z-index: 4; /* СТОИТ ПОВЕРХ ВСЕГО, включая залетающую фотку */
    overflow: hidden; /* Маскирует въезжающую фотку */
    border-radius: 6px;
    box-shadow: 0 -7px 1px rgba(0,0,0,0.3); /* Эффект прорези сверху */
}

/* ПЕРЕДНЯЯ СТЕНКА (Мешковина) */
.price-patch {
    background-image: url('/assets/images/bg/bg_0002.jpg') !important;
    background-size: cover;
    padding: 15px 10px;
    text-align: center;
    
    /* Твой оригинальный теневой эффект (глубина) */
    box-shadow: inset 2 4 5px rgba(0,0,0,0.6);
    outline: 2px dashed #520; /* Цвет нити */
}

.product-card-price {
    font-size: 0.8rem;
    font-weight: 600;
    color: #006400;
    margin-bottom: 10px;
    text-shadow: 0.5px 0.5px 1px #00FF00;
}

/* КНОПКА */
.add-to-cart-btn-grid {
    background: #A0522D;
    color: #fd8;
    font-size: 0.6rem;
    border: none;
    padding: 5px;
    width: 90%;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 -1px 0 #520;
    transition: 0.3s;
}

.add-to-cart-btn-grid:hover {
    filter: brightness(1.2);
    transform: scale(1.03);
}

/* --- PERSISTENT УГОЛОК (ЗА КАРМАШКОМ) --- */
.pocket-stub {
    position: absolute;
    width: 70px;
    height: 70px;
    
    /* Позиция: торчит СВЕРХУ pocket-front */
    top: 265px; 
    right: 90px; 
    
    /* Белая рамка как у шеврона */
    border: 3px solid #fff; 
    border-radius: 4px;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.4); /* Тень вверх */
    transform: rotate(35deg); /* Закрученный уголок */
    
    /* Фото товара как текстура */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    
    /* КРИТИЧЕСКОЕ: Управление слоями */
    z-index: 3; /* Скрыт ЗА .pocket-front (z-index 4), но перед фоном (z-index 1) */
    
    display: none; /* Скрыт по умолчанию */
    transition: all 0.5s ease;
}

/* Когда товар в корзине - показываем торчащий уголок */
.product-card.in-cart .pocket-stub {
    display: block;
    animation: slideCornerOut 0.5s ease-out; /* Легкая анимация появления */
}

@keyframes slideCornerOut {
    0% { transform: translateY(10px) rotate(0deg); opacity: 0; }
    100% { transform: translateY(0) rotate(20deg); opacity: 1; }
}
</style>

<div class="product-grid">
  {% for item in site.data.merch.kids.merch %}
    <div class="product-card" data-id="{{ item.slug }}" data-img="{{ item.image }}">
      
      <div class="pocket-stub"></div>
      
      <a href="/merch/item/?id={{ item.slug }}&cat=kids" style="text-decoration: none; width: 100%;">
        <img src="{{ item.image }}" alt="{{ item.title }}" class="merch-img">
        <span class="product-card-title">{{ item.title }}</span>
      </a>

      <div class="pocket-front">
        <div class="price-patch">
          <div class="product-card-price">{{ item.price }} ₸</div>
          <button class="add-to-cart-btn-grid" 
                  onclick="buyItemDirectly('{{ item.slug }}', '{{ item.title }}', '{{ item.price }}', '{{ item.image }}', this)">
            В корзину
          </button>
        </div>
      </div>

    </div>
  {% endfor %}
</div>

<script>
// --- ЛОГИКА "НАВЕЧНО" И АНИМАЦИИ "ВЪЕЗЖАНИЯ ЗА" ---

// Функция восстановления уголков при загрузке
function restorePocketsState() {
    const cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    
    // Перебираем все карточки
    document.querySelectorAll('.product-card').forEach(card => {
        const itemId = card.dataset.id;
        // Если ID товара есть в корзине, добавляем класс .in-cart и выставляем картинку-уголок
        if (cart.some(item => item.id === itemId)) {
            card.classList.add('in-cart');
            const stub = card.querySelector('.pocket-stub');
            stub.style.backgroundImage = `url(${card.dataset.img})`;
        }
    });
}

// Утилита: Обновление счетчика generic в хедере
function updateCartBadge() {
    const badge = document.getElementById('cart-count-badge');
    if (!badge) return;
    
    let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    let total = cart.reduce((sum, item) => sum + (parseInt(item.qty) || 1), 0);
    
    if (total > 0) {
        badge.innerText = total;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

// Анимация полета "в кармашек" (Slowly и Въезжание за)
function flyToPocket(imgElement, pocketElementFront) {
    const badge = document.getElementById('cart-count-badge');
    if (!imgElement || !pocketElementFront || !badge) return;

    // Флаер-клон
    const flyer = imgElement.cloneNode();
    const rect = imgElement.getBoundingClientRect();
    const pocketRect = pocketElementFront.getBoundingClientRect();
    const card = imgElement.closest('.product-card');

    // Начало: поверх оригинальной фотки
    Object.assign(flyer.style, {
        position: 'fixed',
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        opacity: '1',
        zIndex: '2', // НИЖЕ .pocket-front (z-index 4), чтобы "въезжать за"
        transition: 'all 1.2s cubic-bezier(0.42, 0, 0.58, 1)', // Медленно
        pointerEvents: 'none',
        borderRadius: '4px',
        border: '3px solid #fff' // Рамка шеврона при полете
    });

    document.body.appendChild(flyer);

    // Цель: верхний край кармашка, уменьшаемся, сползаем ЗА НЕГО
    requestAnimationFrame(() => {
        Object.assign(flyer.style, {
            // Ведем к верхнему краю кармана, чуть вниз, чтобы сползла ЗА
            top: (pocketRect.top + 5) + 'px', 
            left: (pocketRect.left + pocketRect.width / 2 - 30) + 'px', // Центрируем
            width: '60px', // Уменьшаем до уголка
            height: '60px',
            transform: 'rotate(20deg)', // Закручиваем
            opacity: '0.4' // Наполовину сплывает
        });
    });

    setTimeout(() => {
        // Удаляем летающий флаер
        flyer.remove();
        
        // Показываем persistent уголок, который торчит ЗА кармашком
        const stub = card.querySelector('.pocket-stub');
        stub.style.backgroundImage = `url(${card.dataset.img})`;
        card.classList.add('in-cart');
        
        // Обновляем бейдж хедере generic
        updateCartBadge();
        badge.style.transform = 'scale(1.4)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);
    }, 1200); // Transition JS
}

// Главная функция покупки для витрины
function buyItemDirectly(id, name, price, image, btn) {
    buyItem(id, name, price, image, btn, 1);
}

// Основная логика покупки generic
function buyItem(id, name, price, image, btn, qty = 1) {
    let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    
    const existingIdx = cart.findIndex(item => item.id === id);
    if (existingIdx !== -1) {
        cart[existingIdx].qty = (parseInt(cart[existingIdx].qty) || 1) + qty;
    } else {
        cart.push({ id, name, price, image, qty: qty });
    }
    
    localStorage.setItem('my_merch_cart', JSON.stringify(cart));
    
    // Анимация полета
    const card = btn.closest('.product-card');
    const img = card.querySelector('.merch-img');
    const pocketFront = card.querySelector('.pocket-front'); // Целим в КОНТЕЙНЕР прорези
    
    if (img && pocketFront) flyToPocket(img, pocketFront);
    
    // Кнопка
    const originalText = btn.innerText;
    btn.innerText = "✓ В КАРМАНЕ";
    btn.style.background = "#27ae60";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "#A0522D";
    }, 1500);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', restorePocketsState);
</script>
