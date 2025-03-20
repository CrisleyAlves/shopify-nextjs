export default function BasicNavbar() {
  return (
    <>
      <h1 className="text-center p-5 font-bold md:block uppercase shadow-md bg-white text-black/85">
        <a href="/">Beyond</a>
      </h1>
      <div className="px-5 text-center w-full py-2 bg-yellow-300 text-yellow-900 border-yellow-600 text-sm">
        <p>
          <strong>Checkout</strong> flow is handled by <strong>SHOPIFY</strong>,
          since they would charge me to provide this specific part for you, I
          coded this page just to provide you the experience.
        </p>
      </div>
    </>
  );
}
