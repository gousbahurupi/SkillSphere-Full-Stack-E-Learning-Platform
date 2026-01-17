import { Link } from "react-router-dom";
import logo from "../assets/skillsphere.svg";

const Landing = () => {
  return (
    <div className="text-white">
      {/* ================= HERO ================= */}
      <section className="min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="SkillSphere" className="h-10" />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Learn Skills. <br />
              <span className="text-gradient">Build Your Future.</span>
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              SkillSphere helps you learn modern, job-ready skills through
              structured courses, progress tracking, and hands-on lessons.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/courses"
                className="px-8 py-3 bg-primary rounded-xl font-semibold hover:opacity-90 transition"
              >
                Explore Courses
              </Link>

              <Link
                to="/signup"
                className="px-8 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:block">
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-semibold mb-4">
                What you can do on SkillSphere
              </h3>
              <ul className="space-y-3 text-gray-200">
                <li>✔ Learn at your own pace</li>
                <li>✔ Track lesson & course progress</li>
                <li>✔ Free & paid professional courses</li>
                <li>✔ Resume-ready skill development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-background rounded-t-xl rounded-b-xl">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Why Choose SkillSphere?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Structured Learning"
              desc="Courses are divided into lessons so you always know what to learn next."
            />
            <FeatureCard
              title="Progress Tracking"
              desc="Track completed lessons and course progress automatically."
            />
            <FeatureCard
              title="Free & Paid Courses"
              desc="Start with free content or unlock premium courses anytime."
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            How SkillSphere Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <Step number="1" title="Create Account" />
            <Step number="2" title="Enroll in Courses" />
            <Step number="3" title="Complete Lessons" />
            <Step number="4" title="Track Progress" />
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 text-center bg-background rounded-t-xl rounded-b-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Learning Today
        </h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Join SkillSphere and take the next step toward mastering
          in-demand skills.
        </p>

        <Link
          to="/signup"
          className="inline-block px-10 py-4 bg-primary rounded-xl font-semibold hover:opacity-90 transition"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const FeatureCard = ({ title, desc }) => (
  <div className="glass p-6 rounded-2xl">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-300">{desc}</p>
  </div>
);

const Step = ({ number, title }) => (
  <div className="glass p-6 rounded-2xl">
    <div className="text-primary text-3xl font-bold mb-3">
      {number}
    </div>
    <p className="font-semibold">{title}</p>
  </div>
);

export default Landing;
