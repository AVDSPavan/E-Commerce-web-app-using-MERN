const Product = require("../models/product");
const formiddable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Product not found",
				});
			}
			req.product = product;
			next();
		});
};

exports.createProduct = (req, res) => {
	let form = new formiddable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "problem with image",
			});
		}
		//Destructuring the fields
		const { name, description, price, category, stock } = fields;
		if (!name || !price || !description || !category || !stock) {
			return res.status(400).json({
				error: "Please include all fields",
			});
		}
		//Restrictions on fields
		//res.json()
		let product = new Product(fields);
		//handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: " File sixe is too big",
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		//save to the DB
		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Saving t-shirt in DB failed",
				});
			}
			res.json(product);
		});
	});
};

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set("content-Type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};

exports.deleteProduct = (req, res) => {
	let product = req.product;
	product.remove((err, deletedProduct) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to delete the product",
			});
		}
		res.json({
			message: "Deletion was success",
			deletedProduct,
		});
	});
};

exports.updateProduct = (req, res) => {
	let form = new formiddable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: "problem with image",
			});
		}
		//Updation code
		let product = req.product;
		product = _.extend(product, fields);
		//handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: " File sixe is too big",
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		//save to the DB
		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Updation of t-shirt failed",
				});
			}
			res.json(product);
		});
	});
};

exports.getAllProducts = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let sortby = req.query.sortby ? req.query.sortby : "_id";
	Product.find()
		.select("-photo")
		.populate("category")
		.sort([[sortby, "asc"]])
		.limit(limit)
		.exec((err, products) => {
			if (err || !products) {
				return res.status(400).json({
					error: "No product found",
				});
			}
			res.json(products);
		});
};

exports.updateStock = (req, res) => {
	let myOperations = req.body.order.products.map((prod) => {
		return {
			updateOne: {
				filter: { _id: prod._id },
				update: { $inc: { stock: -prod.count, sold: +prod.count } },
			},
		};
	});
	Product.bulkWrite(myOperations, {}, (err, products) => {
		if (err) {
			return res.status(400).json({
				error: "Bulk operations failed",
			});
		}
		next();
	});
};

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}, (err, categories) => {
		if (err) {
			return res.status(400).json({
				error: "No category found",
			});
		}
		res.json(category);
	});
};
