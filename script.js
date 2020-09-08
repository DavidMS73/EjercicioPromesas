const fetchProductList =
  "https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json";
const fetchDetailList =
  "https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json";

fetch(fetchProductList)
  .then((responseProductList) => {
    return responseProductList.json();
  })
  .then((productList) => {
    fetch(fetchDetailList)
      .then((responseDetailList) => {
        return responseDetailList.json();
      })
      .then((productDetail) => {
        // Número de productos en la lista de productos
        let productsSize = productList.length;

        // Array para almacenar la cantidad de productos que se han vendido por cada producto y se inicializa en cero todas las posiciones
        let arrayOfProducts = new Array(productsSize).fill(0);

        // Recorrer detalle de productos y sumar la cantidad vendida
        productDetail.forEach(
          (item) =>
            (arrayOfProducts[parseInt(item.idproducto) - 1] += parseInt(
              item.cantidad
            ))
        );

        // Producto con más ventas
        let max = 0;

        // Posición del producto con más ventas. Iniciado en -1.
        let position = -1;

        // Recorrer array para encontrar el mayor
        for (let index = 0; index < arrayOfProducts.length; index++) {
          if (arrayOfProducts[index] > max) {
            max = arrayOfProducts[index];
            position = index;
          }
        }

        // Respuesta
        console.log(
          "El producto más pedido es: " +
            productList[position].nombreProducto +
            ". Ha sido pedido " +
            max +
            " veces."
        );
      });
  });
