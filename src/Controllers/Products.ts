import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../Models/Products';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, value } = req.body;

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name,
        value
    });

    return product
        .save()
        .then((product) => res.status(201).json({ product }))
        .catch((error) => res.status(500).json({ error }));
};

const readProduct = (req: Request, res: Response, next: NextFunction) => {
    const ProductId = req.params.ProductId;

    return Product.findById(ProductId)
        .populate('Products')
        .select('-__v')
        .then((product) => (product ? res.status(200).json({ product }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Product.find()
        .then((Products) => res.status(200).json({ Products }))
        .catch((error) => res.status(500).json({ error }));
};

const updateProduct = (req: Request, res: Response, next: NextFunction) => {
    const ProductId = req.params.ProductId;

    return Product.findById(ProductId)
        .then((Product) => {
            if (Product) {
                Product.set(req.body);

                return Product.save()
                    .then((Product) => res.status(201).json({ Product }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Product.findByIdAndDelete(bookId)
        .then((Product) => (Product ? res.status(201).json({ Product, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createProduct, readProduct, readAll, updateProduct, deleteProduct };
