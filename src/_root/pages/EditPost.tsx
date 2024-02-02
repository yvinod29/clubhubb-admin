import PostForm from "@/components/forms/PostForm"
import { useGetEventByIdMutation } from "@/store/api/postApi";
import Loader from "@/components/shared/Loader";
import { useEffect } from "react";
import { useParams } from "react-router-dom"


const EditPost = () => {
  const { eventId } = useParams();

  const [geteventbyid, { isLoading ,data}] = useGetEventByIdMutation();
  const getEvent = async () => {

    if (!eventId) {
      throw new Error("Token not found");
    }


    const event = await geteventbyid({ eventId });
    if ('data' in event) {
      console.log(event.data)
    }

  }
  useEffect(() => {
    getEvent()
  }, [])

  if (isLoading) return <Loader />

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">

          <img
            src="/assets/icons/add-post.svg"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>


        </div>
        <PostForm post={data}  action="Update"/>

      </div>
    </div>
  )
}

export default EditPost
