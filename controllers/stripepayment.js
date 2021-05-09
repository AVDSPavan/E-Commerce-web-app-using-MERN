const stripe = require("stripe")(
	"sk_test_51H0drPBPOCxvA3q5Y5Z0AmJsNLRwoTX6Lb40ZXZSts1YzxwcMRYjoSIiZdSPFgHkNTE43iowhA3WB2ylGEM1Kg7Y00UtCfWz91"
);
const { result } = require("lodash");
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
	const { products, token } = req.body;

	let amount = 0;
	products && products.map((p) => {
		amount = amount + p.price;
	});
	const idempotencyKey = uuid();
	return stripe.customers
		.create({
			email: token.email,
			source: token.id,
		})
		.then((customer) => {
			stripe.charges
				.create(
					{
						amount: amount * 100,
						currency: "inr",
						customer: customer.id,
						receipt_email: token.email,
						description: "A test account",
						shipping: {
							name: token.name,
							address: token.card.address
						},
					},
					{ idempotencyKey }
				)
				.then((result) => res.status(200).json(result))
				.catch((err) => console.log(err));
		});
};
