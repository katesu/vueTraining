const addProduct = document.getElementById('addProduct');
const cleanAll = document.getElementById('cleanAll');
const productList = document.getElementById('productList');

let productsData = [];

function render() {
  let htmlStr = '';
  productsData.forEach((product, index) => {
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
  productList.innerHTML(htmlStr);
}
