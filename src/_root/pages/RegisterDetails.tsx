import { useGetEventByIdMutation, useUpdateStatusMutation, useUpdatecheckinMutation } from '@/store/api/postApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import DownloadExcel from '@/components/shared/DownloadExcel';
import PinkCheckbox from '@/components/ui/PinkCheckbox';
import { Input, Switch } from '@mui/material';

type StudentFormData = {
  name: string;
  email: string;
  collegeName: string;
  phoneNumber: string;
  extraFields: { [key: string]: string }[];
};

type RegisteredUserIds = {
  userId: string;
  qrCode: string;
  studentFormData: StudentFormData;
  checkIn: boolean;
};

type Post = {
  registeredUserIds: RegisteredUserIds[];
  status: boolean;
};

const RegisterDetails = () => {
  const [GetEventById] = useGetEventByIdMutation();
  const [UpdateCheckin] = useUpdatecheckinMutation();
  const [posts, setPosts] = useState<Post | undefined>();
  const [updateStatus] = useUpdateStatusMutation(); // Fix typo here
  const [memberCounts, setMemberCounts] = useState<{ [userId: string]: number }>({});

  const { eventId } = useParams();


  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    console.log(searchValue)

  },[searchValue])


  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Error: Token not found');
      } else {
        if (eventId) {
          const events = await GetEventById({ eventId });
          if ('data' in events) {
            setPosts(() => {
              const updatedPosts = {
                registeredUserIds: events.data.registeredUserIds,
                status: events.data.status
              };
              console.log(posts?.status);

              return updatedPosts;
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [GetEventById, eventId]);

  useEffect(() => {
    // Calculate member counts when posts change
    if (posts) {
      const counts: { [userId: string]: number } = {};
      posts.registeredUserIds.forEach(user => {
        let memberCount = 0;
        for (const key in user.studentFormData.extraFields) {
          if (key.startsWith('team-member-')) {
            memberCount++;
          }
        }
        counts[user.userId] = memberCount > 0 ? memberCount : 1;
      });
      setMemberCounts(counts);
    }
  }, [posts]);

  const handleCheckboxChange = async (userId: string, eventId: string, check: boolean) => {
    console.log(`Checkbox selected for user with ID: ${userId}`);
    // You can also log additional data from the selected user if needed.
    if (userId) {
      console.log('Selected User Data:', userId);
      try {
        // Call the UpdateCheckin mutation
        const session = await UpdateCheckin({ eventId, userId, check });

        if ('data' in session) {
          // If the mutation is successful, update the local state
          setPosts((prevPosts) => {
            if (!prevPosts) return prevPosts;

            const updatedUserIds = prevPosts.registeredUserIds.map((user) => {
              if (user.userId === userId) {
                return { ...user, checkIn: check };
              }
              return user;
            });

            return { ...prevPosts, registeredUserIds: updatedUserIds };
          });

          // Log success or handle further actions
          console.log('Checkin status updated successfully');
        }
      } catch (error) {
        console.error('Error updating checkin status:', error);
      }
    }
  };

  const handleActivateRegistrations = async (eventId: string, status: boolean) => {
    try {
      if (eventId) {
        const session = await updateStatus({ eventId, status });
        console.log(session)
        if ('data' in session) {
          // If the mutation is successful, update the local state
          setPosts((prevPosts) => {
            if (!prevPosts) return prevPosts;

            return { ...prevPosts, status: status };

          });

          console.log('Registration activation status updated successfully');
        }
      }
    } catch (error) {
      console.error('Error updating registration activation status:', error);
    }
  };

  const getTotalMembers = () => {
    let totalMembers = 0;
    for (const userId in memberCounts) {
      totalMembers += memberCounts[userId];
    }
    return totalMembers;
  };


  const filteredUserIds = posts?.registeredUserIds.filter((user) => {
    const fullName = user.studentFormData.name.toLowerCase();
    const email = user.studentFormData.email.toLowerCase();
    const lowerCaseSearchValue = searchValue.toLowerCase();

    return fullName.includes(lowerCaseSearchValue) || email.includes(lowerCaseSearchValue);
  });

  return (
    <>
      {eventId ? (
        <div className="container mx-auto">
          <div className="flex flex-col text-justify md:flex-row ">
            <div className="md:flex flex-col md:m-5 md:w-8/12">
              <div>
                <h3 style={{ fontWeight: 'bold', fontSize: '18px', margin: '10px 0' }}>Registered Students</h3>
              <div className='flex felx-row gap-4 mb-4'>

                <div>
                  <Switch
                    type="checkbox"
                    checked={posts?.status || false}  // Set an initial value of false if posts?.status is undefined
                    onChange={(e) => handleActivateRegistrations(eventId, e.target.checked)}
                  />

                  <label>Activate Registrations</label>
                </div>
                <DownloadExcel posts={posts} />
          </div>

                <p>Total Members: {getTotalMembers()}</p>

                <div className="explore-container">
                  <div className="explore-inner_container">
                    <h2 className="h3-bold md:h2-bold w-full">Search </h2>
                    <div className="flex gap-2 px-4 w-full rounded-lg bg-dark-4">
                      <img
                        src="/assets/icons/search.svg"
                        width={24}
                        height={24}
                        alt="search"
                      />
                      <Input
                        type="text"
                        placeholder="Search"
                        className="explore-search"
                        value={searchValue}
                        onChange={(e) => {
                          const { value } = e.target;
                          setSearchValue(value);
                        }}
                        style={{ color: 'white' }}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd', borderLeft: '1px solid #ddd', borderTop: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd', borderTop: '1px solid #ddd' }}>Checkin</th>
                        <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd', borderTop: '1px solid #ddd' }}>Members</th>
                      </tr>
                    </thead>
                    <tbody style={{ overflowY: 'auto', maxHeight: '200px' }}>
            {filteredUserIds?.map((user) => (
              <tr key={user.userId} style={{ borderBottom: '1px solid #ddd' }}>
                          <td style={{ padding: '8px', borderRight: '1px solid #ddd', borderLeft: '1px solid #ddd', maxWidth: '200px', overflow: 'auto' }}>
                            {user.studentFormData.name}
                            <br />
                            {user.studentFormData.email}
                            <br />
                            {/* Wrap the "View" button with Popover components */}
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="link">View</Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 bg-black text-white p-4">
                                <ul>
                                  <li><strong>Name:</strong><p>
                                    {user.studentFormData.name} </p></li>
                                  <li><strong>Email:</strong><p>{user.studentFormData.email}</p></li>
                                  <li><strong>collegeName:</strong><p>{user.studentFormData.collegeName}</p></li>
                                  <li><strong>phoneNumber:</strong><p>{user.studentFormData.phoneNumber}</p></li>

                                  {Object.entries(user.studentFormData.extraFields).map(([key, value], index) => (
                                    <li key={index}>
                                      <div>
                                        <strong>{key}:</strong>
                                        <p>{typeof value === 'object' ? JSON.stringify(value) : value}</p>
                                      </div>
                                    </li>
                                  ))}

                                </ul>
                              </PopoverContent>
                            </Popover>
                          </td>
                          <td style={{ padding: '8px', borderRight: '1px solid #ddd' }}>
                            <PinkCheckbox
                              checked={user.checkIn}
                              onChange={(e) => handleCheckboxChange(user.userId, eventId, e.target.checked)}
                            />
                          </td>
                          <td style={{ padding: '8px', borderRight: '1px solid #ddd' }}>
                            {memberCounts[user.userId]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="m-5 p-6 bottom-0 md:hidden "
            style={{ color: "black" }}>
            <p>bottom bar</p>
          </div>
        </div>
      ) : (
        <div>
          <p>No registrations</p>
        </div>
      )}
    </>
  );
};

export default RegisterDetails;
