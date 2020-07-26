import React, { useState, useEffect } from "react";
import "../styles.css";
//import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [reload]);

	const loadAllProducts = () => {
		return (
			<div className="row">
				{products.map((product, index) => (
					<div className="col-sm-6 mb-1" key={index}>
						<Card
							product={product}
							removeFromCart={true}
							addtoCart={false}
							setReload={setReload}
							reload={reload}
						/>
					</div>
				))}
			</div>
		);
	};
	return (
		<Base title="Cart Page" description="Ready to checkout">
			<div className="row text-center">
				<div className="col-8">{loadAllProducts()}</div>
				<div className="col-4">
					<StripeCheckout products={products} setReload={setReload} />
				</div>
			</div>
		</Base>
	);
};

export default Cart;
