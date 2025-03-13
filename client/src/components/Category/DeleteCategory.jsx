import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function DeleteCategory() {
    const {categoryid} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        const handledelete = async () => {
            try {
                const response = await axios.delete(`http://localhost:8889/api/category/delete/${categoryid}`, {
                    withCredentials: true
                })
                if(response.data.success){
                    alert(response.data.message)

                }
                else if(response.data.status === 400){
                    alert("response.data.message")
                }
                else{
                    alert(response.data.message)
                }
            }
            catch (error) {
                console.error("Error while deleting category:", error)
            }
        }
        handledelete();
        navigate("/category")

    },[categoryid])
  return (
    <div>deleteCategory {categoryid}</div>
  )
}

export default DeleteCategory