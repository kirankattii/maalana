import React from "react"
import { Typography, Button } from "@mui/material"

import "./CommonProductCard.scss"

const CommonProductCard = ({ title, products, handleAddToCart }) => {
	return (
		<>
			<div className="best-sellers">
				<Typography
					variant="h4"
					className="best-sellers-title"
				>
					{title}
				</Typography>
				<div className="best-sellers-items">
					{products.map((product) => (
						<div
							className="best-sellers-item-circle"
							key={product.id}
						>
							<div
								className="best-sellers-item-image-container"
								style={{ backgroundColor: product.backgroundColor }}
							>
								<div className="best-sellers-item-image">
									<img
										src={product.image}
										alt={product.name}
									/>
								</div>
								<p className="best-sellers-item-name">{product.name}</p>
								<p className="best-sellers-item-price">{product.price}</p>
								<div className="best-sellers-item-image">
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleAddToCart(product)}
									>
										Add to Cart
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
export default CommonProductCard
