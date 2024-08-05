import React from "react"
import "./Footer.scss"
import Logo from "../../../assets/logo/logo.svg"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import { Link } from "react-router-dom"

// const Footer = () => {
// 	return (
// 		<footer className="footer">
// 			<div className="footer-content">
// 				<div className="footer-section about">
// 					<img
// 						src={Logo}
// 						alt="Logo"
// 						className="logo"
// 					/>
// 					<div className="social-icons">
// 						<p>
// 							<FacebookIcon className="socialiconsvgfttr" />
// 						</p>
// 						<p>
// 							<InstagramIcon className="socialiconsvgfttr" />
// 						</p>
// 						<p>
// 							<TwitterIcon className="socialiconsvgfttr" />
// 						</p>
// 					</div>
// 				</div>
// 				<div className="footer-section links">
// 					<ul>
// 						<li>
// 							<p>Home</p>
// 						</li>
// 						<li>
// 							<p>Products</p>
// 						</li>
// 						<li>
// 							<p>About Us</p>
// 						</li>
// 						<li>
// 							<p>Contact Us</p>
// 						</li>
// 						<li>
// 							<p>Become a Partner</p>
// 						</li>
// 						<li>
// 							<p>Cart</p>
// 						</li>
// 						<li>
// 							<p>Account</p>
// 						</li>
// 					</ul>
// 				</div>
// 				<div className="footer-section contact">
// 					<h2>Contact Us</h2>
// 					<h2>
// 						Address: <span>Bengaluru</span>
// 					</h2>
// 					<h2>
// 						Phone no: <span>1234567890</span>
// 					</h2>
// 				</div>
// 			</div>
// 		</footer>
// 	)
// }

// export default Footer

const Footer = () => {
	return (
		<div>
			<div className="footer">
				<div className="footer-left">
					<img
						src={Logo}
						alt="logo"
					/>
					<div className="footer-icons">
						<FacebookIcon className="footerIcon" />
						<InstagramIcon className="footerIcon" />
						<TwitterIcon className="footerIcon" />
					</div>
				</div>
				<div className="footer-middle">
					<ul>
						{" "}
						<li>
							<p>Home</p>
						</li>
						<li>
							<p>Products</p>
						</li>
						<li>
							<p>About Us</p>
						</li>
						<li>
							<p>Contact Us</p>
						</li>
						<li>
							<p>Become a Partner</p>
						</li>
						<li>
							<p>Cart</p>
						</li>
						<li>
							<p>Account</p>
						</li>{" "}
					</ul>
				</div>
				<div className="footer-right">
					<h2>CONTACT</h2>
					<div>
						<h2>ADDRESS</h2>
						{/* <p>Bengaluru</p> */}
					</div>
					<div>
						<h2>PHONE NO</h2>
						{/* <p>+91 69856 98652</p> */}
					</div>
				</div>
			</div>
			<div className="copyRight">
				<p>©2024-25 MAAlana Foods All Rights Reserved</p>
				<p>
					Designed by <Link to={"https://pitamaas.com"}>PITAMAAS</Link>{" "}
				</p>
			</div>
		</div>
	)
}

export default Footer
