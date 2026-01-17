import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { enrollCourse } from "../../services/enrollment.service";

/* ================= ICONS ================= */

const LockIcon = () => (
  <svg
    className="w-6 h-6 text-green-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const Spinner = () => (
  <svg
    className="w-6 h-6 animate-spin"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

/* ================= PAGE ================= */

const Payment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setProcessing(true);
      await enrollCourse(courseId);
      navigate("/my-courses");
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="glass max-w-md w-full rounded-3xl p-8">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <LockIcon />
          <h1 className="text-2xl font-bold">
            Secure Payment
          </h1>
        </div>

        <p className="text-gray-300 text-sm mb-6">
          Complete your enrollment securely. This is a demo
          checkout flow for learning purposes.
        </p>

        {/* PAYMENT INFO */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Payment Method</span>
            <span className="font-medium">
              Demo Wallet
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Transaction</span>
            <span className="font-medium">
              One-time enrollment
            </span>
          </div>

          <div className="flex justify-between text-lg font-semibold border-t border-white/10 pt-4">
            <span>Total</span>
            <span>₹ Course Fee</span>
          </div>
        </div>

        {/* ACTION */}
        <button
          onClick={handlePayment}
          disabled={processing}
          className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition ${
            processing
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {processing ? (
            <>
              <Spinner />
              Processing Payment
            </>
          ) : (
            "Pay & Enroll"
          )}
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 mt-6 text-center">
          Your payment information is not stored.
          <br />
          This is a secure demo transaction.
        </p>
      </div>
    </div>
  );
};

export default Payment;
