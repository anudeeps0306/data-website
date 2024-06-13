const ContactUs = () => {
  return (
    <div className="bg-[#222831] text-[#EEEEEE] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border border-gray-300 bg-[#393E46] text-[#EEEEEE] rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 bg-[#393E46] text-[#EEEEEE] rounded-md"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 p-2 w-full border border-gray-300 bg-[#393E46] text-[#EEEEEE] rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-[#00ADB5] text-white font-semibold rounded-md hover:bg-[#00a0a5]"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
