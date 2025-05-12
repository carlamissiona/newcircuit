// Show dashboard page
const showDashboard = (req, res) => {
  // Dashboard data for the authenticated user
  const dashboardData = {
    stats: {
      projects: 12,
      tasks: 48,
      completed: 32,
      pending: 16
    },
    recentActivity: [
      { action: 'Completed task', item: 'Design homepage', time: '2 hours ago' },
      { action: 'Added new task', item: 'Implement login page', time: '4 hours ago' },
      { action: 'Updated project', item: 'Client website redesign', time: '1 day ago' },
      { action: 'Joined project', item: 'Mobile app development', time: '3 days ago' }
    ]
  };

  res.render('dashboard', {
    title: 'Dashboard',
    user: req.user,
    data: dashboardData
  });
};

module.exports = {
  showDashboard
};