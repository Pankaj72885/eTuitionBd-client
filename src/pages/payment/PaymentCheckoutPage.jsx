import { applicationsAPI } from "@/api/applications.api";
import { paymentsAPI } from "@/api/payments.api";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

const PaymentCheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("applicationId");
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state (mock)
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
      // Mock payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call endpoint to create payment record and update statuses
      return paymentsAPI.createManualPayment({ applicationId });
    },
    onSuccess: () => {
      toast.success("Payment successful! Tutor hired.");
      navigate("/dashboard/student/payments");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Payment failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    payMutation.mutate();
    // Reset processing state is handled by mutation lifecycle if needed,
    // but we navigate away on success.
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500">Application not found.</p>
      </div>
    );
  }

  const { tuitionId, tutorId, expectedSalary } = application;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Secure Checkout
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Complete your payment to hire <strong>{tutorId?.name}</strong>.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tuition
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {tuitionId?.subject} - {tuitionId?.classLevel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tutor
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {tutorId?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monthly Salary
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    ৳ {expectedSalary}
                  </p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-xl font-bold text-brand dark:text-indigo-400">
                      ৳ {expectedSalary}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name on Card
                    </label>
                    <Input
                      placeholder="e.g. Rahim Uddin"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Card Number
                    </label>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expiry Date
                      </label>
                      <Input
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CVC
                      </label>
                      <Input
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full h-12 text-lg"
                      disabled={isProcessing || payMutation.isLoading}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <LoadingSpinner size="sm" /> Processing...
                        </div>
                      ) : (
                        `Pay ৳ ${expectedSalary}`
                      )}
                    </Button>
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                      <span className="inline-block mr-1">🔒</span>
                      Payments are secure and encrypted.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckoutPage;
