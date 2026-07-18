'use client'

// WARNING: For static export, we need to generate tokens client-side
// This requires exposing STREAM_SECRET_KEY which is a security risk
// For production, consider using a server-side API or different deployment method
// This uses a simple JWT-like token generation for Stream.io
export const createTokenProvider = (userId: string) => {
  return async () => {
    if (!userId) throw new Error('User not logged in');
    
    // For static export, token generation should ideally be done via an external API
    // This is a placeholder - you'll need to implement proper JWT token generation
    // or use an external token generation service
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    
    if (!apiKey) throw new Error('No API Key');
    
    // TODO: Implement proper client-side token generation or use external API
    // For now, this will need to be handled differently
    // You may need to set up a separate token generation endpoint
    throw new Error('Token generation not implemented for static export. Please use an external token service or different deployment method.');
  };
};

