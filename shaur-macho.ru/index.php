<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/normalize.css">
  <link rel="stylesheet" href="./styles/global.css">
  <link rel="stylesheet" href="./styles/header.css">
  <link rel="stylesheet" href="./styles/index.css">
  <script src="./scripts/index.js"></script>
  <title>ШаурМачо - заказать шаурму в Морозовске</title>
  <meta name="keywords" content="шаурма, шаверма, заказать шаурму, вкусная шаурма, шаурма купить, самая вкусная шаурма, лучшая шаурма, вкусная шаверма, заказ шаурмы" />
  <meta name="description" content="Заказать вкусную шаурму в Морозовске, от ШаурМачо. Большой выбор самой лучшей шаурмы по низким ценам в Морозовске. Купить шаурму онлайн на сайте или по телефону 8-928-114-81-61." />
  <meta property="og:title" content="ШаурМачо - заказать шаурму в Морозовске">
  <meta property="og:description" content="Заказать вкусную шаурму в Морозовске, от ШаурМачо. Большой выбор самых вкусных блюд по низким ценам в Морозовске. Купить шаурму онлайн на сайте или по телефону 8-928-114-81-61.">
  <link rel="icon" href="./images/favicon.png" type="image/x-icon">
</head>
<body>
  <header class="header container">
    <div class="header__wrapper">
      <div>
        <img class="header__logo" src="./images/logo.png" alt="Логотип магазина">
        <h1 style="color: #e9bb00;">ШаурМачо<h1>
      </div>
      <div class="header__geo">
        <svg class="header__geo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#ffdd2d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#ffdd2d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <span class="header__geo-text">Морозовск</span>
      </div>
    </div>
    <div class="header__cart">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
      <span class="header__cart-count">0</span>
    </div>
  </header>
  <main class="main container">
    <h1 class="main__title">ШаурМачо</h1>
    <div class="main__categories">
      <ul class="main__categories-list"></ul>
    </div>
    <div class="main__content">
      <section class="data__section">
        <h2 class="data__title section-title">Шаурма</h2>
        <ul class="data__list"></ul>
      </section>
      <aside class="aside">
        <h2 class="aside__title">Ваш заказ</h2>
        <div class="aside__info">
          <p class="aside__info-text">Кол-во товаров: 0</p>
          <button class="aside__info-button">
            очистить корзину
          </button>
        </div>
        <div class="aside__list-wrap">
          <ul class="aside__list">
          </ul>
        </div>
        <div class="aside__select-wrap">
          <label class="aside__select-label" for="variant-select">Способ оплаты</label>
          <select class="aside__select" name="variants" id="variant-select">
            <option value="Картой">Картой</option>
            <option value="Наличными">Наличными</option>
          </select>
          <input class="aside__select-input" id="how-much" type="text" placeholder="Сдача с суммы" maxlength="7" />
        </div>
        <div class="aside__total">
          <p class="aside__total-text">Итого:</p>
          <p class="aside__total-price">
            0
          </p>
        </div>
        <button class="aside__button aside__button--disabled">
          Оформить заказ
        </button>
      </aside>
    </div>
  </main>
  <div class="modal">
    <div id="modal-order" class="modal__wrapper">
      <div class="modal__content">
        <div class="modal__header">
          <p class="modal__title">
            Оформление заказа
          </p>
          <button class="modal__close"></button>
        </div>
        <div class="modal__body">
          <form class="modal__form">
            <label class="modal__label">
              <input id="modal-name" class="modal__input" type="text" placeholder="Имя" maxlength="50">
            </label>
            <label class="modal__label">
              <input id="modal-phone" class="modal__input" type="text" placeholder="Телефон" maxlength="11">
            </label>
            <label class="modal__label">
              <input id="modal-address" class="modal__input" type="text" placeholder="Адрес" maxlength="50">
            </label>
            <label class="modal__label">
              <input id="modal-comment" class="modal__input" type="text" placeholder="Комментарии" maxlength="50">
            </label>
          </form>
        </div>
        <div class="modal__footer">
          <button class="modal__button">
            Оформить
          </button>
        </div>
      </div>
    </div>
    <div id="modal-thankyou" class="modal__wrapper">
      <div class="modal__content">
        <div class="modal__header">
          <p class="modal__title">
            Ваша заявка принята
          </p>
          <button class="modal__close"></button>
        </div>
        <div class="modal__body">
          <p class="modal__text">
            Наш менеджер свяжется с вами в ближайшее время
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>