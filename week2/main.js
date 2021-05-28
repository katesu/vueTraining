const apiUrl = 'https://vue3-course-api.hexschool.io/';
const apiPath = 'lancelot';

const app = {
  data: {
    apiUrl: 'https://vue3-course-api.hexschool.io/',
    apiPath: 'lancelot',
    products: [],
  },
  checkLoggedIn() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      alert('請先登入');
      document.location.href = 'index.html';
    }
  },
  getProducts() {
    const { apiUrl, apiPath } = this.data;

    axios.get(`${apiUrl}api/${apiPath}/admin/products`)
      .then((res) => {
        const { success } = res.data;
        if (success) {
          this.data.products = res.data.products;
          this.render();
        }
      })
      .catch((err) => {
        console.log('getProducts error: ', err)
      });
  },
  deleteProduct(e) {
    const { apiUrl, apiPath } = app.data;

    const isButton = e.target.type;
    const id = e.target.dataset.id;

    if (isButton) {
      axios.delete(`${apiUrl}api/${apiPath}/admin/product/${id}`)
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            app.getProducts();
          } else {
            alert(`${message}`);
          }
        })
        .catch((err) => {
          console.log('deleteProduct error: ', err)
        });
    }
  },
  render() {
    const productList = document.getElementById('productList');
    const productCount = document.getElementById('productCount');
    const htmlStr = this.data.products
      .map(
        (item) => `
          <tr>
          <td>${item.title}</td>
          <td width="120">${item.origin_price}</td>
          <td width="120">${item.price}</td>
          <td width="100">
            <span class="">${item.is_enabled ? '啟用' : '未啟用'}</span>
          </td>
          <td width="120">
            <button
              type="button"
              class="btn btn-sm btn-outline-danger move deleteBtn"
              data-action="remove"
              data-id="${item.id}"
            >
              刪除
            </button>
          </td>
        </tr>
      `
      )
      .join(' ');

    productList.addEventListener('click', this.deleteProduct);
    productList.innerHTML = htmlStr;
    productCount.innerHTML = this.data.products.length;
  },
  created() {
    this.checkLoggedIn();
    this.getProducts();
  },
};

window.onload = function () {
  app.created();
};
