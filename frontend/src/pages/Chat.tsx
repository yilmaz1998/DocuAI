import { useState } from 'react'
import { axiosInstance } from '../lib/axios'

interface Source {
  topic: string;
  source: string;
}
const Chat = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) return
    setAnswer('');
    setSources([]);
    setLoading(true);

    try {
      const response = await axiosInstance.post('/ask', { question });
      const data = response.data;
      console.log(data);
      setAnswer(data.answer);
      setSources(data.sources);
    } catch (error) {
      console.error('Error asking DocuAI:', error);
      setAnswer('Sorry, something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 px-4 item-center justify-center text-center">
      <h1 className="text-5xl mb-4">DocuAI</h1>

      <p className="text-gray-600 mb-6">
        Ask any question about <span className="font-semibold">React</span> concepts, web development patterns, and programming topics.      </p>

      <input
        type="text"
        placeholder="Try: What is a React hook?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        className="w-1/3 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors mb-6"
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? 'Asking...' : 'Ask DocuAI'}
      </button>

      {answer && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-lg shadow-blue-200">
          <p className='text-xl font-semibold text-blue-500 mb-1'>DocuAI's Answer:</p>
          <p className='bg-blue-50 px-3 py-2 rounded hover:bg-blue-100 transition-colors'>{answer}</p>

          {sources.length > 0 && (
            <div className="mt-6 rounded-lg p-2">
              <p className="text-xl font-semibold text-blue-500 mb-1">Sources:</p>
              <ul>
                {sources.map((source, index) => (
                  <li
                    key={index}
                    className="items-center justify-between bg-blue-50 py-2 rounded hover:bg-blue-100 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{source.topic} - </span>
                    <span className="text-gray-500 text-sm">{source.source}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Chat