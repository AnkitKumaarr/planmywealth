export default function ReferContent() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Refer & Earn</h1>
        <div className="bg-green-50 px-4 py-2 rounded-lg flex items-center">
          <span className="mr-2">Amount Earned</span>
          <span className="font-semibold">₹0</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="max-w-md mx-auto">
          <img 
            src="/refer-earn.png" 
            alt="Refer and Earn"
            className="w-48 h-48 mx-auto mb-6"
          />
          <h2 className="text-2xl font-semibold mb-2">Refer and win ₹500</h2>
          <p className="text-gray-600 mb-6">
            Get ₹500 for <span className="font-semibold">every</span> policy bought through your referral link.
          </p>
          
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg mb-6">
            <input
              type="text"
              value="beshak.org/referral/L56wsa"
              className="flex-1 bg-transparent outline-none"
              readOnly
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Share
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">OR, SHARE VIA</p>
            <div className="flex justify-center gap-4">
              <button className="p-2 bg-blue-600 text-white rounded-lg">FB</button>
              <button className="p-2 bg-black text-white rounded-lg">X</button>
              <button className="p-2 bg-blue-500 text-white rounded-lg">Li</button>
              <button className="p-2 bg-orange-500 text-white rounded-lg">Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 