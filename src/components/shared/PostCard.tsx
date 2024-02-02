 import { Link } from "react-router-dom";
import { Button } from "../ui/button";
type eventPoster={
    publicId:string;
    secureUrl:string;
}
 
 type Document={
    eventName:string;
    $createdAt:string;
     _id:string;
    eventPoster:eventPoster;
 }


type postCardProps={
    post:Document;
}


const PostCard = (event:postCardProps) => {
    console.log(event)
    
 
  return (
    <div className="post-card ">
        <div className="flex-between ">
            <div className="flex items-center">
                 
             <div className="text-left h3-bold w-full  p-2 m-2">
                <h3 >{event.post.eventName}</h3>
            </div>
            </div>
            <div className="mr-2">

            
            
            <Link to={{ pathname: `/posts/${event.post._id}/register-details` }}>
            <Button type="submit" className="shad-button_primary whitespace-nowrap ">Check In</Button>
        </Link>
        
            </div>
        </div>
        <Link  to={`/posts/${event.post._id}`}>     
            <img 
            src={event.post.eventPoster.secureUrl}
            className="post-card_img"
            alt="post image"/>
        </Link>
        
     </div>
  )
}

export default PostCard
