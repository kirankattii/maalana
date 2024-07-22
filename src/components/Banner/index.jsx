import React from "react"

import "./Banner.scss"

const Banner = ({ img, title }) => {
	return (
		<>
			<div className="banner-container">
				<img
					src={img}
					alt={title}
					className="banner"
				/>
			</div>
		</>
	)
}
export default Banner
