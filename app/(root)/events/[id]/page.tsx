import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collections';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import Image from 'next/image';

// Make the component async to properly handle async data fetching
const EventDetails = async ({ params, searchParams }: SearchParamProps) => {
  // Access params and searchParams directly
  const { id } = params;
  const page = searchParams.page as string | undefined;

  // Fetch event data using the 'id' from params
  const event = await getEventById(id);

  // Fetch related events using the 'page' from searchParams
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: page ?? '1', // Use page query parameter, default to '1' if undefined
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image 
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />
          {/* ... rest of the JSX structure ... */}
        </div>
      </section>
      
      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>
        <Collection 
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={page ?? '1'} // Use page, default to '1' if undefined
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
