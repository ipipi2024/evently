import { IEvent } from '@/lib/database/models/event.model';
import { formatDateTime } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { DeleteConfirmation } from './DeleteConfirmation';
import { getUserById } from '@/lib/actions/user.actions';

type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  let eventOrganizer = null;

  try {
     eventOrganizer = await getUserById(event.organizer._id);
  } catch (error) {
    console.log('Cannot get organizer', error);
  }
  
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-900 dark:shadow-gray-700 md:min-h-[438px]">
      <Link 
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500 dark:bg-gray-900"
      />

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all dark:bg-gray-900 dark:shadow-gray-600">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-600 dark:bg-green-900 dark:text-green-300">
              {event.isFree ? 'FREE' : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-gray-100/10 px-4 py-1 text-gray-500 dark:bg-gray-700/50 dark:text-gray-400 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Image src="/assets/icons/calendar.svg" alt="calendar" width={16} height={16} />
          <p className="p-medium-16 text-gray-500 dark:text-gray-400">
            {formatDateTime(event.startDateTime).dateTime}
          </p>
        </div>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black dark:text-white">{event.title}</p>
        </Link>

        <div className="flex items-center gap-2">
          <Image
            src={eventOrganizer.photo || "/assets/icons/default-profile.svg"}
            alt={`${event.organizer.firstName} ${event.organizer.lastName}`}
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="p-medium-14 md:p-medium-16 text-gray-600 dark:text-gray-300">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image src="/assets/icons/location.svg" alt="location" width={16} height={16} />
          <p className="p-medium-14 text-gray-600 dark:text-gray-300 line-clamp-1">
            {event.location}
          </p>
        </div>

        {hasOrderLink && (
          <Link href={`/orders?eventId=${event._id}`} className="flex gap-2 mt-2">
            <p className="text-primary-500 dark:text-primary-300">Order Details</p>
            <Image src="/assets/icons/arrow.svg" alt="arrow" width={10} height={10} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
