import type { Metadata } from "next";
import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { SearchParamProps } from "@/types";
import InviteButton from "@/components/shared/InviteButton";
import { getUserById } from "@/lib/actions/user.actions";

const EventDetails = async ({ params, searchParams }: SearchParamProps) => {
  const { id } = await params;
  const searchParamsData = await searchParams;
  const currentPage = typeof searchParamsData?.page === "string" ? searchParamsData.page : "1";

  const event = await getEventById(id);
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: currentPage,
  });

  const eventOrganizer = await getUserById(event.organizer._id);

  return (
    <>
      {/* Hero Section with Improved Text Contrast */}
      <section className="relative min-h-[60vh] flex justify-center bg-primary-50 dark:bg-gray-900 bg-dotted-pattern bg-contain">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50 dark:from-black/70 dark:to-black/30"></div>
        <div className="absolute inset-0">
          <Image
            src={event.imageUrl}
            alt="hero image"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-10 flex w-full max-w-7xl flex-col gap-8 p-5 md:p-10 text-white">
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex flex-wrap gap-4">
              <p className="rounded-full bg-primary-500 dark:bg-primary-600 px-5 py-2 text-sm font-semibold">
                {event.category.name}
              </p>
              <p className="rounded-full bg-green-500 dark:bg-green-600 px-5 py-2 text-sm font-semibold">
                {event.isFree ? "FREE" : `$${event.price}`}
              </p>
            </div>
            <h1 className="h1-bold text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
              {event.title}
            </h1>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary-500/10 dark:bg-primary-700 flex items-center justify-center">
                  <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} />
                </div>
                <p className="p-medium-16 drop-shadow-md">
                  {formatDateTime(event.startDateTime).dateOnly}
                  <br />
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary-500/10 dark:bg-primary-700 flex items-center justify-center">
                  <Image src="/assets/icons/location.svg" alt="location" width={24} height={24} />
                </div>
                {event.location.toLowerCase() !== "online" ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      event.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-medium-16 hover:text-primary-500 dark:hover:text-primary-300 transition drop-shadow-md"
                  >
                    {event.location}
                  </a>
                ) : (
                  <p className="p-medium-16 drop-shadow-md">{event.location}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 sm:items-center">
            <CheckoutButton event={event} />
            <InviteButton event={event} />
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="wrapper my-8 grid grid-cols-1 gap-8 md:grid-cols-2 2xl:max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h2 className="h3-bold mb-4 text-gray-900 dark:text-gray-100">About this Event</h2>
            <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <h2 className="h3-bold mb-4 text-gray-900 dark:text-gray-100">Organized by</h2>
            <div className="flex items-center gap-4">
              <Image
                src={eventOrganizer.photo || "/assets/icons/default-profile.svg"}
                alt={`${event.organizer.firstName} ${event.organizer.lastName}`}
                width={42}
                height={42}
                className="rounded-full"
              />
              <div>
                <p className="p-medium-16 text-primary-500 dark:text-primary-300">
                  {event.organizer.firstName} {event.organizer.lastName}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Event Organizer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md h-fit sticky top-4">
          <h2 className="h3-bold mb-6 text-gray-900 dark:text-gray-100">Event Information</h2>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-700 flex items-center justify-center">
                <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Start Time</p>
                <p className="p-medium-16">{formatDateTime(event.startDateTime).dateOnly}</p>
                <p className="p-medium-16">{formatDateTime(event.startDateTime).timeOnly}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-700 flex items-center justify-center">
                <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">End Time</p>
                <p className="p-medium-16">{formatDateTime(event.endDateTime).dateOnly}</p>
                <p className="p-medium-16">{formatDateTime(event.endDateTime).timeOnly}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-700 flex items-center justify-center">
                <Image src="/assets/icons/location.svg" alt="location" width={24} height={24} />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Location</p>
                {event.location.toLowerCase() !== "online" ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      event.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-medium-16 text-primary-500 dark:text-primary-300 hover:underline"
                  >
                    {event.location}
                  </a>
                ) : (
                  <p className="p-medium-16">{event.location}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary-50 dark:bg-primary-700 flex items-center justify-center">
                <Image src="/assets/icons/dollar.svg" alt="price" width={24} height={24} />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Price</p>
                <p className="p-medium-16">{event.isFree ? "Free" : `$${event.price}`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Related Events Section */}
       <section className="wrapper my-8 md:my-16">
        <div className="border-t-2 border-grey-200 pt-8">
          <h2 className="h2-bold mb-8 text-center">
            Similar Events You May Like
          </h2>
          <Collection
            data={relatedEvents?.data}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={3}
            page={currentPage}
            totalPages={relatedEvents?.totalPages}
          />
        </div>
      </section>
    </>
  );
};

export default EventDetails;
