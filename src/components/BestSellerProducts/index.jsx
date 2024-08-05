import React, { useEffect, useState } from "react"
import {
	Card,
	CardContent,
	Grid,
	Typography,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@mui/material"
import "./BestSellerProducts.scss"

// Mock Data
const bestSellerData = [
	{
		id: 1,
		name: "Best Seller Product 1",
		price: "$50.00",
		sold: 120,
		imageUrl: "https://via.placeholder.com/100",
	},
	{
		id: 2,
		name: "Best Seller Product 2",
		price: "$30.00",
		sold: 200,
		imageUrl: "https://via.placeholder.com/100",
	},
	{
		id: 3,
		name: "Best Seller Product 3",
		price: "$70.00",
		sold: 150,
		imageUrl: "https://via.placeholder.com/100",
	},
	// Add more products as needed
]

const BestSellerProducts = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		// Simulate a fetch call
		const fetchProducts = async () => {
			try {
				// Replace this with your actual fetch call
				setTimeout(() => {
					setProducts(bestSellerData)
				}, 1000)
			} catch (error) {
				console.error("Error fetching products:", error)
			}
		}

		fetchProducts()
	}, [])

	return (
		<Grid
			item
			xs={12}
		>
			<Card className="dashboard-card">
				<CardContent>
					<Typography
						variant="h6"
						className="best-seller-title"
					>
						Best Seller Products
					</Typography>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Product Image</TableCell>
								<TableCell>Product Name</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Sold</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((product) => (
								<TableRow key={product.id}>
									<TableCell>
										<img
											src={product.imageUrl}
											alt={product.name}
											className="product-image"
										/>
									</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.price}</TableCell>
									<TableCell>{product.sold}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default BestSellerProducts
