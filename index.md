---
layout: single
author_profile: true
title: "Студия авторского дизайна и вышивки"
header:
  overlay_color: "ffffff"
  overlay_filter: "0.5"
  overlay_image: /assets/images/studio-hero.png # Положи сюда сочное фото процесса или лучшей работы
  cta_label: "Вырази себя"
  cta_url: "/merch/"
  caption: "Твои идеи — наше воплощение"
excerpt: "Создаем уникальный стиль: от корпоративного брендинга до уютного домашнего текстиля. Каждое изделие — это ваша история, рассказанная нитями."
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

 /* Прозрачная подложка под постами */
  .entries-layout__list > div, div[style*="display:flex"] {
    background: rgba(255, 255, 255, 0.4) !important; /* Уменьшили до 0.4 для прозрачности */
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    
    /* Эффект матового стекла */
    backdrop-filter: blur(8px) !important; 
    -webkit-backdrop-filter: blur(8px);
    
    /* Тонкая светлая граница для объема */
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    
    /* Мягкая тень, чтобы карточка не "провалилась" */
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07) !important;
    transition: all 0.3s ease;
  } 

/* Убираем фон и рамки у самих картинок в списке постов */
.archive__item img, div[style*="display:flex"] img {
  background-color: transparent !important; /* Убираем белый фон */
  border: none !important;                  /* Убираем рамки, если тема их лепит */
  box-shadow: none !important;              /* Убираем тени, если они есть */
  mix-blend-mode: multiply;                 /* Опционально: помогает лучше вписать белые края в фон */
  mix-blend-mode: normal;                   /* Если PNG чистый, оставляем normal */
}

/* Если Minimal Mistakes оборачивает картинку в div с фоном */
.entry__featured-image, .archive__item-teaser {
  background-color: transparent !important;
  border: none !important;
}

  /* Оживляем при наведении */
  .entries-layout__list > div:hover, div[style*="display:flex"]:hover {
    background: rgba(255, 255, 255, 0.6) !important;
    transform: translateY(-5px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15) !important;
  }
</style>

### Наш опыт и возможности.

* **Для бизнеса:** Логотипы, шевроны, корпоративный стиль, который не стирается со временем.
* **Для дома:** Индивидуальный декор от салфеток и полотенец до футуристических полотен, превращающих жизненное пространство в ваш мир красоты, стиля и уюта.
* **Для жизни:** Одежда и аксессуары, салон автомобиля и брелок на ключах - всё, даже мелкие детали подчёркивают ваш характер.

---

### Путь к цели.

1. **Идея** — вы присылаете макет или просто рассказываете свою историю.
2. **Дизайн** — мы создаём программный код и адаптируем ваш сторис под машинную вышивку.
3. **Воплощение** — магия превращения идеи в продукт происходит на нашем высоко технологичном оборудовании.
4. **Доставка** — ваш замысел возвращается к вам и становится осязаемым воплощением вашего личного стиля.
