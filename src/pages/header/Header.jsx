import React from 'react'
import img1 from '../../img/flower.svg'
import img3 from '../../img/image 3.svg'
import img2 from '../../img/image 5.svg'
import './Header.css'

export default function Header() {
    return (
        <div className="header">
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2000">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="corusel-box w-50">
                                <p className='header-text'>Welcome to GreenShop</p>
                                <h1 className='header-title'>Let’s Make a
                                    Better <span className='span'> Planet</span></h1>
                                <h4 className='header-title2'>We are an online plant shop offering a wide range of cheap and trendy plants.
                                    Use our plants to create an unique Urban Jungle. Order your favorite plants!
                                </h4>
                                <button className="header-btn">
                                    SHOP NOW
                                </button>
                            </div>
                            <img style={{ width: "500px" }} src={img1} className="d-block" alt="..." />
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="corusel-box w-50">
                                <p className='header-text'>Welcome to GreenShop</p>
                                <h1 className='header-title'>Summer Cactus
                                    <span className='span'> Succulents</span></h1>
                                <h4 className='header-title2'>We are an online plant shop offering a wide range of cheap and trendy plants.
                                    Use our plants to create an unique Urban Jungle. Order your favorite plants!
                                </h4>
                                <button className="header-btn">
                                    SHOP NOW
                                </button>
                            </div>
                            <img style={{ width: "500px" }} src={img2} className="d-block" alt="..." />
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="corusel-box w-50">
                                <p className='header-text'>Welcome to GreenShop</p>
                                <h1 className='header-title'> Styling Trends <span className='span'> Much More</span></h1>
                                <h4 className='header-title2'>We are an online plant shop offering a wide range of cheap and trendy plants.
                                    Use our plants to create an unique Urban Jungle. Order your favorite plants!
                                </h4>
                                <button className="header-btn">
                                    SHOP NOW
                                </button>
                            </div>
                            <img style={{ width: "500px" }} src={img3} className="d-block" alt="..." />
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev opacity-0 " type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden" >Previous</span>
                </button>
                <button className="carousel-control-next opacity-0" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

