export default function GuaranteeStatement(): React.JSX.Element {
  return (
    <div className="mb-5">
      <h3 className="font-normal text-md mb-4 z-10 flex flex-row items-center">
        Guarantee Statement{" "}
        <span className="ml-1 text-green-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
        </span>
      </h3>
      <div>
        <p className="font-light">
          We stand behind the quality of our products/services and are committed
          to ensuring your satisfaction. That’s why we offer a 7-day money-back
          guarantee.
        </p>
        <p className="font-light mt-3">
          If you are not completely satisfied with your purchase, simply contact
          our support team within 7 days of your purchase, and we will provide a
          full refund or replacement—no questions asked.{" "}
        </p>
        <p className="font-light mt-3">
          Your trust is our priority, and we are confident that you will love
          our product/service. If you have any concerns, our customer support
          team is always here to help.
        </p>
        <p className="font-light mt-3">
          Guaranteed quality. Guaranteed satisfaction. Guaranteed peace of mind
        </p>
      </div>
    </div>
  );
}
