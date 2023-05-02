class ProductManager {
    products;
    id = 1

    constructor() {
        this.products = [];
    }

    addProduct(product) {

        const productCode = this.products.find((oneProduct) => oneProduct.code === product.code )

        if(productCode) {
            throw new Error("Ya existe ese code")
        }

        this.products.push({
            id: this.id,
            title: product.title,
            description: product.description,
            price: 200,
            thumbnail: product.thumbnail,
            stock: product.stock,
            code: product.code
        });

        this.id = this.id + 1;
    }

    getProduct() {
        return this.products;
    }

    getProductById(productId) {
        const productToFind = this.products.find((product) => product.id === productId);

        if(!productToFind) {
            throw new Error("No se encontro un producto con ese ID")
        } else {
            return productToFind
        }
    }
}

const productManager1 = new ProductManager();

console.log(productManager1.getProduct())

productManager1.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: "200",
    // thumbnail: "Sin imagen",
    code: "123abc",
    stock: "25",
})

console.log(productManager1.getProduct())

productManager1.addProduct({
    title: "producto prueba2",
    description: "Este es un producto prueba2",
    price: 200,
    thumbnail: "Sin imagen2",
    code: "123ab",
    stock: 2,
})

console.log(productManager1.getProduct())

console.log("PRODUCT ID", productManager1.getProductById(2))


