"use client";

const SuccessPage: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-green-100'>
      <h1 className='text-4xl font-bold text-green-600'>Payment Successful!</h1>
      <p className='mt-4 text-lg'>
        Thank you for your purchase. Your order is now in development.
      </p>
      <button
        onClick={() => (window.location.href = "/panel-client")}
        className='mt-6 px-4 py-2 bg-green-600 text-white rounded-md'>
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessPage;
