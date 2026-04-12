---
layout: single
title: "Просмотр товара"
permalink: /merch/item/
sidebar:
  nav: "merch_sidebar"
---

<style>
  /* Стили для красоты, как в твоем оригинале */
  .product-single-container {
    animation: fadeIn 0.5s ease-in;
    margin-top: 20px;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .product-image img {
    transition: transform 0.3s ease;
    display: block;
    width: 100%; 
    border-radius: 12px; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }

  #add-to-cart-btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    background: #000; 
    color: #fff; 
    border: none; 
    padding: 20px 35px; 
    width: 100%; 
    cursor: pointer; 
    font-size: 18px; 
    font-weight: bold; 
    border-radius: 8px; 
    text-transform: uppercase;
  }

  #add-to-cart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    filter: brightness(1.2);
  }

  /* Стили для кнопок +/- */
  .qty-btn-single {
    width: 45px;
    height: 45px;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
    border-radius: 6px;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
  }
  .qty-btn-single:hover { background: #f0f0f0; }
  
  #item-qty-input {
    width: 70px;
    height: 45px;
    text-align: center;
    border: 1px solid #eee;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 10px;
  }
</style>

<div id="product-detail" class="product-wrapper">
  <div id="loading-status" style="text-align: center; padding: 50px;">
    <i class="fas fa-spinner fa-spin"></i> <h2>Подбираем нитки и иголки...</h2>
  </div>
</div>

<script id="merch-data" type="application/json">
{
  {% for file in site.data.merch %}
    "{{ file[0] }}": {{ file[1].merch | jsonify }}{% unless forloop.last %},{% endunless %}
  {% endfor %}
}
</script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const category = params.get('cat');
    
    const dataContainer = document.getElementById('merch-data');
    let allData = {};

    try {
        allData = JSON.parse(dataContainer.textContent);
    } catch (e) {
        document.getElementById('loading-status').innerHTML = "<h1>Ошибка базы данных</h1>";
        return;
    }

    if (productId && category && allData[category]) {
        const product = allData[category].find(p => String(p.slug) === String(productId));
        
        if (product) {
            document.getElementById('loading-status').style.display = 'none';
            document.getElementById('product-detail').innerHTML = `
                <div class="product-single-container" style="display: flex; gap: 40px; flex-wrap: wrap; align-items: flex-start;">
                    <div class="product-image" style="flex: 1.2; min-width: 300px;">
                        <img src="${product.image}" alt="${product.title}" id="main-item-img">
                    </div>
                    <div class="product-info" style="flex: 1; min-width: 300px; padding: 10px;">
                        <p style="margin-bottom: 20px;">
                          <a href="/merch/${category}/" class="back-link" style="text-decoration: none; font-weight: bold; font-size: 0.9em; text-transform: uppercase; color: #888;">
                            ← Назад в раздел
                          </a>
                        </p>
                        <h1 style="margin-top: 0; font-size: 2.2em; line-height: 1.2; margin-bottom: 15px;">${product.title}</h1>
                        <div class="price-tag" style="font-size: 32px; color: #27ae60; font-weight: 900; margin: 20px 0;">${product.price} ₸</div>
                        
                        <div class="description" style="margin-bottom: 35px; line-height: 1.8; color: #555; font-size: 1.1em;">
                            ${product.description || 'Эксклюзивная работа нашей студии. Каждое изделие создается с особым вниманием к деталям.'}
                        </div>

                        <div style="display: flex; align-items: center; margin-bottom: 25px;">
                            <button class="qty-btn-single" onclick="changeQty(-1)">-</button>
                            <input type="number" id="item-qty-input" value="1" min="1" readonly>
                            <button class="qty-btn-single" onclick="changeQty(1)">+</button>
                        </div>

                        <button id="add-to-cart-btn" 
                                onclick="handleBuy('${product.slug}', '${product.title}', '${product.price}', '${product.image}', this)">
                            ДОБАВИТЬ В КОРЗИНУ
                        </button>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('loading-status').innerHTML = "<h1>Товар не найден</h1>";
        }
    } else {
        document.getElementById('loading-status').innerHTML = "<h1>Ошибка ссылки</h1>";
    }
    
    // Инициализируем счетчик в хедере при загрузке
    updateCartBadge();
});

// 1. Изменение количества
function changeQty(delta) {
    const input = document.getElementById('item-qty-input');
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}

// 2. Обработка покупки
function handleBuy(id, name, price, image, btn) {
    const qty = parseInt(document.getElementById('item-qty-input').value) || 1;
    
    let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    
    // Умное сложение
    const existingIdx = cart.findIndex(item => item.id === id);
    if (existingIdx !== -1) {
        cart[existingIdx].qty = (parseInt(cart[existingIdx].qty) || 1) + qty;
    } else {
        cart.push({ id, name, price, image, qty: qty });
    }
    
    localStorage.setItem('my_merch_cart', JSON.stringify(cart));
    
    // Обновляем шапку
    updateCartBadge();
    
    // Полет!
    const imgForFly = document.getElementById('main-item-img');
    flyToCart(imgForFly);
    
    // Кнопка
    const originalText = btn.innerText;
    btn.innerText = "УЖЕ ТАМ! ✓";
    btn.style.background = "#27ae60";
    setTimeout(() => {
        btn.innerText = "ДОБАВИТЬ ЕЩЁ";
        btn.style.background = "#000";
    }, 2000);
}

// 3. Функция полета
function flyToCart(imgElement) {
    const badge = document.getElementById('cart-count-badge');
    if (!imgElement || !badge) return;

    const flyer = imgElement.cloneNode();
    const rect = imgElement.getBoundingClientRect();
    const targetRect = badge.getBoundingClientRect();

    Object.assign(flyer.style, {
        position: 'fixed',
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        opacity: '0.7',
        zIndex: '10000',
        transition: 'all 0.8s ease-in-out',
        pointerEvents: 'none',
        borderRadius: '12px'
    });

    document.body.appendChild(flyer);

    requestAnimationFrame(() => {
        Object.assign(flyer.style, {
            top: targetRect.top + 'px',
            left: targetRect.left + 'px',
            width: '20px',
            height: '20px',
            opacity: '0.1'
        });
    });

    setTimeout(() => {
        flyer.remove();
        badge.style.transform = 'scale(1.5)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);
    }, 800);
}

// 4. Обновление счетчика в хедере
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
</script>
