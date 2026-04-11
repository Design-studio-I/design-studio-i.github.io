---
layout: archive
title: "Читальня"
permalink: /blog/
author_profile: true
---

<style>
  /* Фон всей страницы */
  body.layout--archive {
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
    background: rgba(255, 255, 255, 0.05) !important; /* Уменьшили до 0.05 для прозрачности */
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

Здесь наши истории о дизайне и вышивке, охраняемые Фуку-Ито.

{% assign pinned_posts = site.posts | where: "pinned", true %}
{% for post in pinned_posts %}
<div style="display:flex; gap:15px; margin-bottom:25px; align-items:center; border: 2px solid #e0d1ff; padding: 15px; border-radius: 8px; position: relative; background: rgba(224, 209, 255, 0.05);">
  <span style="position: absolute; top: -12px; left: 15px; background: #e0d1ff; color: #5a3e8c; font-size: 0.7em; padding: 2px 8px; border-radius: 4px; font-weight: bold;">ХРАНИТЕЛЬ ЧИТАЛЬНИ</span>
  
  {% if post.image %}
  <img src="{{ post.image }}" style="width:120px; height:120px; object-fit:cover; border-radius: 4px;">
  {% endif %}

  <div>
    <h3 style="margin:0;"><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p style="margin:5px 0;">{{ post.content | strip_html | truncate: 120 }}</p>
  </div>
</div>
{% endfor %}

<hr style="margin: 40px 0; border: 0; border-top: 1px dashed #ccc;">

{% assign all_posts = site.posts | sort: "date" | reverse %}
{% for post in all_posts %}
  {% if post.pinned == true %}
    {% continue %} {% endif %}

<div style="display:flex; gap:15px; margin-bottom:25px; align-items:center;">
  {% if post.image %}
  <img src="{{ post.image }}" style="width:100px; height:100px; object-fit:cover; border-radius: 4px;">
  {% endif %}

  <div>
    <h3 style="margin:0;"><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p style="margin:5px 0;">{{ post.content | strip_html | truncate: 100 }}</p>
  </div>
</div>
{% endfor %}