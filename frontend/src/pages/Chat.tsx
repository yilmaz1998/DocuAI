const Chat = () => {
  return (
    <div className="max-w-2xl mx-auto mt-16 px-4 item-center justify-center text-center">
      <h1 className="text-5xl mb-4">DocuAI</h1>

      <p className="text-gray-600 mb-6">
        Ask any question about <span className="font-semibold">React</span> concepts, web development patterns, and programming topics.      </p>

      <input
        type="text"
        placeholder="Try: What is a React hook?"
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        className="w-1/3 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors mb-6"
      >
        Ask DocuAI
      </button>
    </div>
  )
}

export default Chat