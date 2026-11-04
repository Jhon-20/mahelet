import { useState, useEffect } from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isToday: boolean;
  isConfigured: boolean;
}

export function useCountdown(targetDateIso: string): CountdownState {
  const [countdown, setCountdown] = useState<CountdownState>(() => {
    return calculateTimeLeft(targetDateIso);
  });

  useEffect(() => {
    if (!targetDateIso || isNaN(new Date(targetDateIso).getTime())) {
      setCountdown({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false,
        isToday: false,
        isConfigured: false,
      });
      return;
    }

    // Initial check
    setCountdown(calculateTimeLeft(targetDateIso));

    const interval = setInterval(() => {
      setCountdown(calculateTimeLeft(targetDateIso));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateIso]);

  return countdown;
}

function calculateTimeLeft(targetDateIso: string): CountdownState {
  if (!targetDateIso) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: false,
      isToday: false,
      isConfigured: false,
    };
  }

  const targetDate = new Date(targetDateIso);
  if (isNaN(targetDate.getTime())) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: false,
      isToday: false,
      isConfigured: false,
    };
  }

  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  // Check if it's the same calendar day
  const isSameDay =
    now.getFullYear() === targetDate.getFullYear() &&
    now.getMonth() === targetDate.getMonth() &&
    now.getDate() === targetDate.getDate();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      isToday: isSameDay,
      isConfigured: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    isToday: isSameDay,
    isConfigured: true,
  };
}
