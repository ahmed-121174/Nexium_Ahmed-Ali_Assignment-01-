// pages/api/quotes.js
// This is a Next.js API route - runs on the server side

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category, limit = 3 } = req.query;
  
  // In Next.js, server-side env vars don't need NEXT_PUBLIC_ prefix
  const API_KEY = process.env.API_NINJAS_KEY;
  const API_URL = 'https://api.api-ninjas.com/v1/quotes';
  
  // Log environment info for debugging (Next.js specific)
  console.log('Next.js Environment:', process.env.NODE_ENV);
  console.log('API Key available:', !!API_KEY);
  
  // Check if API key exists
  if (!API_KEY) {
    console.error('API_NINJAS_KEY environment variable is not set');
    return res.status(500).json({ 
      success: false,
      error: 'API configuration error',
      message: 'API key not configured' 
    });
  }
  
  try {
    let url = `${API_URL}?limit=${limit}`;
    if (category && category.trim()) {
      url += `&category=${encodeURIComponent(category.trim())}`;
    }
    
    console.log('Fetching from URL:', url);
    console.log('Using API Key:', API_KEY ? 'Key present' : 'Key missing');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
        'User-Agent': 'Quote-Generator/1.0'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response Error:', response.status, response.statusText);
      console.error('Error details:', errorText);
      
      return res.status(response.status).json({
        success: false,
        error: `API request failed: ${response.status}`,
        message: errorText || response.statusText,
        details: {
          status: response.status,
          statusText: response.statusText
        }
      });
    }

    const data = await response.json();
    console.log('API Response Data:', data);
    
    // Check if data is an array and has content
    if (!Array.isArray(data) || data.length === 0) {
      console.log('No quotes returned from API');
      return res.status(200).json({
        success: false,
        data: [],
        message: 'No quotes found for this category'
      });
    }
    
    // Return the data with success status
    res.status(200).json({
      success: true,
      data: data,
      source: 'api'
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch quotes',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}