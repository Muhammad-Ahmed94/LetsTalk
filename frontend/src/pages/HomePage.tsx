import MessageContainer from "../components/messages/MessageContainer"
import Sidebar from "../components/sidebar/Sidebar"

const HomePage = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded overflow-hidden bg-black_full border-2 border-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default HomePage