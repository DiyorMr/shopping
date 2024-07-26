import React, { createContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Login from './pages/login/Login'

export const Context = createContext(null)
export default function App() {
	const [cardInfo, setCardInfo] = useState({})
	const [allProduct, setAllProduct] = useState([])
	const [categorieList, setCategorieList] = useState([])
	const [loader, setLoader] = useState(false)
	const [activeBtn, setActiveBtn] = useState('all')
	const [modal, setModal] = useState(false)

	useEffect(() => {
		setLoader(true)
		fetch('https://fakestoreapi.com/products')
			.then(res => res.json())
			.then(json => setAllProduct(json))
			.finally(() => setLoader(false))

		fetch('https://fakestoreapi.com/products/categories')
			.then(res => res.json())
			.then(json => setCategorieList(['all', ...json]))
	}, [])

	useEffect(() => {
		setLoader(true)
		if (activeBtn === 'all') {
			fetch('https://fakestoreapi.com/products')
				.then(res => res.json())
				.then(json => setAllProduct(json))
				.finally(() => setLoader(false))
		} else {
			fetch(`https://fakestoreapi.com/products/category/${activeBtn}`)
				.then(res => res.json())
				.then(json => setAllProduct(json))
				.finally(() => setLoader(false))
		}
	}, [activeBtn])
	return (
		<div className='container'>
			<Context.Provider
				value={{
					cardInfo,
					allProduct,
					categorieList,
					loader,
					activeBtn,
					setActiveBtn,
					setCardInfo,
					modal,
					setModal,
				}}
			>
				<ToastContainer />
				<Login />
				{/* <Navbar />
        <Header />
        <Card /> */}
			</Context.Provider>
		</div>
	)
}
