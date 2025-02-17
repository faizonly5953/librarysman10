'use client';

import React, { useState, useEffect } from 'react';
import { Home, Users, Menu, X, BookOpen, User, LogOut } from 'lucide-react';
import { HomeContent } from './components/HomeContent';
import BorrowedBooks from './components/UserContent';
import { BookContent } from './components/CatalogComponent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/componentmain/FirebaseConfig';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const SidebarLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('home');
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'You must be authenticated to access this page.',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        router.push('/admin');
      });
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleSignOut = () => {
    Swal.fire({
      icon: 'info',
      title: 'Logging Out...',
      text: 'Please wait while we log you out.',
      timer: 2000,
      showConfirmButton: false
    });

    setTimeout(() => {
      signOut(auth).then(() => {
        router.push('/admin');
      });
    }, 2000);
  };

  return (
    <div className="flex h-max bg-gray-100">
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 z-20 transition duration-200 ease-in-out`}>
        <div className="flex flex-col h-full md:w-72 w-[35vh] bg-gray-800">
          <div className="flex items-center justify-between h-24 px-4 bg-gray-900 text-white">
              <div className="flex items-center space-x-5">
                <div className='bg-gray-800 p-3 rounded-full flex items-center justify-center'>
                  <User size={32} />
                </div>
              <div className="flex flex-col">
              <span className="text-xl font-semibold">Dashboard</span>
              <span className="text-sm text-gray-300">Welcome, {user.email}</span>
            </div>
            </div>
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2">
            <button onClick={() => setActiveContent('home')} className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${activeContent === 'home' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Home size={20} />
              <span>Home</span>
            </button>
            <button onClick={() => setActiveContent('user')} className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${activeContent === 'user' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <Users size={20} />
              <span>Users</span>
            </button>
            <button onClick={() => setActiveContent('catalog')} className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-colors ${activeContent === 'catalog' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
              <BookOpen size={20} />
              <span>Catalog</span>
            </button>
          </nav>
          <div className='m-3 text-start'>
          <button onClick={handleSignOut} className="flex gap-4 w-full max-w-xs mx-auto mt-8 px-3 py-2 text-white rounded-md hover:bg-gray-700 transition-colors">
            <LogOut />
              Sign Out
            </button>
            </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-white shadow">
          <div className="flex items-center md:h-0 h-16 px-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
        <main className="flex-1">
          {activeContent === 'home' && <HomeContent />}
          {activeContent === 'user' && <BorrowedBooks />}
          {activeContent === 'catalog' && <BookContent />}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;