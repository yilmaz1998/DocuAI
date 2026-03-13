import image from "../public/image.png"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <div
        className="absolute inset-0 block md:hidden bg-cover bg-top"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-top"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
        <h1 className="text-3xl md:text-5xl text-white">
          DocuAI
        </h1>
        <p className="text-white md:text-lg max-w-xl">
          Ask any question about React concepts, web development patterns, and programming topics.
        </p>

        <div className="flex gap-3 mt-3">
          <Link
            to="/chat"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Start Asking
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home