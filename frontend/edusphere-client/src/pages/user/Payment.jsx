import { useParams, useNavigate } from "react-router-dom";
import { enrollCourse } from "../../services/enrollment.service";

const Payment = () => {
  
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  const handlePayment = async () => {
    console.log("Processing payment for course ID:", courseId);
    console.log(typeof(courseId));
    await enrollCourse(courseId);
    alert("Payment successful!");
    navigate("/my-courses");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Demo Payment</h1>

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Pay & Enroll
      </button>
    </div>
  );
};

export default Payment;
