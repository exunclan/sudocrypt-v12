import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { INotification } from "../lib/types";

interface INavbarNotificationProps {
  notifications: INotification[];
}

const NavbarNotifications: React.FC<INavbarNotificationProps> = ({
  notifications,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotification, setUnreadNotification] = useState(false);

  useEffect(() => {
    const latestNotificationRead = window.localStorage.getItem(
      "SUDOCRYPT_LAST_SEEN_NOTIFICATION"
    )
      ? parseInt(
          window.localStorage.getItem("SUDOCRYPT_LAST_SEEN_NOTIFICATION") ?? ""
        )
      : 0;
    if (!showNotifications) {
      console.log(
        notifications &&
          notifications.length > 0 &&
          notifications.map(({ id }) => id).sort((a, b) => b - a)[0] >
            latestNotificationRead
      );
      if (
        notifications &&
        notifications.length > 0 &&
        notifications.map(({ id }) => id).sort((a, b) => b - a)[0] >
          latestNotificationRead
      ) {
        setUnreadNotification(true);
      }
    }
  }, [notifications]);

  const showNotificationPanel = () => {
    setShowNotifications(!showNotifications);
    window.localStorage.setItem(
      "SUDOCRYPT_LAST_SEEN_NOTIFICATION",
      notifications
        ? notifications.map(({ id }) => id).sort((a, b) => b - a)[0] + ""
        : ""
    );
    setUnreadNotification(false);
  };

  return (
    <>
      {notifications && notifications.length > 0 && (
        <div
          className="relative items-center justify-center hidden w-10 h-10 border-4 border-gray-600 rounded-lg cursor-pointer sm:flex"
          onClick={showNotificationPanel}
        >
          {unreadNotification && (
            <div className="absolute -top-2 -right-2 w-[12px] h-[12px] rounded-full bg-red-500" />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
      )}
      {showNotifications && (
        <>
          <div className="absolute top-24 right-14 sm:w-1/2 md:w-1/4 h-[300px] overflow-y-auto bg-black z-[1010] p-5 rounded">
            {notifications &&
              notifications.map(({ created_at, content }, i) => (
                <div key={i}>
                  <div className="my-5">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    <div className="mt-2 text-sm font-bold text-right text-gray-600 uppercase">
                      {formatDistanceToNow(new Date(created_at), {
                        addSuffix: true,
                        includeSeconds: true,
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-center my-8 gap-x-4">
                    <div className="w-[30%] h-[2px] bg-sudo opacity-30"></div>
                    <div className="w-[10px] h-[10px] border-2 border-sudo border-opacity-30 rounded-full"></div>
                    <div className="w-[30%] h-[2px] bg-sudo opacity-30"></div>
                  </div>
                </div>
              ))}
          </div>
          <div
            className="w-screen h-screen fixed top-0 left-0 z-[1000]"
            onClick={() => setShowNotifications(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default NavbarNotifications;
