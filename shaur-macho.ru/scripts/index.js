document.addEventListener('DOMContentLoaded', async() => {
  setDataList();
  setCountHeader();
  setAsideForm();
  const asideSelect = document.querySelector('.aside__select');
  const asideInput = document.querySelector('.aside__select-input');
  asideSelect.addEventListener('change', (event) => {
    const value = event.target.value;
    if (value === 'Наличными') {
      asideInput.classList.add('aside__select-input--active')
    } else {
      asideInput.classList.remove('aside__select-input--active')
    }
  })
});

document.addEventListener('click', (event) => {
  if (event.target.className === 'data__item-button') {
    const id = event.target.dataset.id;
    const dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    dataList.push({ id, quantity: 1 });
    localStorage.setItem('dataList', JSON.stringify(dataList));
    const actionButtons = `
      <div class="data__item-actions">
        <button class="data__item-action data__item-action--minus" data-id="${id}">
          -
        </button>
        <span class="data__item-count">1</span>
        <button class="data__item-action data__item-action--plus" data-id="${id}">
          +
        </button>
      </div>
    `;
    event.target.insertAdjacentHTML('beforebegin', actionButtons);
    event.target.remove();
    setCountHeader();
    setAsideForm();
  }
  if (event.target.classList.contains('aside__info-button')) {
    localStorage.removeItem('dataList');
    setCountHeader();
    setAsideForm();
    setDataList();
  }
  if (event.target.classList.contains('aside__item-action')) {
    const id = event.target.dataset.id;
    const dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    const index = dataList.findIndex(item => item.id === id);
    if (event.target.classList.contains('aside__item-action--minus')) {
      dataList[index].quantity--;
      if (dataList[index].quantity === 0) {
        dataList.splice(index, 1);
      }
    }
    if (event.target.classList.contains('aside__item-action--plus')) {
      dataList[index].quantity++;
    }
    localStorage.setItem('dataList', JSON.stringify(dataList));
    setCountHeader();
    setAsideForm();
    setDataList();
  }
  if (event.target.className === 'aside__button') {
    callModalOrder();
  }
  if (event.target.className === 'modal__close') {
    event.target.parentElement.parentElement.parentElement.classList.remove('modal--active'); 
  }
  if (event.target.classList.contains('data__item-action')) {
    const id = event.target.dataset.id;
    const dataList = JSON.parse(localStorage.getItem('dataList')) || [];
    const index = dataList.findIndex(item => item.id === id);
    if (event.target.classList.contains('data__item-action--minus')) {
      dataList[index].quantity--;
      if (dataList[index].quantity === 0) {
        dataList.splice(index, 1);
      }
    }
    if (event.target.classList.contains('data__item-action--plus')) {
      dataList[index].quantity++;
    }
    localStorage.setItem('dataList', JSON.stringify(dataList));
    setCountHeader();
    setAsideForm();
    setDataList();
  }
  if (event.target.className === 'main__categories-item') {
    const category = event.target.dataset.category;
    setDataList(category);
    const categoriesItems = document.querySelectorAll('.main__categories-item');
    categoriesItems.forEach(item => item.classList.remove('main__categories-item--active'));
    event.target.classList.add('main__categories-item--active');
  }
});

const setDataList = async(category) => {
  const getDataList = async() => await fetch('../data.json').then(res => res.json()).then(res => res);
  const dataList = await getDataList();
  const basket = JSON.parse(localStorage.getItem('dataList')) || [];
  const dataSectionElement = document.querySelector('.data__section');
  const dataCategories = document.querySelector('.main__categories-list');
  dataSectionElement.innerHTML = '';
  if (category && category !== 'all') {
    const data = dataList[category];
    const titleElement = document.createElement('h2');
    titleElement.classList.add('section-title');
    titleElement.textContent = data.title;
    dataSectionElement.append(titleElement);
    const dataListElement = document.createElement('ul');
    dataListElement.classList.add('data__list');
    dataSectionElement.append(dataListElement);
    data.items.forEach(dataItem => {
      const dataItemElement = document.createElement('li');
      dataItemElement.classList.add('data__item');
      dataItemElement.innerHTML = `
        <div class="data__item-img-wrap">
          <img class="data__item-img" src="${dataItem.image}" alt="${dataItem.name}">
        </div>
        <div class="data__item-info">
          <h3 class="data__item-title">${dataItem.name}</h3>
          <p class="data__item-weight">${dataItem.weight} гр.</p>
          <p class="data__item-description" title="${dataItem.description}">${dataItem.description}</p>
          <p class="data__item-price">${dataItem.price} ₽</p>
          ${
            basket.find(item => item.id === dataItem.id)
              ? `
                <div class="data__item-actions">
                  <button class="data__item-action data__item-action--minus" data-id="${dataItem.id}">
                    -
                  </button>
                  <span class="data__item-count">${basket.find(item => item.id === dataItem.id).quantity}</span>
                  <button class="data__item-action data__item-action--plus" data-id="${dataItem.id}">
                    +
                  </button>
                </div>
              `
              : `
                <button class="data__item-button" data-id="${dataItem.id}">
                  В корзину
                </button>
              `
          }
        </div>
      `;
      dataListElement.append(dataItemElement);
    })
  } else {
    dataCategories.innerHTML = '';
    const categoryElement = document.createElement('li');
    categoryElement.classList.add('main__categories-item');
    categoryElement.classList.add('main__categories-item--active');
    categoryElement.textContent = 'Все';
    categoryElement.dataset.category = 'all';
    dataCategories.append(categoryElement);
    Object.keys(dataList).forEach(key => {
      const data = dataList[key];
      const titleElement = document.createElement('h2');
      titleElement.classList.add('section-title');
      titleElement.textContent = data.title;
      dataSectionElement.append(titleElement);
      const dataListElement = document.createElement('ul');
      dataListElement.classList.add('data__list');
      dataSectionElement.append(dataListElement);
      const categoryElement = document.createElement('li');
      categoryElement.classList.add('main__categories-item');
      categoryElement.textContent = data.title;
      categoryElement.dataset.category = key;
      dataCategories.append(categoryElement);
      data.items.forEach(dataItem => {
        const dataItemElement = document.createElement('li');
        dataItemElement.classList.add('data__item');
        dataItemElement.innerHTML = `
          <div class="data__item-img-wrap">
            <img class="data__item-img" src="${dataItem.image}" alt="${dataItem.name}">
          </div>
          <div class="data__item-info">
            <h3 class="data__item-title">${dataItem.name}</h3>
            <p class="data__item-weight">${dataItem.weight} гр.</p>
            <p class="data__item-description" title="${dataItem.description}">${dataItem.description}</p>
            <p class="data__item-price">${dataItem.price} ₽</p>
            ${
              basket.find(item => item.id === dataItem.id)
                ? `
                  <div class="data__item-actions">
                    <button class="data__item-action data__item-action--minus" data-id="${dataItem.id}">
                      -
                    </button>
                    <span class="data__item-count">${basket.find(item => item.id === dataItem.id).quantity}</span>
                    <button class="data__item-action data__item-action--plus" data-id="${dataItem.id}">
                      +
                    </button>
                  </div>
                `
                : `
                  <button class="data__item-button" data-id="${dataItem.id}">
                    В корзину
                  </button>
                `
            }
          </div>
        `;
        dataListElement.append(dataItemElement);
      })
    })
  }
}

const setCountHeader = () => {
  const basket = JSON.parse(localStorage.getItem('dataList')) || [];
  const countElement = document.querySelector('.header__cart-count');
  countElement.textContent = basket.length;
}

const setAsideForm = async() => {
  const getDataList = async() => await fetch('../data.json').then(res => res.json()).then(res => res);
  const arrayDataList = await getDataList();
  const dataList = [];
  Object.keys(arrayDataList).forEach(key => {
    const data = arrayDataList[key];
    data.items.forEach(dataItem => {
      dataList.push(dataItem);
    })
  })
  const basket = JSON.parse(localStorage.getItem('dataList')) || [];
  const countElement = document.querySelector('.aside__info-text');
  countElement.textContent = 'Кол-во товаров: ' + basket.length;
  const asideList = document.querySelector('.aside__list');
  asideList.innerHTML = '';
  basket.forEach(data => {
    const dataInfo = dataList.find(dataInfo => dataInfo.id === data.id);
    const dataItem = document.createElement('li');
    dataItem.classList.add('aside__item');
    dataItem.innerHTML = `
      <div class="aside__item-img-wrap">
        <img class="aside__item-img" src="${dataInfo.image}" alt="${dataInfo.name}">
      </div>
      <div class="aside__item-info">
        <h3 class="aside__item-title">${dataInfo.name}</h3>
        <div class="aside__item-actions">
          <button class="aside__item-action aside__item-action--minus" data-id="${data.id}">
            -
          </button>
          <span class="aside__item-count">${data.quantity}</span>
          <button class="aside__item-action aside__item-action--plus" data-id="${data.id}">
            +
          </button>
        </div>
      </div>
      <div class="aside__item-price-wrap">
        <p class="aside__item-price">
          ${dataInfo.price * data.quantity} ₽
        </p>
      </div>
    `;
    asideList.append(dataItem);
  });
  const totalPriceElement = document.querySelector('.aside__total-price');
  totalPriceElement.textContent = basket.reduce((acc, cur) => acc + dataList.find(dataInfo => dataInfo.id === cur.id).price * cur.quantity, 0) + ' ₽';
  const buttonElement = document.querySelector('.aside__button');
  const selectWrapElement = document.querySelector('.aside__select-wrap');
  if (basket.length === 0) {
    buttonElement.classList.add('aside__button--disabled');
    selectWrapElement.classList.remove('aside__select-wrap--active');
  } else {
    buttonElement.classList.remove('aside__button--disabled');
    selectWrapElement.classList.add('aside__select-wrap--active');
  }
}

const callModalOrder = () => {
  const modalOrderElement = document.querySelector('#modal-order');
  modalOrderElement.classList.add('modal--active');
  const modalButton = document.querySelector('.modal__button');
  modalButton.addEventListener('click', () => validateForm());
  const modalName = document.querySelector('#modal-name');
  const modalPhone = document.querySelector('#modal-phone');
  const modalAddress = document.querySelector('#modal-address');
  const modalComment = document.querySelector('#modal-comment');
  modalPhone.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
  });
  const validateForm = () => {
    if (modalName.value && modalPhone.value && modalAddress.value && modalComment.value) {
      sendOrder();
    } else {
      alert('Заполните все поля');
    }
  }
}

const callModalThankyou = () => {
  localStorage.removeItem('dataList');
  setCountHeader();
  setAsideForm();
  setDataList();
  const modalOrderElement = document.querySelector('#modal-order');
  modalOrderElement.classList.remove('modal--active');
  const modalThankyouElement = document.querySelector('#modal-thankyou');
  modalThankyouElement.classList.add('modal--active');
}

const sendOrder = async() => {
  const getDataList = async() => await fetch('../data.json').then(res => res.json()).then(res => res);
  const arrayDataList = await getDataList();
  const dataList = [];
  Object.keys(arrayDataList).forEach(key => {
    const data = arrayDataList[key];
    data.items.forEach(dataItem => {
      dataList.push(dataItem);
    })
  })
  const basket = JSON.parse(localStorage.getItem('dataList')) || [];
  const order = {
    name: document.querySelector('#modal-name').value,
    phone: document.querySelector('#modal-phone').value,
    address: document.querySelector('#modal-address').value,
    comment: document.querySelector('#modal-comment').value,
    variant: document.querySelector('#variant-select').value,
    howMuch: document.querySelector('#variant-select').value === 'Наличными' ? document.querySelector('#how-much').value : 0,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    list: basket.map(dataItem => {
      const item = dataList.find(dataInfo => dataInfo.id === dataItem.id);
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: dataItem.quantity
      };
    }),
    total: basket.reduce((acc, cur) => acc + dataList.find(dataInfo => dataInfo.id === cur.id).price * cur.quantity, 0)
  };
  fetch('ТУТ_УРЛ_КУДА_СТРЕЛЯТЦ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
  callModalThankyou();
}