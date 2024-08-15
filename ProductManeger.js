class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos os campos são obrigatórios");
            return;
        }

        if (this.products.some(p => p.code === code)) {
            console.error("Código já existe");
            return;
        }

        const newProduct = { ...product, id: this.nextId++ };
        this.products.push(newProduct);
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error("Não encontrado");
            return null;
        }
        return product;
    }
}

const manager = new ProductManager();
manager.addProduct({
    title: "Produto 1",
    description: "Descrição do Produto 1",
    price: 100,
    thumbnail: "caminho/para/imagem1.jpg",
    code: "P001",
    stock: 10
});

console.log(manager.getProductById(1)); 
console.log(manager.getProductById(2)); 
