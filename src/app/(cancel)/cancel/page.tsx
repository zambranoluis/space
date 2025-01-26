"use client";

const CancelPage: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-red-100'>
      <h1 className='text-4xl font-bold text-red-600'>Payment Cancelled</h1>
      <p className='mt-4 text-lg'>Your payment was not processed. You can try again.</p>
      <button
        onClick={() => (window.location.href = "/panel-client")}
        className='mt-6 px-4 py-2 bg-red-600 text-white rounded-md'>
        Return to Dashboard
      </button>
    </div>
  );
};

export default CancelPage;
