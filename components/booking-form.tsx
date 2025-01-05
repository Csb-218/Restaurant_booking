'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import BookingSummary from './booking-summary';
import { mergeDateAndTime } from '@/lib/utils';
import axios from 'axios';


const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

interface BookingFormValues {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: Date;
  time: string;
  specialRequests: string;
}

export default function BookingForm() {
  const [showSummary, setShowSummary] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormValues | null>(null);
  const [date, setDate] = useState<Date>();

  const initialValues: BookingFormValues = {
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: new Date(),
    time: '',
    specialRequests: '',
  };

  const validateForm = (values: BookingFormValues) => {
    const errors: Partial<Record<keyof BookingFormValues, string>> = {};

    if (!values.name) errors.name = 'Required';
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.phone) errors.phone = 'Phone number is required';
    if (values.phone.length<10) errors.phone = 'Enter a valid phone number';
    if (!values.time) errors.time = 'Please select a time to book';
    if (values.guests < 1) errors.guests = 'At least 1 guest required';
    if (values.guests > 10) errors.guests = 'Maximum 10 guests allowed';

    return errors;
  };

  const handleSubmit = async (values: BookingFormValues) => {

    try{

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/available`, 
        { date: mergeDateAndTime(values.date, values.time)});

      if (response.data.availablility === false) {
        alert("This time is not available. Please select another time.");
      } 
      
      else {

        try{
          const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/create`, 
          {
            "Name": values.name,
            "email": values.email,
            "Date": mergeDateAndTime(values.date, values.time),
            "guests": values.guests,
            "phone": values.phone,
            "SpecialRequest": values.specialRequests
          });

          if (response.status === 201) {
            setBookingData(values);
            setShowSummary(true);
          }

        }catch(err){
          alert("An error occured. Please try again later.")
          console.log(err)
        }
  
      }
    }catch(err){
      console.log(err)
    }

  };

  if (showSummary && bookingData) {
    return <BookingSummary booking={bookingData} onBack={() => setShowSummary(false)} />;
  }

  return (
    <Card className="p-6 bg-transparent backdrop-blur-sm">
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className={cn(
                    errors.name && touched.name && "border-red-500"
                  )}
                />
                {errors.name && touched.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className={cn(
                    errors.email && touched.email && "border-red-500"
                  )}
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className={cn(
                    errors.phone && touched.phone && "border-red-500"
                  )}
                />
                {errors.phone && touched.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Field
                  as={Input}
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="10"
                  className={cn(
                    errors.guests && touched.guests && "border-red-500"
                  )}
                />
                {errors.guests && touched.guests && (
                  <p className="mt-1 text-sm text-red-500">{errors.guests}</p>
                )}
              </div>

              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        setFieldValue('date', newDate);
                      }}
                      disabled={(date) =>
                        date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Time</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={ slot === values.time ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setFieldValue('time', slot)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot}
                    </Button>
                  ))}
                </div>
                {errors.time && touched.time && (
                  <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                )}
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Field
                  as="textarea"
                  id="specialRequests"
                  name="specialRequests"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Any dietary requirements or special requests?"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Book Table
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}