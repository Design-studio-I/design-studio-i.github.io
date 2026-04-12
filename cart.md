---
layout: single
title: "Это всё мне!"
permalink: /cart/
sidebar:
  nav: "main"
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
</style>
<div class="vintage-shop">
  <div class="call-bell-wrapper" onclick="ringBell()">
    <div class="bell-label">ПОЗВАТЬ ХОЗЯЙКУ</div>
    <div id="call-bell" class="call-bell">
      <div class="bell-top"></div>
      <div class="bell-base"></div>
    </div>
  </div>

  <div id="cart-container" class="cart-wrapper">
    <div id="cart-loading" style="text-align: center; padding: 50px;">
      <h2 class="vintage-title">Заглядываем в корзинку...</h2>
    </div>
  </div>
</div>

<div id="packaging-overlay" class="packaging-overlay">
  <div class="package-container">
    <div class="branded-bag">
      <div class="bag-logo">🧵<br>HANDMADE</div>
    </div>
    <div class="packing-text">Упаковываем ваш заказ в крафт-пакет...</div>
  </div>
</div>

<style>
  /* --- ПРИЛАВОК --- */
  .vintage-shop {
    #background-image: url('/assets/images/bg/bg_0002.jpg') !important; /* Твоя мешковина */
    background-size: cover;
    padding: 40px 20px;
    border-radius: 15px;
    box-shadow: inset 0 0 50px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3);
    position: relative;
    min-height: 600px;
  }

  .vintage-title {
    color: #520;
    text-transform: uppercase;
    text-shadow: 1px 1px 0 #fd8;
    font-family: serif;
  }

  /* --- ЗВОНОЧЕК (Call Bell) --- */
  .call-bell-wrapper {
    position: absolute;
    top: 20px;
    right: 30px;
    text-align: center;
    cursor: pointer;
    z-index: 10;
  }
  .bell-label {
    font-size: 0.7rem;
    font-weight: bold;
    color: #520;
    margin-bottom: 5px;
    letter-spacing: 1px;
  }
  .call-bell {
    width: 60px;
    height: 45px;
    position: relative;
    transition: transform 0.1s;
  }
  .bell-top {
    width: 50px;
    height: 30px;
    background: radial-gradient(circle at 30% 30%, #ffd700, #b8860b);
    border-radius: 25px 25px 5px 5px;
    margin: 0 auto;
    border: 1px solid rgba(0,0,0,0.2);
    position: relative;
  }
  .bell-top::after {
    content: '';
    position: absolute;
    top: -5px; left: 50%;
    transform: translateX(-50%);
    width: 12px; height: 6px;
    background: #8b4513;
    border-radius: 3px;
  }
  .bell-base {
    width: 60px;
    height: 8px;
    background: #333;
    border-radius: 4px;
    margin-top: -2px;
  }
  .ring-animation {
    animation: bell-ring 0.1s infinite;
  }
  @keyframes bell-ring {
    0% { transform: rotate(0); }
    25% { transform: rotate(5deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0); }
  }

  /* --- КВИТАНЦИИ (Товары) --- */
  .cart-item {
    background: #fffef0; /* Цвет старой бумаги */
    margin-bottom: 15px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 2px 5px 15px rgba(0,0,0,0.2);
    border-left: 5px solid #A0522D;
    transform: rotate(-0.5deg);
    position: relative;
  }
  .cart-item:nth-child(even) { transform: rotate(0.5deg); }
  
  /* Имитация булавки */
  .cart-item::before {
    content: '';
    position: absolute;
    top: 5px; left: 50%;
    width: 10px; height: 10px;
    background: #999;
    border-radius: 50%;
    box-shadow: inset -2px -2px 3px rgba(0,0,0,0.5);
  }

  .cart-item img { width: 70px; height: 70px; object-fit: cover; border: 2px solid #520; }
  .cart-item-info h3 { margin: 0; color: #520; font-size: 1.1rem; }
  .cart-item-total { color: #006400; font-weight: 900; }

  /* --- ИТОГО --- */
  .cart-summary {
    background: rgba(85, 34, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    border: 2px dashed #520;
    margin-top: 30px;
  }

  .checkout-btn {
    background: #A0522D;
    color: #fd8;
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    box-shadow: 0 5px 0 #520;
  }
  .checkout-btn:hover { filter: brightness(1.2); }

  /* --- АНИМАЦИЯ ПАКЕТА --- */
  .packaging-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.85);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    color: #fff;
  }
  .package-container { text-align: center; }
  .branded-bag {
    width: 150px;
    height: 180px;
    background: #d2b48c; /* Крафт бумага */
    margin: 0 auto 20px;
    position: relative;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: bag-shake 0.5s infinite alternate;
  }
  .branded-bag::before { /* Ручки пакета */
    content: '';
    position: absolute;
    top: -20px; width: 60px; height: 40px;
    border: 5px solid #8b4513;
    border-bottom: none;
    border-radius: 30px 30px 0 0;
  }
  .bag-logo { color: #520; font-weight: bold; font-size: 0.8rem; border: 1px solid #520; padding: 5px; }

  @keyframes bag-shake {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
  }
</style>

<script>
document.addEventListener('DOMContentLoaded', renderCart);

function ringBell() {
    const bell = document.getElementById('call-bell');
    bell.classList.add('ring-animation');
    
    // Эффект звука и вибрации
    setTimeout(() => {
        #bell.classList.remove('ring-animation');
        // Если корзина не пуста, плавно скроллим к кнопке заказа
        #document.querySelector('.checkout-btn')?.scrollIntoView({behavior: 'smooth'});
    }, 500);
}

function renderCart() {
    const container = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <h2 class="vintage-title">На прилавке пусто...</h2>
                <p>Хозяйка ждет ваших заказов!</p>
                <a href="/merch/bed_linen/" class="checkout-btn" style="display:inline-block; text-decoration:none; width:auto; padding: 10px 30px;">Вернуться в лавку</a>
            </div>`;
        updateCartBadge();
        return;
    }

    let cartHtml = '<h1 class="vintage-title">Список ваших покупок:</h1>';
    let grandTotal = 0;

    cart.forEach((item, index) => {
        const price = parseInt(item.price.replace(/\s/g, '')) || 0;
        const total = price * (item.qty || 1);
        grandTotal += total;

        cartHtml += `
            <div class="cart-item">
                <img src="${item.image}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <small style="color: #888;">ID: ${item.id} | ${item.price} ₸</small>
                </div>
                <div class="cart-item-qty">
                    <button class="btn--qty" onclick="updateQty(${index}, -1)">-</button>
                    <span class="cart-qty-num">${item.qty || 1}</span>
                    <button class="btn--qty" onclick="updateQty(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">${total.toLocaleString()} ₸</div>
                <button class="remove-btn" onclick="removeItem(${index})">🗑</button>
            </div>`;
    });

    cartHtml += `
        <div class="cart-summary">
            <p style="font-size: 0.9em; color: #520; margin-bottom: 10px;">🧵 <i>Каждый стежок сделан с любовью. Срок исполнения: до 10 дней.</i></p>
            <h2 style="margin-bottom: 20px; color:#520;">Итого с вас: <span style="color: #006400;">${grandTotal.toLocaleString()} ₸</span></h2>
            <button class="checkout-btn" onclick="processOrderWithAnimation()">УПАКОВАТЬ И К ОПЛАТЕ</button>
            <br><br>
            <a href="javascript:void(0)" onclick="clearCart()" style="color: #520; font-size: 0.8em; text-decoration: underline;">Очистить прилавок</a>
        </div>`;

    container.innerHTML = cartHtml;
    updateCartBadge();
}

function processOrderWithAnimation() {
    let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    if (cart.length === 0) return;

    // 1. Показываем анимацию пакета
    const overlay = document.getElementById('packaging-overlay');
    overlay.style.display = 'flex';

    // 2. Через 2.5 секунды вызываем оригинальный WhatsApp процесс
    setTimeout(() => {
        overlay.style.display = 'none';
        processOrder(); 
    }, 2500);
}

// --- Твоя оригинальная логика без изменений ---
function updateQty(index, delta) {
    let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    cart[index].qty = (parseInt(cart[index].qty) || 1) + delta;
    if (cart[index].qty < 1) return removeItem(index);
    localStorage.setItem('my_merch_cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('my_merch_cart', JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    if(confirm("Убрать все товары с прилавка?")) {
        localStorage.removeItem('my_merch_cart');
        renderCart();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count-badge');
    if (!badge) return;
    let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    let total = cart.reduce((sum, item) => sum + (parseInt(item.qty) || 1), 0);
    badge.innerText = total;
    badge.style.display = total > 0 ? 'inline-block' : 'none';
}

function processOrder() {
    let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    const myNumber = "77783282689"; 
    
    let message = `🚀 НОВЫЙ ЗАКАЗ ИЗ КОРЗИНЫ\n`;
    message += `--------------------------\n\n`;

    let grandTotal = 0;
    cart.forEach((item, i) => {
        const price = parseInt(item.price.replace(/\s/g, '')) || 0;
        const qty = parseInt(item.qty) || 1;
        const total = price * qty;
        grandTotal += total;
        message += `${i+1}. ${item.name}\n   ID: ${item.id}\n   Кол-во: ${qty} шт.\n   Сумма: ${total.toLocaleString()} ₸\n\n`;
    });

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 10);
    const dateStr = deliveryDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'});

    message += `--------------------------\n`;
    message += `💰 ИТОГО: ${grandTotal.toLocaleString()} ₸\n`;
    message += `📅 Готовность к: ${dateStr}\n\n`;
    message += `Жду подтверждения!`;

    window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`, '_blank');
}
</script>
