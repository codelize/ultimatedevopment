export default function LoginPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-white">User Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Username:</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 text-gray-900 bg-gray-200 rounded-md focus:outline-none"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-400">
            Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    );
  }
  