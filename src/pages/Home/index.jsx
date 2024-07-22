import React, { useState } from "react"

//components
import BestSellers from "../../components/BestSellers/index.jsx"
import ProductCategory from "../../components/ProductCategory/index.jsx"
import CommonBanner from "../../components/Banner/index.jsx"

// products category
import ImliLadooCategory from "../../components/ImliLadooCategory/index.jsx"
import FamilyCandyPackCategory from "../../components/FamilyCandyPackCategory/index.jsx"
import LollipopCategory from "../../components/LollipopCategory/index.jsx"
import Candies from "../../components/Candies/index.jsx"
import AamPapadCategory from "../../components/AamPapadCategory/index.jsx"
import FruitKatliCategory from "../../components/FruitKatliCategory/index.jsx"

//components common
import Banner from "../../components/common/Banner/index.jsx"
import ImliRange from "../../components/ImliRange/index.jsx"
import LollipopRange from "../../components/LollipopRange/index.jsx"

import Banner1 from "../../assets/banner/home-banner-1.svg"
import Banner2 from "../../assets/banner/home-banner-2.svg"
import StyledBox from "../../components/StyledBox/index.jsx"
import EveryBite from "../../components/EveryBite/index.jsx"

const Home = () => {
	const [selectedProduct, setSelectedProduct] = useState(null)

	const handleClick = (index, name) => {
		setSelectedProduct(index)
		console.log(`Selected product: ${name}`)
	}
	const renderProducts = () => {
		switch (selectedProduct) {
			case 0:
				return <ImliLadooCategory />
			case 1:
				return <FamilyCandyPackCategory />
			case 2:
				return <LollipopCategory />
			case 3:
				return <Candies />
			case 4:
				return <AamPapadCategory />
			case 5:
				return <FruitKatliCategory />
			default:
				return (
					<>
						<Banner />
						<BestSellers />
						<ImliRange />
						<CommonBanner
							img={Banner1}
							title="Banner 1"
						/>
						<LollipopRange />
						<LollipopRange />
						<CommonBanner
							img={Banner2}
							title="Banner 2"
						/>
						<StyledBox />
						<EveryBite />
					</>
				)
		}
	}
	return (
		<>
			<ProductCategory
				handleClick={handleClick}
				selectedProduct={selectedProduct}
				setSelectedProduct={setSelectedProduct}
			/>
			{/* <Banner />
            <BestSellers /> */}
			{renderProducts()}
		</>
	)
}

export default Home
