// components/shared/InviteButton.tsx
"use client";

import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { Button } from "../ui/button";

const InviteButton = ({ event }: {event: IEvent}) => {
  const handleShare = () => {
    const shareData = {
      title: `Join me at ${event.title}`,
      text: `Check out this event: ${event.title}`,
      url: event.url,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard.writeText(event.url!).then(() => {
        alert("Event link copied to clipboard!");
      });
    }
  };

  return (
    <Button 
      onClick={handleShare}
      className="button sm:w-fit "
      size={'lg'}
      role="link"
    >
      Invite Friends
    </Button>
  );
};

export default InviteButton;
