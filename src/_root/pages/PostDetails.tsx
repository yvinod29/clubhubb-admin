import { useGetEventByIdMutation } from '@/store/api/postApi';
import Loader from '@/components/shared/Loader';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';


type Timings = {
  startTime: string;
  endTime: string;
};
type studentFormData = {
  name: string;
  email: string;
}
type registeredUserIds = {
  userId: string;
  qrCode: string;
  studentFormData: studentFormData;
}
type Post = {
  imageUrl: string;
  eventName: string;
  eventDescription: string;
  timings: Timings;
  cheifGuests: string[];
  amount: number;
  registeredUserIds: [registeredUserIds];



};

type DateTimeFormatOptions = {
  weekday?: 'short' | 'long' | 'narrow';
  day?: 'numeric' | '2-digit';
  month?: 'short' | 'long' | 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  hour12?: boolean;
};



const PostDetails = () => {
  const [GetEventById] = useGetEventByIdMutation();
  const [posts, setPosts] = useState<Post>();

  const { eventId } = useParams();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Error: Token not found");
      } else {
        if (eventId) {
          const events = await GetEventById({ eventId });
          if ('data' in events) {
            const updatedPosts = {
              imageUrl: events.data.eventPoster.secureUrl,
              eventName: events.data.eventName,
              timings: events.data.timings,
              eventDescription: events.data.eventDescription,
              cheifGuests: [events.data.cheifGuests],
              amount: events.data.amount,
              registeredUserIds: events.data.registeredUserIds

            };
            setPosts(updatedPosts);
            console.log(posts)

          }
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const formatDateTime = (dateTimeString?: string) => {
    if (!dateTimeString) {
      return ''; // or some default value if needed
    }
    const options: DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const dateTime = new Date(dateTimeString);
    const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(dateTime);

    return formattedDateTime;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {eventId && posts?.imageUrl ? (
        <div >

          <div className='flex flex-col text-justify md:flex-row m-5'  >
            <div className="md:w-8/12" >
              <img className="rounded-2xl" src={posts?.imageUrl} alt="Event Poster" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className='md:flex flex-col md:m-5 md:w-8/12'>
              <div className='flex flex-row  gap-7'>
                <div className='m-2'>
                  <h1 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>{posts?.eventName}</h1>
                </div>

              </div>
              <div>
                <p>
                  <b>Start Time :</b> {formatDateTime(posts?.timings.startTime)}
                </p>
                <p>
                  <b>End Time :</b> {formatDateTime(posts?.timings.endTime)}
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: 'bold', fontSize: '18px', margin: '10px 0' }}>Description</h3>
                <p>{posts?.eventDescription}</p>
              </div>
              <div className='m-b-10'>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px', margin: '10px 0' }}>Registration Fee</h3>

                 <p>{posts?.amount}</p>
              </div>
              <div className='flex-center m-3'>
                <Link to={{ pathname: `/posts/${eventId}/registarionform` }}>
                  <Button type="submit" className="shad-button_primary whitespace-nowrap ">Registration Form</Button>
                </Link>
              </div>





            </div>
          </div>
          <div className="m-5 p-6 bottom-0 md:hidden "
            style={{ color: "black" }}
          >
            <p>bottom bar</p>
          </div>

        </div>

      ) : (
        <div className='items-center'>
          <Loader />
        </div>
      )}
    </>
  );
};

export default PostDetails;
