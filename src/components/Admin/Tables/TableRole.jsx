import { useEffect } from "react"
import { FaRegEdit } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from '../../../redux/slices/roleSlice'
import { ROLES_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant'

const TableRole = (props) => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.role.data)

    useEffect(() => {
        dispatch(fetchRoles({ page: props.currentPage, limit: ROLES_MAX_ITEMS_PER_PAGE }))
    }, [props.currentPage])

    console.log(data)

    return (
        <div>





            
            {/* <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col" style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td className="text-center">
                                <FaRegEdit onClick={() => props.handleOpenModalUpdate(item)} className="text-primary fs-5 cursor-pointer" />
                                <span className="mx-2"></span>
                                <CiTrash onClick={() => props.handleOpenModalDelete(item.id)} className="text-danger cursor-pointer fs-5" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    )
}

export default TableRole