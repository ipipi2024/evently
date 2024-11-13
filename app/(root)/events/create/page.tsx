import EventForm from "@/components/shared/EventForm";
import TestForm from "@/components/shared/TestForm";
import { auth } from "@clerk/nextjs/server";

const CreateEvent = async () => {
  const authData = await auth();
  const userId = authData.sessionClaims?.userId as string;

  return (
    <>
      {/* Header Section */}
      <section className="bg-primary-50 dark:bg-gray-900 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-gray-900 dark:text-gray-100">
          Create Event
        </h3>
      </section>

      {/* Form Section */}
      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
