// src/pages/Home.jsx
const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome to NIV Sport</h1>
      <p className="text-lg text-gray-700 mb-4">
        NIV Sport is your hub for everything football. We bring you the latest news, exciting events, and exclusive media straight from the heart of the game.
      </p>
      <div className="mt-8">
        <img
          src="/team-banner.jpg"
          alt="Team banner"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Home;
