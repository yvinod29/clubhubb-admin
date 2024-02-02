import { Link } from "react-router-dom";

 
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


const EditCard = (event:postCardProps) => {
  

  
  return (
    <div className="post-card ">
        <div className="flex-between ">
            <div className="flex items-center">
                 
            <div className="h3-bold md:h2-bold text-left w-full p-2">
                <h1>{event.post.eventName}</h1>
            </div>
            </div>
            <div className="flex-between mr-4">

             <Link  to={`/update-post/${event.post._id}`}>
                <img src="/assets/icons/edit.svg" alt="edit"  width={24} height={24}/>
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

export default  EditCard;
