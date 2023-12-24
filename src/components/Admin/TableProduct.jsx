import { DataGrid } from '@mui/x-data-grid';
import { fetchProducts } from '../../redux/slices/productSlice'
import { useEffect } from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import formattedPrice from '../../utils/formatPrice';
import { useDispatch, useSelector } from 'react-redux';

const TableProduct = (props) => {
    const dispatch = useDispatch()

    const products = useSelector(state => state.product.products)

    const { handleClickBtnUpdate, handleClickBtnDelete } = props

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Name', width: 240 },
        { field: 'author', headerName: 'Author', width: 200 },
        { field: 'category.name', headerName: 'Category', width: 170, valueGetter: (params) => params.row.category.name },
        {
            field: 'image', headerName: 'Image', width: 130, renderCell: (params) => (
                <img
                    src={params.row.image} // Giả sử params.value chứa đường dẫn đến hình ảnh
                    alt="image"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            ),
        },
        {
            field: 'price', headerName: 'Price', width: 130,
            valueFormatter: (params) => {
                return formattedPrice(params.value);
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <div>
                    <FaRegEdit className='fs-4 text-primary me-2' onClick={() => handleClickBtnUpdate(params.row)} style={{ cursor: 'pointer' }} />
                    <MdOutlineDelete className='fs-4 text-danger' onClick={() => handleClickBtnDelete(params.row.id, params.row.name)} style={{ cursor: 'pointer' }} />
                </div>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                key={props.forcePageZero}
                rows={products}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    )
}

export default TableProduct