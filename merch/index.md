---
layout: single
title: ""
permalink: /merch/
sidebar:
  nav: "merch_sidebar"
---

<div class="merch-studio">
    <div class="panel-center">
        <div class="v-container">
            <img id="product-base-img" src="">
            <canvas id="main-canvas" width="400" height="500"></canvas>
        </div>
    </div>

    <div class="panel-side side-left">
        <label class="t-lab">1. КТО ЗАКАЗЧИК?</label>
        <div class="btn-group">
            <button id="btn-male" class="g-btn active" onclick="setGender('male')">🧔 МУЖСКОЕ</button>
            <button id="btn-female" class="g-btn" onclick="setGender('female')">👩 ЖЕНСКОЕ</button>
            <button id="btn-kids" class="g-btn" onclick="setGender('kids')">👶 ДЕТСКОЕ</button>
        </div>

        <label class="t-lab">2. ЦВЕТ ТКАНИ</label>
        <div id="color-grid" class="c-grid"></div>

        <label class="t-lab">3. СТОРОНА</label>
        <div class="btn-group-row">
            <button id="side-f" class="s-btn active" onclick="toggleSide('f')">ГРУДЬ</button>
            <button id="side-b" class="s-btn" onclick="toggleSide('b')">СПИНА</button>
        </div>
        
        <div class="cart-status" id="cart-counter">В наборе: 0 поз.</div>
        <button class="clear-btn" onclick="clearAllData()">Сбросить всё</button>
    </div>

    <div class="panel-side side-right">
        <label class="t-lab">4. ТЕКСТ</label>
        <textarea id="u-text" class="u-area" oninput="updateAll()">Ваш Текст</textarea>
        
        <select id="f-family" class="u-sel" onchange="updateAll()">
            <option value="monospace">Стандарт</option>
            <option value="'Pattaya'">Сглаженный</option>
            <option value="'Pacifico'">Рукописный</option>
            <option value="'Rubik Mono One'">Жирный</option>
            <option value="'Ruslan Display'">Дизайнерский</option>
        </select>

        <div class="r-box"><span>Размер</span><input type="range" id="t-size" min="10" max="120" value="30" oninput="updateAll()"></div>
        <div class="r-box"><span>Изгиб</span><input type="range" id="t-arc" min="-400" max="400" value="0" oninput="updateAll()"></div>
        <div class="r-box"><span>Поворот</span><input type="range" id="t-rot" min="0" max="360" value="0" oninput="updateAll()"></div>

        <label class="t-lab">5. ЛОГОТИП</label>
        <input type="file" id="l-up" class="u-file" onchange="handleLogo(event)">
        <div class="r-box"><span>Масштаб</span><input type="range" id="l-size" min="30" max="350" value="150" oninput="updateAll()"></div>

        <label class="t-lab">6. ЦВЕТ НИТИ</label>
        <input type="color" id="t-color" value="#ffffff" oninput="updateAll()" class="u-col">

        <hr>
        <button class="add-btn" onclick="addToCart()">➕ В НАБОР</button>
        <button class="buy-btn" id="final-send" onclick="sendOrder()">ОТПРАВИТЬ ЗАКАЗ (0) 🚀</button>
    </div>
</div>

<link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Pattaya&family=Rubik+Mono+One&family=Ruslan+Display&display=swap" rel="stylesheet">

<style> 
  /* 1. ГЛОБАЛЬНЫЕ ПРАВКИ И ЧИСТКА МЕСТА */
  body.layout--single {
    background-image: linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), 
                      url('{{ "/assets/images/bg/bg_cloud.jpg" | relative_url }}') !important;
    background-attachment: fixed !important;
    background-size: cover !important;
  }

  /* Скрываем ненужные элементы темы для экономии места */
  .sidebar__share, .author__urls-wrapper, .follow-button, .page__footer, .page__meta { display: none !important; }
  #main, .page, .archive, .inner { background: transparent !important; padding-top: 0 !important; }

  /* Настройка кнопки Toggle Menu (Бургер) */
  .nav__toggle {
    position: fixed;
    top: 5px;
    right: 5px;
    z-index: 1100;
    margin: 0;
    padding: 3px 8px;
    font-size: 0.6rem !important;
    background: rgba(0,0,0,0.6) !important;
  }

  /* 2. КОНТЕЙНЕРЫ СТУДИИ */
  .merch-studio { 
    display: flex; 
    flex-wrap: wrap; 
    justify-content: center; 
    gap: 15px; 
    padding: 10px; 
    font-family: 'Segoe UI', sans-serif; 
  }

  /* Панели управления (компактный режим) */
  .panel-side { 
    width: 260px; 
    background: white; 
    padding: 12px; 
    border-radius: 10px; 
    box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
    font-size: 0.85rem;
  }

  .panel-center { 
    width: 400px; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
  }

  .v-container { 
    position: relative; 
    width: 400px; 
    height: 500px; 
    background: transparent;
    overflow: hidden; 
  }

  #product-base-img { width: 100%; height: 100%; object-fit: contain; position: absolute; z-index: 1; pointer-events: none; }
  #main-canvas { position: absolute; z-index: 2; cursor: move; }

  /* 3. МИКРО-ЭЛЕМЕНТЫ УПРАВЛЕНИЯ */
  .t-lab { font-size: 8px; font-weight: 900; color: #aaa; margin-top: 8px; display: block; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #eee; }
  .btn-group, .btn-group-row { display: flex; gap: 4px; margin-top: 5px; }
  .btn-group { flex-direction: column; }
  
  .g-btn, .s-btn { padding: 6px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 4px; font-size: 10px; font-weight: bold; }
  .active { background: #333 !important; color: white !important; }
  
  .u-area { width: 100%; height: 45px; margin-top: 5px; padding: 5px; font-size: 11px; border-radius: 4px; border: 1px solid #ddd; }
  .u-sel, .u-col { width: 100%; margin-top: 5px; padding: 5px; font-size: 11px; border-radius: 4px; }
  
  .r-box { display: flex; justify-content: space-between; font-size: 9px; margin-top: 4px; align-items: center; }
  input[type="range"] { width: 65%; height: 12px; margin: 0; }

  .add-btn { width: 100%; padding: 10px; background: #666; color: white; border: none; border-radius: 6px; margin-top: 10px; font-size: 11px; cursor: pointer; }
  .buy-btn { width: 100%; padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; margin-top: 8px; font-weight: 900; font-size: 12px; cursor: pointer; }

  /* 4. МОБИЛЬНАЯ МАГИЯ (ЗОНА ДЛЯ СМАРТФОНОВ) */
  @media (max-width: 768px) {
    .merch-studio { 
      padding-top: 290px; /* Спускаем настройки под фиксированную футболку */
      flex-direction: column; 
      align-items: center; 
    }

    .panel-center { 
      position: fixed; 
      top: 10; /* Футболка в самом верху экрана */
      left: 0;
      width: 100%;
      height: 290px;
      z-index: 100;
      background: white; 
      padding: 5px 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .v-container, #main-canvas { width: 220px; height: 280px; }

    .panel-side { 
      width: 100%; 
      max-width: 100%; 
      border-radius: 0; 
      padding: 10px 20px;
    }

    .c-grid { grid-template-columns: repeat(10, 1fr); gap: 2px; }
    .c-pill { height: 20px; }
    .btn-group-row { flex-direction: row; }
    .s-btn { flex: 1; }
  }
</style>

<script>
const COLORS = [
    { id: 'white', hex: '#ffffff' }, { id: 'turquoise', hex: '#40E0D0' }, { id: 'blue', hex: '#1b20bb' },
    { id: 'green', hex: '#008000' }, { id: 'yellow', hex: '#ffff00' }, { id: 'pink', hex: '#ffc0cb' },
    { id: 'red', hex: '#ff0000' }, { id: 'brown', hex: '#8B4513' }, { id: 'grey', hex: '#808080' }, { id: 'black', hex: '#000000' }
];

let canvas, ctx, originalFile = null, displayLogo = null;
let currentGender = 'm', currentSide = 'f', currentColor = 'white';
let state = { text: { x: 200, y: 300, drag: false }, logo: { x: 200, y: 180, drag: false } };
let cart = [];

function init() {
    canvas = document.getElementById('main-canvas');
    ctx = canvas.getContext('2d');
    const grid = document.getElementById('color-grid');
    COLORS.forEach(c => {
        const d = document.createElement('div');
        d.className = 'c-pill'; d.style.backgroundColor = c.hex;
        d.onclick = () => { currentColor = c.id; updateVisual(); };
        grid.appendChild(d);
    });
    setupDrag();
    loadFromStorage();
    updateVisual();
}

function handleLogo(e) {
    const file = e.target.files[0];
    if(!file) return;
    const r = new FileReader();
    r.onload = (ev) => {
        originalFile = ev.target.result;
        const img = new Image();
        img.onload = () => {
            const scale = Math.min(1, 800 / Math.max(img.width, img.height));
            const tempC = document.createElement('canvas');
            tempC.width = img.width * scale; tempC.height = img.height * scale;
            const tCtx = tempC.getContext('2d');
            tCtx.drawImage(img, 0, 0, tempC.width, tempC.height);
            const imageData = tCtx.getImageData(0,0, tempC.width, tempC.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                if (imageData.data[i] > 230 && imageData.data[i+1] > 230 && imageData.data[i+2] > 230) imageData.data[i+3] = 0;
            }
            tCtx.putImageData(imageData, 0, 0);
            displayLogo = new Image();
            displayLogo.onload = () => { updateAll(); saveToStorage(); };
            displayLogo.src = tempC.toDataURL("image/png", 0.6);
        };
        img.src = ev.target.result;
    };
    r.readAsDataURL(file);
}

function saveToStorage() {
    const data = {
        gender: currentGender, side: currentSide, color: currentColor,
        textPos: state.text, logoPos: state.logo,
        vals: {
            t: document.getElementById('u-text').value, f: document.getElementById('f-family').value,
            s: document.getElementById('t-size').value, a: document.getElementById('t-arc').value,
            r: document.getElementById('t-rot').value, ls: document.getElementById('l-size').value,
            tc: document.getElementById('t-color').value
        },
        thumb: displayLogo ? displayLogo.src : null,
        cart: cart
    };
    try { localStorage.setItem('merch_v2', JSON.stringify(data)); } catch(e) {}
}

function loadFromStorage() {
    const raw = localStorage.getItem('merch_v2');
    if(!raw) return;
    const d = JSON.parse(raw);
    currentGender = d.gender; currentSide = d.side; currentColor = d.color;
    state.text = d.textPos; state.logo = d.logoPos;
    document.getElementById('u-text').value = d.vals.t;
    document.getElementById('f-family').value = d.vals.f;
    document.getElementById('t-size').value = d.vals.s;
    document.getElementById('t-arc').value = d.vals.a;
    document.getElementById('t-rot').value = d.vals.r;
    document.getElementById('l-size').value = d.vals.ls;
    document.getElementById('t-color').value = d.vals.tc;
    if(d.thumb) {
        displayLogo = new Image();
        displayLogo.onload = updateAll;
        displayLogo.src = d.thumb;
    }
    cart = d.cart || [];
    updateUI();
}

function updateAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (displayLogo) {
        const s = parseInt(document.getElementById('l-size').value);
        const ratio = displayLogo.height / displayLogo.width;
        ctx.drawImage(displayLogo, state.logo.x - s/2, state.logo.y - (s*ratio)/2, s, s*ratio);
    }
    const txt = document.getElementById('u-text').value;
    const size = parseInt(document.getElementById('t-size').value);
    const arc = parseInt(document.getElementById('t-arc').value);
    const rot = parseInt(document.getElementById('t-rot').value);
    ctx.save();
    ctx.translate(state.text.x, state.text.y);
    ctx.rotate(rot * Math.PI / 180);
    ctx.fillStyle = document.getElementById('t-color').value;
    ctx.font = `bold ${size}px ${document.getElementById('f-family').value}`;
    ctx.textAlign = "center";
    if (Math.abs(arc) < 5) {
        ctx.textBaseline = "middle"; ctx.fillText(txt, 0, 0);
    } else {
        const chars = txt.split(''), rad = 10000 / Math.abs(arc), step = (size * 0.8) / rad, isNeg = arc < 0;
        ctx.translate(0, isNeg ? -rad : rad);
        const start = -(step * (chars.length - 1)) / 2;
        chars.forEach((c, i) => {
            ctx.save(); ctx.rotate(isNeg ? -(start + i*step) : (start + i*step));
            ctx.fillText(c, 0, isNeg ? rad : -rad); ctx.restore();
        });
    }
    ctx.restore();
    saveToStorage();
}

async function sendOrder() {
    if (cart.length === 0) return alert("Корзина пуста!");
    const btn = document.getElementById('final-send');
    btn.innerText = "ОТПРАВКА... ⏳";
    try {
        const key = '5587bd97da5ece0e8c3a03d6d2810a28';
        let report = "";
        for (let i = 0; i < cart.length; i++) {
            const res1 = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: 'POST', body: genFD(cart[i].img) });
            const d1 = await res1.json();
            let logoUrl = "Нет";
            const fileToUp = cart[i].orig || cart[i].thumb;
            if(fileToUp) {
                const res2 = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: 'POST', body: genFD(fileToUp) });
                const d2 = await res2.json(); logoUrl = d2.data.url;
            }
            report += `%0A📦 *ПОЗ ${i+1}*%0A🖼️ Эскиз: ${d1.data.url}%0A📎 ЛОГО: ${logoUrl}%0A📝 Инфо: ${cart[i].desc}%0A`;
        }
        window.open(`https://wa.me/77783282689?text=🚀 *НОВЫЙ ЗАКАЗ*${report}`, '_blank');
        localStorage.removeItem('merch_v2'); location.reload();
    } catch(e) { alert("Ошибка API"); }
}

function genFD(base64) {
    const fd = new FormData(); fd.append('image', base64.split(',')[1]); return fd;
}

function addToCart() {
    generatePreview().then(prev => {
        cart.push({ img: prev, thumb: displayLogo?displayLogo.src:null, orig: originalFile, desc: `${currentGender}/${currentSide}/${currentColor}: ${document.getElementById('u-text').value}` });
        updateUI(); saveToStorage(); alert("Добавлено!");
    });
}

function generatePreview() {
    return new Promise(res => {
        const off = document.createElement('canvas'); off.width = 400; off.height = 500;
        const oCtx = off.getContext('2d');
        const base = document.getElementById('product-base-img');
        oCtx.drawImage(base, 0, 0, 400, 500); oCtx.drawImage(canvas, 0, 0);
        res(off.toDataURL());
    });
}

function updateUI() {
    document.getElementById('cart-counter').innerText = `В наборе: ${cart.length} поз.`;
    document.getElementById('final-send').innerText = `ОТПРАВИТЬ ЗАКАЗ (${cart.length}) 🚀`;
    ['btn-male','btn-female','btn-kids'].forEach(id => document.getElementById(id).classList.toggle('active', id.includes(currentGender==='m'?'male':currentGender==='f'?'female':'kids')));
    ['side-f','side-b'].forEach(id => document.getElementById(id).classList.toggle('active', id.includes(currentSide)));
}

function setGender(g) { currentGender = g[0]; updateVisual(); }
function toggleSide(s) { currentSide = s; updateVisual(); }
function updateVisual() {
    const f = currentGender === 'm' ? 'hi/' : currentGender === 'f' ? 'shi/' : 'their/';
    const n = currentGender === 'k' ? 'body' : 'tshirt';
    document.getElementById('product-base-img').src = `/assets/images/cso/${f}${n}_${currentSide}_${currentGender}_${currentColor}.png`;
    setTimeout(updateAll, 50); updateUI();
}

function setupDrag() {
    const getP = (e) => { const r = canvas.getBoundingClientRect(); return { x: (e.clientX || (e.touches && e.touches[0].clientX)) - r.left, y: (e.clientY || (e.touches && e.touches[0].clientY)) - r.top }; };
    canvas.onmousedown = canvas.ontouchstart = (e) => {
        const p = getP(e), dT = Math.hypot(p.x - state.text.x, p.y - state.text.y), dL = Math.hypot(p.x - state.logo.x, p.y - state.logo.y);
        if (dT < dL && dT < 50) state.text.drag = true; else if (dL < 80) state.logo.drag = true;
    };
    window.onmousemove = window.ontouchmove = (e) => {
        if (!state.text.drag && !state.logo.drag) return;
        const p = getP(e); if (state.text.drag) { state.text.x = p.x; state.text.y = p.y; } if (state.logo.drag) { state.logo.x = p.x; state.logo.y = p.y; } updateAll();
    };
    window.onmouseup = window.ontouchend = () => { state.text.drag = state.logo.drag = false; saveToStorage(); };
}

function clearAllData() { if(confirm("Сбросить?")) { localStorage.clear(); location.reload(); } }
window.onload = init;
</script>
