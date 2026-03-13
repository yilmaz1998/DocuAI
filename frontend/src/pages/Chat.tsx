import { useState } from 'react'
import { axiosInstance } from '../lib/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom';

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
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex flex-col sm:flex-row gap-2 justify-center mb-6 mt-6">
        <Link to="/" className="flex-1">
          <button className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors">
            Go Back
          </button>
        </Link>

        <button
          className="flex-1 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleAsk}
          disabled={loading}
        >
          {loading ? 'Asking...' : 'Ask DocuAI'}
        </button>
      </div>

      <AnimatePresence>
        {answer && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-gray-50 rounded-lg shadow-lg shadow-blue-200"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Chat