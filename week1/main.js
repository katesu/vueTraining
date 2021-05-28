// data
let productsData = [];

// method
function render() {
  let htmlStr = '';
  productsData.forEach((product) => {
    htmlStr += `
    <tr>
    <td>${product.title}</td>
    <td width="120">
      ${product.originPrice}
    </td>
    <td width="120">
      ${product.price}
    </td>
    <td width="100">
      <div class="form-check form-switch" data-id="${product.id}" data-action="status">
        <input class="form-check-input" type="checkbox" id="${product.id}"${product.isEnabled ? 'checked' : ''
      }>
        <label class="form-check-label" for="${product.id}">${product.isEnabled ? '啟用' : '未啟用'
      } </label>
      </div>
    </td>
    <td width="120">
      <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${product.id
      }"> 刪除 </button>
    </td>
  </tr>`;
  });
  productList.innerHTML = htmlStr;
  productCount.textContent = productsData.length;
}

function addProduct(e) {
  const timeStamp = String(Date.now()); // typeof Date.now() is number
  if (title.value.trim() !== '') {
    productsData.push({
      id: timeStamp,
      title: title.value.trim(),
      originPrice: originPrice.value || 0,
      price: price.value || 0,
      isEnabled: false,
    });
    render();
    title.value = '';
    originPrice.value = '';
    price.value = '';
  } else {
    alert('請輸入產品標題');
  }
}

function clearAll(e) {
  productsData = [];
  render();
}

function action(e) {
  const action = e.target.dataset.action || e.target.parentElement.dataset.action;
  const id = e.target.dataset.id || e.target.parentElement.dataset.id; // string

  if (action === 'status') {
    productsData.forEach((product) => {
      if (id === product.id) {
        product.isEnabled = !product.isEnabled;
      }
    });
  } else if (action === 'remove') {
    productsData.forEach((product, index) => {
      id === product.id && productsData.splice(index, 1);
    });
  }
  render();
}

function keydownEnter(e) {
  const isEnter = e.keyCode === 13;
  if (isEnter) {
    document.getElementById('addProduct').click();
  }
}

// mounted
window.onload = function () {
  const addProductBtn = document.getElementById('addProduct');
  const clearAllBtn = document.getElementById('clearAll');
  const productList = document.getElementById('productList');
  const form = document.getElementById('form');
  const productCount = document.getElementById('productCount');
  const title = document.getElementById('title');
  const originPrice = document.getElementById('originPrice');
  const price = document.getElementById('price');
  productsData && render();
  addProductBtn.addEventListener('click', addProduct);
  clearAllBtn.addEventListener('click', clearAll);
  productList.addEventListener('click', action);
  form.addEventListener('keydown', keydownEnter);
};
