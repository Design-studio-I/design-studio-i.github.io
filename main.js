console.log("=== СИСТЕМА СТУДИИ ЗАПУЩЕНА ===");
// 1. Функция обновления счетчика в меню
function updateGlobalCartCount() {
    const cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
    const countBadge = document.getElementById('cart-count'); // если добавишь ID в меню
    console.log("В корзине сейчас товаров:", cart.length);
}

// 2. Глобальный перехватчик кликов
document.addEventListener('click', function(e) {
    // Ищем кнопку по классу
    const btn = e.target.closest('.add-to-cart-btn');
    
    if (btn) {
        e.preventDefault(); // Останавливаем переход по ссылке, если кнопка внутри нее
        e.stopPropagation(); // Не даем меню перехватить клик
        
        console.log("КНОПКА НАЖАТА!");

        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: btn.dataset.price,
            image: btn.closest('.product-card')?.querySelector('img')?.src || ''
        };

        // Запись в память
        let cart = JSON.parse(localStorage.getItem('my_merch_cart')) || [];
        cart.push(product);
        localStorage.setItem('my_merch_cart', JSON.stringify(cart));

        // Визуальный эффект
        const originalText = btn.innerText;
        btn.innerText = "ДОБАВЛЕНО! ✓";
        btn.style.backgroundColor = "#27ae60";
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
        }, 1000);

        updateGlobalCartCount();
        
        // КРАЙНЯЯ МЕРА: Если всё равно не веришь — выкинь алерт
        // alert("Товар добавлен!"); 
    }
}, true); // 'true' заставляет скрипт срабатывать ПЕРВЫМ, до того как меню его съест

updateGlobalCartCount();