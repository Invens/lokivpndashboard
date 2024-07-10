"use client"
import React, { useState } from 'react';
import Sidebar from './Siderbar';
import Dashboard from './Dashboard';
import Users from './pages/users';
import Servers from './pages/servers'
import Subscription from './pages/subscriptions'
import Notification from './pages/notifications'
import NotificationHistory from './pages/notificationhistory'
import Paymentgateway from './pages/paymentgateway';
const Layout = ({ children }) => {
  const [content, setContent] = useState(null);

  const handleSidebarClick = (page) => {
    // Example logic to set content based on sidebar item clicked
    switch (page) {
      case 'dashboard':
        setContent(<DashboardContent />);
        break;
      case 'users':
        setContent(<UsersContent />);
        break;
      case 'servers':
        setContent(<ServersContent />);
        break;
      case 'paymentgateway':
        setContent(<PaymentGatewayContent />);
        break;
      case 'subscriptions':
        setContent(<SubscriptionsContent />);
        break;
      case 'notifications':
        setContent(<NotificationsContent />);
        break;
      case 'notificationhistory':
        setContent(<NotificationHistoryContent />);
        break;
      default:
        setContent(null);
        break;
    }
  };

  const DashboardContent = () => (
   <><Dashboard/></>
  );

  const UsersContent = () => (
    <div className="mb-4">
    <Users/>
    </div>
  );

  const ServersContent = () => (
    <div className="mb-4">
     <Servers/>
     </div>
  );

  const SubscriptionsContent = () => (
    <div className="mb-4">
      <Subscription/>
    </div>
  );

  const NotificationsContent = () => (
    <div className="mb-4">
      <Notification/>
    </div>
  );

  const NotificationHistoryContent = () => (
    <div className="mb-4">
    <NotificationHistory/>
    </div>
  );
  const PaymentGatewayContent = () => (
    <div className="mb-4">
    <Paymentgateway/>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar onSidebarClick={handleSidebarClick} />
      <div className="">
        {content ? (
          <div className="">
            {content}
          </div>
        ) : (
         <Dashboard/>
        )}
      </div>
    </div>
  );
};

export default Layout;
