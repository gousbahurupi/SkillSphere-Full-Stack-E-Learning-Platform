import AppRoutes from "./routes/AppRoutes";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
