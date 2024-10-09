const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-md lg:block">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      {/* Compatibility Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Compatibility</h3>
        <div className="space-y-2">
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixel 4
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixel 4 XL
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixel 3a
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixel 3a XL
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixel 3
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixel 3 XL
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixel 2
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixel 2 XL
          </label>
        </div>
      </div>

      {/* Laptop Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Laptop</h3>
        <div className="space-y-2">
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixelbook Go
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixelbook
          </label>
        </div>
      </div>

      {/* Tablet Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Tablet</h3>
        <label className="block">
          <input type="checkbox" className="mr-2" /> Pixel Slate
        </label>
      </div>

      {/* Connected Home Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Connected Home</h3>
        <div className="space-y-2">
          <label className="block">
            <input type="checkbox" className="mr-2" /> Google Home
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Nest Cam IQ Outdoor
            Security Camera
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Nest Learning Thermostat
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Chromecast
          </label>
        </div>
      </div>

      {/* Entertainment Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Entertainment</h3>
        <div className="space-y-2">
          <label className="block">
            <input type="checkbox" className="mr-2" /> Stadia
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Pixel Buds
          </label>
        </div>
      </div>

      {/* Product Type Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Product Type</h3>
        <div className="space-y-2">
          <label className="block">
            <input type="checkbox" className="mr-2" /> Accessories
          </label>
        </div>
      </div>

      {/* Colors Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Colours</h3>
        <div className="space-y-2">
          <label className="block">
            <input type="checkbox" className="mr-2" /> Black
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> White
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Blue
          </label>
        </div>
      </div>

      {/* Brands Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Brands</h3>
        <label className="block">
          <input type="checkbox" className="mr-2" /> Google
        </label>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4">
        Apply Filters
      </button>

      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md w-full mt-2">
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;
