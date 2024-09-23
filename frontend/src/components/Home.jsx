const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}
      >
        <div className="text-center bg-white/70 dark:bg-gray-800/70 p-10 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Welcome to Our Platform
          </h1>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
            Join us and explore the amazing features!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
