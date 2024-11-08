export default function RegisterPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-lg p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">User Registration</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">ID:</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
                placeholder="Enter ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Name:</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">RM:</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
                placeholder="Enter RM"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">CPF:</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
                placeholder="Enter CPF"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">RG:</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
                placeholder="Enter RG"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Profession:</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
                placeholder="Enter Profession"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Image:</label>
              <input
                type="file"
                className="w-full mt-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-center text-gray-400">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
          </p>
        </div>
      </div>
    );
  }
  