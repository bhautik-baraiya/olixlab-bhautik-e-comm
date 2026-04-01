import { Suspense } from "react";
import PaymentSuccess from "./PaymentSuccess"; 
import Loader from "@/components/ui/loader";

export default function SuccessPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PaymentSuccess />
    </Suspense>
  );
}