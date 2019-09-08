import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
// import "font-awesome/css/font-awesome.css"
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("root")
)
