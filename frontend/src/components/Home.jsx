const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}
      >
        <div className="text-center bg-white/80 p-10 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            Welcome to Our Platform
          </h1>
          <p className="text-lg mb-6 text-gray-600">
            Join us and explore the amazing features!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
