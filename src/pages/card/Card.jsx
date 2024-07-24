import React, { useContext, useEffect, useState } from 'react';
import './Card.css';
import pencil from '../../img/pencil.svg'
import trash from '../../img/trash-fill.svg'
import { Context } from '../../App';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Form, Input, Select } from 'antd';
import { toast } from 'react-toastify';


export default function Card() {
    const { loader, allProduct, categorieList, activeBtn, setActiveBtn, setDeleteCardID, modal, setModal } = useContext(Context)
    const [form] = Form.useForm();
    const [cardInfo, setCardInfo] = useState({})
    const [options, setOptions] = useState([])

    useEffect(() => {
        var newData = []
        categorieList.map((item) => newData.push({ label: item, value: item }))
        setOptions(newData)
    }, [])

    const addNewProduct = (values) => {
        fetch('https://fakestoreapi.com/products', {
            method: "POST",
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(json => {
                form.resetFields()
                toast.success('Muvaffaqiyatli yaratildi')
            })
    }

    const changeCardInfo = (item) => {
        setCardInfo(item)
        setModal(true)
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
                                                <img src={trash} alt="" srcSet="" onClick={() => setDeleteCardID(item.id)} />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="p-3 bg-white">
                                        <h4 className='category'>{item?.category}</h4>
                                        <h4 className='flower-name'>{item.title}</h4>
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

            <Modal isOpen={modal} toggle={() => { setModal(false) }}>
                <ModalHeader toggle={() => setModal(false)}>Modal title</ModalHeader>
                <ModalBody className='pb-0 '>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={addNewProduct}
                    >
                        <Form.Item label="Category" name='category' initialValue={cardInfo.category}>
                            <Select options={options} />
                        </Form.Item>
                        <Form.Item label="Title" name='title'>
                            <Input placeholder="Enter title" />
                        </Form.Item>
                        <Form.Item label="Description" name='description'>
                            <Input placeholder="Enter description" />
                        </Form.Item>
                        <Form.Item label="Price" name="price" >
                            <Input placeholder="Enter price" />
                        </Form.Item>
                        <Form.Item label="Img" name="image">
                            <Input placeholder="Enter img url" />
                        </Form.Item>
                        <Form.Item >
                            <button className="navbar-btn w-100" data-bs-dismiss="offcanvas" aria-label="Close">Add new product</button>
                        </Form.Item>
                    </Form>
                </ModalBody>
            </Modal>

        </div >
    )
}
