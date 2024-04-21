import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getFullAccessCourse } from "../../api/api-function/coures-api"
import FormRender from "./FormRender"
import { RootState } from "../../redux/store/Store"

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const [course , setcourse] = useState(null);
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state:RootState) => state.auth)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      
      if (courseId) {
        const result = await getFullAccessCourse(courseId, token , dispatch)
        
        if (result) {
            setcourse(result)
          }
      }
      setLoading(false)
    })()
   
  }, [])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <FormRender />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}