import AppRoutes from "./routes/AppRoutes";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 md:px-8 pt-6">
        <AppRoutes />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
