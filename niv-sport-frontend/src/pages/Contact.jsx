const Contact = () => {
  return (
    <div className="min-h-screen bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-sky-400">Contact Us</h2>

        <form className="bg-white rounded-xl shadow-lg p-8 space-y-6 text-blue-900">
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              rows="5"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Your message..."
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-sky-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-sky-600 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
