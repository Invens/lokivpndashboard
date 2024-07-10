import React from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Storage as StorageIcon,
  Notifications as NotificationsIcon,
  History as HistoryIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

const Sidebar = ({ onSidebarClick }) => {
  const handleClick = (page) => {
    onSidebarClick(page);
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-[100vh]">
      <div className="p-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Appmontize VPN</h1>
      </div>
      <nav className="flex-1">
        <List>
          <ListItem button className="hover:bg-gray-700" onClick={() => handleClick('dashboard')}>
            <ListItemIcon>
              <DashboardIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button className="hover:bg-gray-700" onClick={() => handleClick('users')}>
            <ListItemIcon>
              <PeopleIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button className="hover:bg-gray-700" onClick={() => handleClick('servers')}>
            <ListItemIcon>
              <StorageIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Servers" />
          </ListItem>
          <ListItem button className="hover:bg-gray-700" onClick={() => handleClick('subscriptions')}>
            <ListItemIcon>
              <MoneyIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Subscription" />
          </ListItem>
          <ListItem button className="hover:bg-gray-700" onClick={() => handleClick('paymentgateway')}>
            <ListItemIcon>
              <MoneyIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="payment Method" />
          </ListItem>
          <ListItem button className="hover:bg-gray-700" onClick={() => handleClick('notifications')}>
            <ListItemIcon>
              <NotificationsIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button className="hover:bg-gray-700" onClick={() => handleClick('notificationhistory')}>
            <ListItemIcon>
              <HistoryIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Notification History" />
          </ListItem>
          <ListItem button className="hover:bg-gray-700">
            <ListItemIcon>
              <HelpIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
          <ListItem button className="hover:bg-gray-700">
            <ListItemIcon>
              <SettingsIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </nav>
    </div>
  );
};

export default Sidebar;
