import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { usePostEventMutation, useUpdateEventMutation } from "@/store/api/postApi"
import BasicDateTimePicker from "../shared/TimingsInput"
import { useNavigate, useParams } from "react-router-dom"
type Timings = {
  startTime: string;
  endTime: string;
};

type EventPoster = {
  publicId: string;
  secureUrl: string;
};

type Document = {
  eventName: string;
  title: string;
  timings: Timings;
  eventDescription: string;
  eventPoster?: File[] | EventPoster; // Make eventPoster optional and accept either File[] or EventPoster
  amount: string;

  // Add any other properties you need for a post
};

type PostFormProps = {

  post?: Document;
  action: "Create" | "Update";

};

const PostForm = ({ post, action }: PostFormProps) => {

  const [postevent] = usePostEventMutation();
  const [updateevent] = useUpdateEventMutation();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      eventName: post ? post.eventName : "",
      title: post ? post.title : "",
      description: post ? post.eventDescription : "",  // Corrected property name
      endDate: post ? post.timings.endTime : "",
      startDate: post ? post.timings.startTime : "",
      eventPoster: [],
      amount: post ? post.amount.toString():"0",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {

    const formData = new FormData();

    formData.append("eventName", values.eventName);
    formData.append("title", values.title);
    formData.append("eventDescription", values.description);
    formData.append("endDate", values.endDate);
    formData.append("startDate", values.startDate);
    formData.append("amount", values.amount);

    
    if (action == "Update" && eventId) {
      console.log("update")
      console.log(values);

      if (values.eventPoster && values.eventPoster.length > 0) {
        console.log(true)
        for (let i = 0; i < values.eventPoster.length; i++) {
          formData.append("eventPoster", values.eventPoster[i]);
        }

      }

      const data = await updateevent({ formData, body: { eventId } })
      console.log(data)

    }


    if (action == "Create") {




      for (let i = 0; i < values.eventPoster.length; i++) {
        formData.append("eventPoster", values.eventPoster[i]);
      }

      const data = await postevent(formData);
      console.log(data + "data")

    }
    navigate('/')


  }
   function handleCancel() {
    navigate('/')

 
    
  }


  return (
    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl ">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Event Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Title</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Description</FormLabel>
              <FormControl>
                < Textarea className="shad-textarea custom-scroll"{...field} />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex   flex-col md:flex-row gap-16">


          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>

                  <BasicDateTimePicker
                    label="Start Date and Time"
                    fieldChange={field.onChange}
                    initialDate={form.getValues('startDate') ? form.getValues('startDate') : null}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>

                  <BasicDateTimePicker
                    label="End Date and Time"
                    fieldChange={field.onChange}
                    initialDate={form.getValues('endDate') ? form.getValues('endDate') : null}

                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="eventPoster"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Poster </FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange}
                  mediaUrl={
                    Array.isArray(post?.eventPoster)
                      ? '' // Handle the case when it's an array of files (new posters)
                      : post?.eventPoster?.secureUrl || '' // Handle the case when it's an EventPoster (existing poster)
                  } />
              </FormControl>

              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

<FormField
  control={form.control}
  name="amount"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="shad-form_label">Amount </FormLabel>
      <FormControl>
        <Input
          type="text"  // Change the type to "text" to allow pattern attribute
          className="shad-input"
          pattern="\d*"  // Use pattern attribute to allow only digits (integers)
          {...field}
        />
      </FormControl>
      <FormMessage className="shad-form_message" />
    </FormItem>
  )}
/>
        < div className="flex gap-4 items-center justify-end">

          <Button type="button" className="shad-button_dark_4"  onClick={handleCancel}>Cancel</Button>
          <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm;
