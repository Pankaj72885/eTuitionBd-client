import { applicationsAPI } from "@/api/applications.api";
import { paymentsAPI } from "@/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProtectedImage from "@/components/common/ProtectedImage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CreditCardIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

const PaymentCheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("applicationId");
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const { data: application, isLoading } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => applicationsAPI.getApplicationById(applicationId),
    enabled: !!applicationId,
  });

  const payMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return paymentsAPI.createManualPayment({ applicationId });
    },
    onSuccess: () => {
      toast.success("Payment successful! Tutor hired.");
      navigate("/dashboard/student/payments");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Payment failed");
      setIsProcessing(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    payMutation.mutate();
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  // Format expiry with slash
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <CreditCardIcon className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Application not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We couldn't find the payment details for this application.
          </p>
          <Button
            onClick={() => navigate("/dashboard/student")}
            className="gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  const { tuitionId, tutorId, expectedSalary } = application;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 md:py-12 px-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 mb-4">
            <LockClosedIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Secure Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your payment to hire{" "}
            <strong className="text-gray-900 dark:text-white">
              {tutorId?.name}
            </strong>
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-indigo-600" />
                  Order Summary
                </h2>

                {/* Tutor Info */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 mb-6">
                  <ProtectedImage
                    src={tutorId?.photoUrl}
                    alt={tutorId?.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {tutorId?.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tutorId?.city}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Tuition
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tuitionId?.subject} - {tuitionId?.classLevel}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Schedule
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tuitionId?.schedule || "As agreed"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Monthly Salary
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ৳ {expectedSalary}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Platform Fee
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ৳ 0
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      ৳ {expectedSalary}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CreditCardIcon className="w-5 h-5 text-indigo-600" />
                  Payment Details
                </h2>

                {/* Card Icons */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Visa
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Mastercard
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      bKash
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <Input
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="rounded-xl h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Number
                    </label>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      className="rounded-xl h-12 font-mono"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <Input
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(formatExpiry(e.target.value))
                        }
                        className="rounded-xl h-12 font-mono"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVC
                      </label>
                      <Input
                        placeholder="123"
                        value={cvc}
                        onChange={(e) =>
                          setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        className="rounded-xl h-12 font-mono"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-14 text-lg gap-2"
                      disabled={isProcessing || payMutation.isPending}
                    >
                      {isProcessing ? (
                        <>
                          <LoadingSpinner size="sm" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <LockClosedIcon className="w-5 h-5" />
                          Pay ৳ {expectedSalary}
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm">SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <LockClosedIcon className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm">Encrypted</span>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckoutPage;
