import React from "react"
import CommonProductCard from "../common/CommonProductCard"

import I1 from "../../assets/imli-range/i-1.svg"
import I2 from "../../assets/imli-range/i-2.svg"
import I3 from "../../assets/imli-range/i-3.svg"
import I4 from "../../assets/imli-range/i-4.svg"

const products = [
	{
		id: 1,
		name: "Orange Fruit Katli - 250 g",
		price: "₹150",
		image: I1,
		backgroundColor: "#E0F2FF",
	},
	{
		id: 2,
		name: "Strawberry Fruit Katli - 250 g",
		price: "₹150",
		image: I2,
		backgroundColor: "#E2FFB2",
	},
	{
		id: 3,
		name: "Orange Fruit Katli - 250 g",
		price: "₹150",
		image: I3,
		backgroundColor: "#FFE4BE",
	},
	{
		id: 4,
		name: "Lollipop Fruit Flavour - 250 g",
		price: "₹150",
		image: I4,
		backgroundColor: "#FFBEBE",
	},
]

const ImliRange = () => {
	const handleAddToCart = (product) => {
		console.log(`Added ${product.name} to cart.`)
	}
	return (
		<>
			<CommonProductCard
				title={"Imli Range"}
				products={products}
				handleAddToCart={handleAddToCart}
			/>
		</>
	)
}

export default ImliRange
