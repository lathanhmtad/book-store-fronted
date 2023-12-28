import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categorySlice';
import { addProduct, editProduct } from '../../services/productService'
import { toast } from 'react-toastify';
import { fetchProducts } from '../../redux/slices/productSlice'


const ModalProduct = (props) => {
    const [values, setValues] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        amount: '',
        author: '',
        categoryId: '',
        image: ''
    })

    const dispatch = useDispatch()

    const resetValues = () => {
        setValues({
            id: '',
            name: '',
            description: '',
            price: '',
            amount: '',
            author: '',
            categoryId: '',
            image: ''
        })
    }

    const { show, setShowModalProduct, dataUpdate, setDataUpdate, setForcePageZero } = props

    const categories = useSelector(state => state.category.categories)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        if (dataUpdate !== null) {
            setValues(dataUpdate)
        }
    }, [dataUpdate])

    const handleChange = (e) => {
        const { id, value } = e.target
        setValues(
            {
                ...values,
                [id]: value
            }
        )
    }

    const handleSubmit = async () => {
        setForcePageZero(null)
        if (dataUpdate) {
            const res = await editProduct(values)
            toast.success('🦄 Sửa sản phẩm thành công')
            setDataUpdate(null)
        }
        else {
            const res = await addProduct(values)
            if (res) {
                toast.success('🦄 Thêm sản phẩm thành công')
                setForcePageZero(0)

            }
        }
        setShowModalProduct(false)
        resetValues()
        dispatch(fetchProducts())
    }

    return (
        <Modal
            show={show}
            onHide={() => {
                resetValues()
                setShowModalProduct(false)
            }}
            backdrop="static"
            centered
            scrollable={true}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>{dataUpdate ? 'Update Book' : 'Add Book'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    {dataUpdate && <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Id</label>
                            <input type="number" disabled className="form-control"
                                id="name" placeholder="" onChange={e => handleChange(e)} value={values.id} />
                        </div>
                    </div>}
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="" onChange={(e) => handleChange(e)} value={values.name} />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">Author</label>
                            <input type="text" className="form-control" id="author" placeholder="" value={values.author} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <input type="number" className="form-control" id="amount" placeholder="" value={values.amount} onChange={e => handleChange(e)} />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" placeholder="" value={values.price} onChange={e => handleChange(e)} />
                        </div>
                    </div>
                    <div className={`${dataUpdate ? 'col-6' : 'col-12'}`}>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select id="categoryId" className="form-select" aria-label="Default select example" value={values.categoryId}
                                onChange={e => handleChange(e)}>
                                <option defaultValue={true}>-- Chọn danh mục</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" onChange={e => handleChange(e)} value={values.description} rows="3"></textarea>
                        </div>
                    </div>
                    {/* <div className='col-12'>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image Url</label>
                            <input type="text" onChange={e => handleChange(e)} value={values.image} className="form-control" id="image" placeholder="" />
                        </div>
                    </div> */}
                    <div className='col-12'>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input className="form-control" type="file" id="file" />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    resetValues()
                    setDataUpdate(null)
                    setShowModalProduct(false)
                }}>
                    Close
                </Button>
                <Button variant="primary"
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalProduct 