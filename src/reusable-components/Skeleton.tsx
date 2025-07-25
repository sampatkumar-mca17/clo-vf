import React from "react";
import "./Skeleton.scss";
function SkeletonLoader() {
    return (
      <div className="h-screen w-screen bg-gray-200 relative overflow-hidden skeleton-item">
      </div>
    );
}
export default SkeletonLoader
