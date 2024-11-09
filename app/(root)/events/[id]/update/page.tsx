import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs/server"

interface PageProps {
  params: Promise<{ id: string }>
}

const UpdateEvent = async ({ params }: PageProps) => {
  // Await both the params and auth in parallel for better performance
  const [{ id }, { sessionClaims }] = await Promise.all([
    params,
    auth()
  ])

  const userId = sessionClaims?.userId as string
  const event = await getEventById(id)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm 
          type="Update" 
          event={event} 
          eventId={event._id} 
          userId={userId} 
        />
      </div>
    </>
  )
}

export default UpdateEvent