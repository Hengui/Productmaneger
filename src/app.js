const express = require('express');
const app = express();
const port = 3000; 

const ProductManager = require('../src/ProductManeger'); 

app.get('/produtos', async (req, res) => {
    try {
        const limit = req.query.limit; 
        const produtos = await ProductManager.getProducts();

        if (limit) {
            const limitedProducts = produtos.slice(0, parseInt(limit));
            res.json(limitedProducts);
        } else {
            res.json(produtos);
        }
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        res.status(500).json({ error: 'Erro ao obter produtos' });
    }
});

app.get('/produtos/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const produto = await ProductManager.getProductById(pid);

        if (!produto) {
            res.status(404).json({ error: 'Produto não encontrado' });
        } else {
            res.json(produto);
        }
    } catch (error) {
        console.error('Erro ao obter produto por ID:', error);
        res.status(500).json({ error: 'Erro ao obter produto por ID' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
