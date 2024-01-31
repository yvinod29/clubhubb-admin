import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useGetEventByIdMutation, useUpdateRegistrationFormMutation } from '@/store/api/postApi';
import { Loader } from 'lucide-react';

 

type Post = {
  requiredInfoOfStudent: string[];
};

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [updateRegistrationForm, { isLoading }] = useUpdateRegistrationFormMutation();
   const [GetEventById] = useGetEventByIdMutation();

  const [registrationFormData, setRegistrationFormData] = useState<string[]>([]);

  const fetchData = async () => {
    if (eventId) {
      const events = await GetEventById({ eventId });
      if ('data' in events) {
        const updatedPosts: Post = {
          requiredInfoOfStudent: events.data.requiredInfoOfStudent,
        };
  
        // Filter out "Name" and "Email"
        const filteredQuestions = updatedPosts.requiredInfoOfStudent.filter(
          (question) => question !== 'name' && question !== 'email'
        );
  
        setRegistrationFormData(filteredQuestions);
      }
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddQuestion = () => {
    if (registrationFormData.every((question) => question !== null && question.trim() !== '')) {
      setRegistrationFormData([...registrationFormData, '']);
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...registrationFormData];
    updatedQuestions[index] = value;
    setRegistrationFormData(updatedQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = [...registrationFormData];
    updatedQuestions.splice(index, 1);
    setRegistrationFormData(updatedQuestions);
  };

  const handleSubmit = async () => {
    if (registrationFormData.some((question) => question === null || question.trim() === '')) {
      alert('Please fill in all additional questions before submitting.');
      return; // Don't proceed with the submission
    }
    console.log('Additional Questions:', registrationFormData);

    if (eventId) {
      try {
        const response = await updateRegistrationForm({
          body: { eventId, additionalQuestions: registrationFormData },
        });

        if ('data' in response && 'status' in response.data && response.data.status === true) {
          console.log('Update successful');
          navigate(-1);
        } else {
          alert('An error occurred while updating the form.');
        }
      } catch (error) {
        console.error('Error updating registration form:', error);
      }
    }
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll md:py-10  md:px-8 lg:p-14 ">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <div className="container mx-auto p-5 lg:p-0">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                <h2 className="h3-bold md:h2-bold text-left w-full mb-2">Registration Form</h2>
                 <div className="card-container mb-4">
                  <h2 className="card-heading mb-3">Fixed Questions</h2>
                  <div className="mb-4">
                    <Input
                      id="name"
                      type="text"
                      className="shad-input"
                      value="Name"
                      disabled
                    />
                  </div>
                  <div>
                    <Input
                      id="email"
                      type="text"
                      className="shad-input"
                      value="email"
                      disabled
                    />
                  </div>
                </div>

                <div className="card-container">
                  <h2 className="card-heading">Additional Questions</h2>
                  {registrationFormData.map((question, index) => (
                    <div key={index} className="mb-4">
                      <label htmlFor={`question-${index}`} className="block font-bold mb-2">
                        Question {index + 1}
                      </label>
                      <div className="flex flex-row gap-9">
                        <Input
                          id={`question-${index}`}
                          type="text"
                          className="shad-input"
                          value={question}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleQuestionChange(index, e.target.value)
                          }
                        />
                        <button
                          className="mt-2"
                          onClick={() => handleRemoveQuestion(index)}>
                          <img src="/assets/icons/delete.svg" alt="Delete" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddQuestion}>
                    Add Question
                  </button>
                </div>
              </div>
              <div className="card-container mt-7 flex-center">
                {!isLoading ? (
                  <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                    Submit
                  </button>
                ) : (
                  <div className="flex-center gap-2">
                    <Loader /> Loading...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
