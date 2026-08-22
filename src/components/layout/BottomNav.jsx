import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Bookmark, Bell, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: '/feed', icon: Home, label: 'Feed' },
    { to: '/explore', icon: Compass, label: 'Explore' },
    { to: '/wishlist', icon: Bookmark, label: 'Wishlist' },
    { to: '/notifications', icon: Bell, label: 'Alerts' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#09090b]/95 backdrop-blur-lg border-t border-zinc-800 sm:hidden">
      <div className="flex items-center justify-around py-2.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs transition ${
                isActive ? 'text-indigo-400 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`
            }
          >
            <item.icon size={20} />
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}