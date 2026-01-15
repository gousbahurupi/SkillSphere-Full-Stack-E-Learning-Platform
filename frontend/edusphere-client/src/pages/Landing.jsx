const Landing = () => {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Learn Skills. Build Your Future.
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          SkillSphere is your all-in-one platform to learn modern skills,
          upgrade your career, and grow faster.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/courses"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Explore Courses
          </a>

          <a
            href="/signup"
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Landing;
