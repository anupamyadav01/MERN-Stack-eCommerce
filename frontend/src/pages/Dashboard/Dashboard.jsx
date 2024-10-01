const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Secondary Navbar for admin actions */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Admin Dashboard
        </h1>
        {/* Your dashboard content here */}
        <p>Welcome to the admin dashboard. Choose an action from the navbar.</p>
      </div>
    </div>
  );
};

export default Dashboard;
