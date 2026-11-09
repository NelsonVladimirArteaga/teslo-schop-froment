import React, { useRef, type KeyboardEvent } from 'react';
import { Search, Bell, MessageSquare, Settings } from 'lucide-react';
import { useAuthStore } from '@/auth/store/AuthStore';
import { useSearchParams } from 'react-router';

export const AdmHeader: React.FC = () => {
  const {user} = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  // const query = searchParams.get('query') || undefined;
  const inicial = user?.fullName.split(' ').map(n=>n[0].toUpperCase()).join(' ');
  const refValue = useRef<HTMLInputElement>(null)
  console.log(searchParams)
  const handleSearchQuery = (e:KeyboardEvent<HTMLInputElement>) =>{
  const value = refValue.current?.value || '';
  if(e.key === 'Enter') {
    setSearchParams((prev)=>{
      prev.set('query',value);
      prev.set('page','1')
      return prev;
    })}};
  
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-18">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={refValue}
              type="text"
              placeholder="Search..."
              onKeyDown={handleSearchQuery}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare size={20} />
          </button>
          
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            {inicial}
          </div>
        </div>
      </div>
    </header>
  );
};
