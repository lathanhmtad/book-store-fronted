import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { fetchAllProducts } from '../../services/productService'
import { useEffect } from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const TableProduct = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        const res = await fetchAllProducts()
        setProducts(res)
    }

    const handleDelete = (id) => {
        console.log('Delete product with ID:', id)
    };

    const handleEdit = (id) => {
        console.log('Edit product with ID:', id)
    };


    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Name', width: 240 },
        { field: 'author', headerName: 'Author', width: 200 },
        { field: 'category.name', headerName: 'Category', width: 170, valueGetter: (params) => params.row.category.name },
        { field: 'image', headerName: 'Image', width: 180 },
        { field: 'price', headerName: 'Price', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <div>
                    <MdOutlineDelete className='fs-4 text-danger' onClick={() => handleDelete(params.row.id)} style={{ cursor: 'pointer', marginRight: '8px' }} />
                    <FaRegEdit className='fs-4 text-primary' onClick={() => handleEdit(params.row.id)} style={{ cursor: 'pointer' }} />
                </div>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
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