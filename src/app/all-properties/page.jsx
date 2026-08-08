import { Suspense } from "react";
import AllProperties from "../../components/AllProperties";
// import AllProperties from "./AllProperties";

export default function AllPropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AllProperties />
    </Suspense>
  );
}