export default function Loader({
  msg,
  subMsg,
}: {
  msg?: string;
  subMsg?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]">
      <div className="house-loader mb-8">
        <div className="house-roof"></div>
        <div className="house-body"></div>
        <div className="house-door"></div>
        <div className="house-window"></div>
        <div className="house-window-2"></div>
      </div>

      <div className="text-xl font-medium text-primary mb-6">
        Loading {msg || "..."}
      </div>

      <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary shimmer"
          style={{ width: "60%" }}
        ></div>
      </div>

      {subMsg && <div className="mt-4 text-sm text-gray-500">{subMsg}</div>}
    </div>
  );
}
