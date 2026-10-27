import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { TaskProvider, useTaskContext } from './context/TaskContext.jsx';
import Sidebar from './components/Layout/Sidebar.jsx';
import IconSidebar from './components/Layout/IconSidebar.jsx';
import Header from './components/Layout/Header.jsx';
import MobileNav from './components/Layout/MobileNav.jsx';
import Toast from './components/UI/Toast.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import Calendar from './pages/Calendar.jsx';
import Statistics from './pages/Statistics.jsx';
import Categories from './pages/Categories.jsx';
import Completed from './pages/Completed.jsx';
import Settings from './pages/Settings.jsx';
import GlobalTaskModal from './GlobalTaskModal.jsx';

const AppLayout = () => {
  const { toastData, openTaskModal } = useTaskContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) searchInput.focus();
      }
      if (e.key === 'N') {
        e.preventDefault();
        openTaskModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [navigate, openTaskModal]);

  return (
    <div className="app-container">
      <Sidebar />
      <IconSidebar />
      <div className="main-content">
        <Header />
        <main className="page-wrapper no-scrollbar">
          <Outlet />
        </main>
      </div>
      <MobileNav />
      <Toast toast={toastData} />
      <GlobalTaskModal />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'tasks/:id', element: <TaskDetails /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'statistics', element: <Statistics /> },
      { path: 'categories', element: <Categories /> },
      { path: 'completed', element: <Completed /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

const App = () => (
  <ThemeProvider>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </ThemeProvider>
);
export default App;
