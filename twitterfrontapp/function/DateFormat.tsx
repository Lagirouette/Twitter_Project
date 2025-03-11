import { format, formatDistanceToNow, parseISO, isYesterday } from 'date-fns';

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString);
  const now = new Date();

  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);

  // If less than 1 minute ago, show seconds
  if (secondsAgo < 60) {
    return `${secondsAgo}s`;
  }

  // If less than 1 hour ago, show minutes
  if (minutesAgo < 60) {
    return `${minutesAgo}m`;
  }

  // If less than 24 hours ago, show hours
  if (hoursAgo < 24) {
    return `${hoursAgo}h`;
  }

  // If it was yesterday, show "Yesterday"
  if (isYesterday(date)) {
    return 'Yesterday';
  }

  // For older dates, show the format "Oct 11"
  return format(date, 'dd MMM');
};

export const formatDateV2 = (dateString: string): string => {
  const date = parseISO(dateString);
  const now = new Date();

  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);

  // If less than 1 minute ago, show seconds
  if (secondsAgo < 60) {
    return `${secondsAgo}s`;
  }

  // If less than 1 hour ago, show minutes
  if (minutesAgo < 60) {
    return `${minutesAgo}m`;
  }

  // If less than 24 hours ago, show hours
  if (hoursAgo < 24) {
    return `${hoursAgo}h`;
  }

  // If it was yesterday, show "Yesterday"
  if (isYesterday(date)) {
    return 'Yesterday';
  }

  // For older dates, show the format "Oct 11"
  return format(date, 'dd MMM yyyy');
};

export const extractTime = (dateString: string): string => {
  const date = parseISO(dateString); // Parse the ISO date string
  return format(date, 'HH:mm'); // Format the time as "15:xx"
};