'use client';

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Calendar, Users, Clock, MessageSquare } from 'lucide-react';

interface BookingSummaryProps {
  booking: {
    name: string;
    email: string;
    phone: string;
    guests: number;
    date: Date;
    time: string;
    specialRequests?: string;
  };
  onBack: () => void;
}

export default function BookingSummary({ booking, onBack }: BookingSummaryProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white dark:bg-gray-900">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Booking Confirmed!</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Thank you for your reservation, {booking.name}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span>{format(new Date(booking.date), 'EEEE, MMMM do, yyyy')}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
            <Clock className="h-5 w-5 text-gray-400" />
            <span>{booking.time}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
            <Users className="h-5 w-5 text-gray-400" />
            <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
          </div>

          {booking.specialRequests && (
            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <MessageSquare className="h-5 w-5 text-gray-400 mt-1" />
              <span>{booking.specialRequests}</span>
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Contact Information</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>Email: {booking.email}</p>
            <p>Phone: {booking.phone}</p>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full"
          >
            Make Another Booking
          </Button>
        </div>
      </Card>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>A confirmation email has been sent to {booking.email}</p>
        <p className="mt-1">For any changes to your booking, please contact us directly.</p>
      </div>
    </div>
  );
}