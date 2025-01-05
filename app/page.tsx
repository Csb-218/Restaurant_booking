import { Utensils } from 'lucide-react';
import BookingForm from '@/components/booking-form';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Utensils className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">La Belle Cuisine</h1>
            </div>
          </div>
        </div>
      </header>

      <main className={` mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center`}>
        <div className={`text-center mb-12 `}>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Reserve Your Table</h2>
          <p className="text-lg text-gray-100 dark:text-gray-300">Experience exceptional dining at La Belle Cuisine</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <BookingForm />
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} La Belle Cuisine. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}