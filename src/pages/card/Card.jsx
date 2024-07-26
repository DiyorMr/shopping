import { Form, Input, Rate, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { Context } from '../../App'
import pencil from '../../img/pencil.svg'
import trash from '../../img/trash-fill.svg'
import './Card.css'


export default function Card() {
    const { loader, allProduct, categorieList, activeBtn, setActiveBtn, modal, setModal } = useContext(Context)
    const [cardInfo, setCardInfo] = useState(null)
    const [options, setOptions] = useState([])
    const [modal2, setModal2] = useState(false)

    useEffect(() => {
        var newData = []
        categorieList.map((item) => newData.push({ label: item, value: item }))
        setOptions(newData)
    }, [categorieList])

    const addNewProduct = (values) => {

        fetch(cardInfo === null ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/${cardInfo?.id}`, {
            method: cardInfo === null ? "POST" : "PUT",
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(json => {
                closeModal()
                toast.success(cardInfo === null ? 'Muvaffaqiyatli yaratildi' : "Muvaffaqiyatli o'zgartirildi")
            })
    }

    const deleteProduct = (deleteCardID) => {
        fetch(`https://fakestoreapi.com/products/${deleteCardID}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((json) => toast.error("Product deleted."))
    }

    const changeCardInfo = (item) => {
        setCardInfo(item)
        setModal(true)
    }
    const cardInfoFunc = (item) => {
        setCardInfo(item)
        setModal2(true)
    }

    const closeModal = () => {
        setModal(false)
        setCardInfo(null)
    }
    return (
        <div>
            <div className="box-apps">
                <ul>{categorieList.map((item, index) =>
                    <li key={index} className={activeBtn === item ? 'active' : ''} onClick={() => setActiveBtn(item)} >
                        {item}
                    </li>)}
                </ul>
            </div>
            < div className="box-title">
                {
                    loader ?
                        <div className="text-center w-100">
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div> :
                        <div className="flow">
                            {allProduct.map((item, index) =>
                                <div className="flow-col" key={index}>
                                    <div className="flowers">
                                        <img className='img w-100' src={item.image} alt='' />
                                        <div className="dropdown-box">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                            </svg>
                                            <div className="dropdown-box-card">
                                                <img src={pencil} alt="" srcSet="" onClick={() => { changeCardInfo(item) }} />
                                                <img src={trash} alt="" srcSet="" onClick={() => deleteProduct(item.id)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white">
                                        <h4 className='category'>{item?.category}</h4>
                                        <h4 className='flower-name' onClick={() => cardInfoFunc(item)}>{item.title}</h4>
                                        <h1 className='title'>{item.description}</h1>
                                        <div className="d-flex align-items-center justify-content-between mt-4 bg-white" >
                                            <p className='price mb-0'>{item.price}$</p>
                                            <button className='flow-btn'>Add</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                }
            </div>
            {/* Card info update modal */}
            <Modal isOpen={modal}>
                <ModalHeader toggle={closeModal}>
                    {cardInfo === null ? 'Add new product' : 'Update product'}
                </ModalHeader>
                <ModalBody className='pb-0'>
                    <Form
                        id='form'
                        layout='vertical'
                        onFinish={addNewProduct}
                        initialValues={cardInfo}
                        validateMessages={{ required: '${label} is required!' }}
                    >
                        <Form.Item label='Category' name='category' rules={[{ required: true }]}>
                            <Select options={options} />
                        </Form.Item>
                        <Form.Item label='Title' name='title' rules={[{ required: true }]}>
                            <Input placeholder='Enter title' />
                        </Form.Item>
                        <Form.Item label='Description' name='description' rules={[{ required: true }]}>
                            <Input placeholder='Enter description' />
                        </Form.Item>
                        <Form.Item label='Price' name='price' rules={[{ required: true }]}>
                            <Input placeholder='Enter price' />
                        </Form.Item>
                        <Form.Item label='Img' name='image' rules={[{ required: true }]}>
                            <Input placeholder='Enter img url' />
                        </Form.Item>
                        <Form.Item>
                            <button className='navbar-btn w-100' type='submit'>
                                {cardInfo === null ? 'Add new product' : 'Update product'}
                            </button>
                        </Form.Item>
                    </Form>
                </ModalBody>
            </Modal>

            {/* Card info modal */}
            <Modal size='lg' isOpen={modal2} toggle={() => setModal2(false)}>
                <ModalHeader toggle={() => setModal2(false)}>
                    <p className='category2'>{cardInfo?.category}</p>
                </ModalHeader>
                <ModalBody>
                    <div className="modal-card">
                        <img className='img' style={{ width: '350px' }} src={cardInfo?.image} alt='' />
                        <div className="modal-card-box">
                            <Rate disabled defaultValue={cardInfo?.rating?.rate} />
                            <p className='flower-name2 mt-2'>{cardInfo?.title}</p>
                            <p className='title2'>{cardInfo?.description}</p>
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='price mb-0'>{cardInfo?.price}$</p>
                                <p className='price mb-0 me-3'>Total: {cardInfo?.rating?.count}</p>

                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div >
    )
}
