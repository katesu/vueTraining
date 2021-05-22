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
      ${product.origin_price}
    </td>
    <td width="120">
      ${product.price}
    </td>
    <td width="100">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${product.id}" ${
      product.is_enabled ? 'checked' : ''
    } data-action="status" data-id="${product.id}">
        <label class="form-check-label" for="${product.id}">${
      product.is_enabled ? '啟用' : '未啟用'
    }</label>
      </div>
    </td>
    <td width="120">
      <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${
        product.id
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
      origin_price: origin_price.value || 0,
      price: price.value || 0,
      is_enabled: false,
    });
    render();
    title.value = '';
    origin_price.value = '';
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
  const action = e.target.dataset.action;
  const id = e.target.dataset.id; // string
  if (action === 'status') {
    productsData.forEach((product) => {
      if (id === product.id) {
        product.is_enabled = !product.is_enabled;
      }
    });
  } else if (action === 'remove') {
    productsData.forEach((product, index) => {
      id === product.id && productsData.splice(index, 1);
    });
  }
  render();
}

// mounted
window.onload = function () {
  const addProductBtn = document.getElementById('addProduct');
  const clearAllBtn = document.getElementById('clearAll');
  const productList = document.getElementById('productList');
  const productCount = document.getElementById('productCount');
  const title = document.getElementById('title');
  const origin_price = document.getElementById('origin_price');
  const price = document.getElementById('price');
  productsData && render();
  addProductBtn.addEventListener('click', addProduct);
  clearAllBtn.addEventListener('click', clearAll);
  productList.addEventListener('click', action);
};
