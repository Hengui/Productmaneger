const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.nextId = 1;

        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.nextId = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
        }
    }

    saveToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
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
        this.saveToFile();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error("Não encontrado");
            return null;
        }
        return product;
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error("Não encontrado");
            return;
        }

        this.products[index] = { ...this.products[index], ...updatedProduct, id };
        this.saveToFile();
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error("Não encontrado");
            return;
        }

        this.products.splice(index, 1);
        this.saveToFile();
    }
}
