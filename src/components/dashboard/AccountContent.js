import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";

export default function AccountContent() {
  const { user, updateProfile, uploadProfileImage, checkReferralCode } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/referral/${user?.user_referral_code}`;
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    user_referral_code: ""
  });
  const [referralCodeStatus, setReferralCodeStatus] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        mobile: user.mobile || "",
        user_referral_code: user.user_referral_code || ""
      });
      setImagePreview(user.profile_image || null);
    }
  }, [user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 10000); // Reset after 10 seconds
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || "",
      mobile: user?.mobile || "",
      user_referral_code: user?.user_referral_code || ""
    });
    setImagePreview(user?.profile_image || null);
    setReferralCodeStatus(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "user_referral_code" && value !== user?.user_referral_code) {
      checkReferralCodeAvailability(value);
    }
  };

  const checkReferralCodeAvailability = debounce(async (code) => {
    if (!code || code.length < 4) {
      setReferralCodeStatus(null);
      return;
    }

    const result = await checkReferralCode(code);
    if (result.success) {
      setReferralCodeStatus(result.isAvailable ? "available" : "unavailable");
    } else {
      setReferralCodeStatus(null);
    }
  }, 500);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (referralCodeStatus === "unavailable") {
      alert("Please choose a different referral code");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First upload image if there's a new one
      if (fileInputRef.current?.files?.length > 0) {
        const file = fileInputRef.current.files[0];
        const imageResult = await uploadProfileImage(file);
        if (!imageResult.success) {
          throw new Error(imageResult.error);
        }
      }
      
      // Then update profile data
      const result = await updateProfile(formData);
      if (!result.success) {
        throw new Error(result.error);
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold">Account Details</h1>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Edit
          </button>
        ) : null}
      </div>

      <div className="bg-white rounded-lg shadow p-4 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                disabled={!isEditing}
              />
              <div 
                onClick={handleImageClick}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-lg flex items-center justify-center overflow-hidden ${isEditing ? 'cursor-pointer hover:opacity-80' : ''}`}
                style={{
                  backgroundColor: imagePreview ? 'transparent' : '#0d9488',
                }}
              >
                {imagePreview ? (
                  <img 
                    src={imagePreview.startsWith('data:') ? imagePreview : imagePreview} 
                    alt={user?.name || "Profile"} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl md:text-6xl text-white">
                    {user?.name?.charAt(0).toUpperCase() || "X"}
                  </span>
                )}
              </div>
              {isEditing && (
                <div className="text-xs text-center mt-1 text-gray-500">
                  Click to change
                </div>
              )}
            </div>

            <div className="space-y-4 md:space-y-6 flex-1 w-full">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="text-base md:text-lg">
                    {user?.name || "Loading..."}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Mobile No.
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your mobile number"
                  />
                ) : (
                  <div className="text-base md:text-lg">
                    {user?.mobile || "----"}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email Address
                </label>
                <div className="text-base md:text-lg">
                  {user?.email || "Loading..."}
                </div>
              </div>
              
              {(user?.role === "manager" || user?.role === "admin") && (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Your Referral Code
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        name="user_referral_code"
                        value={formData.user_referral_code}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                          referralCodeStatus === "unavailable" 
                            ? "border-red-500" 
                            : referralCodeStatus === "available" 
                              ? "border-green-500" 
                              : "border-gray-300"
                        }`}
                        placeholder="Enter your referral code"
                      />
                      {referralCodeStatus === "unavailable" && (
                        <p className="text-red-500 text-xs mt-1">This referral code is already in use</p>
                      )}
                      {referralCodeStatus === "available" && (
                        <p className="text-green-500 text-xs mt-1">This referral code is available</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-base md:text-lg flex items-center gap-2">
                      {user?.user_referral_code || "Loading..."}
                      <button
                        onClick={handleCopy}
                        className="rounded hover:bg-gray-100 p-1"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                          />
                        </svg>
                      </button>
                      {copied && (
                        <span className="text-sm text-green-600">Copied!</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {isEditing && (
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading || referralCodeStatus === "unavailable"}
                    className={`px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors ${
                      isLoading || referralCodeStatus === "unavailable" ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
