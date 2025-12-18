// src/services/authService.js

const BASE_URL = "http://localhost:5000";

export const loginAPI = async (email, password) => {
  try {
    console.log("📤 Sending login request to:", `${BASE_URL}/api/auth/login`);
    
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    console.log("📥 Response status:", res.status);
    
    const data = await res.json();
    console.log("📦 API Response data:", data); // Debug what API returns
    
    // ✅ FIX: Check what your API actually returns
    // Most APIs return either:
    // 1. { success: true, user: {...} }
    // 2. { user: {...}, token: "..." }
    // 3. Just { user: {...} }
    
    // Adapt to your API response
    if (data.user) {
      // If API returns user object
      return {
        success: true,
        user: data.user,
        token: data.token, // optional
        message: data.message || "Login successful"
      };
    } else if (data.success !== undefined) {
      // If API already has success field
      return data;
    } else {
      // If API returns something unexpected
      return {
        success: false,
        message: "Invalid response from server"
      };
    }
    
  } catch (err) {
    console.error("❌ Login API error:", err);
    return { 
      success: false, 
      message: "Server error. Please try again." 
    };
  }
};

export const signupAPI = async (userData) => {
  try {
    console.log("📤 Sending signup request to:", `${BASE_URL}/api/auth/register`);
    console.log("📦 Sending data:", userData);
    
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ ADD THIS if your backend uses cookies
      body: JSON.stringify(userData),
    });

    console.log("📥 Response status:", res.status);
    
    const data = await res.json();
    console.log("📦 API Response data:", data);
    console.log('🔍 BACKEND RESPONSE FULL:', data);
console.log('🔍 User object keys:', data.user ? Object.keys(data.user) : 'No user');
    // Check if response is successful
    if (!res.ok) {
      console.error("❌ API error response:", data);
      return {
        success: false,
        message: data.message || `Server error: ${res.status}`
      };
    }
    
    // ✅ FIX: Handle different API response formats
    if (data.user) {
      return {
        success: true,
        user: data.user,
        token: data.token,
        message: data.message || "Registration successful"
      };
    } else if (data.success !== undefined) {
      return data;
    } else {
      return {
        success: false,
        message: "Invalid response from server"
      };
    }
    
  } catch (err) {
    console.error("🔥 Signup API error:", err);
    return { 
      success: false, 
      message: "Network error. Check if server is running." 
    };
  }
};