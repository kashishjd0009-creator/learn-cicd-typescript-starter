import { describe, it, expect } from 'vitest';
import { getAPIKey } from '../api/auth.js'; 
import { IncomingHttpHeaders } from "http";

describe('getAPIKey', () => {
  it('should return the key when a valid ApiKey header is provided', () => {
    const headers: IncomingHttpHeaders = {
      authorization: 'ApiKey secret-token-123',
    };
    
    const result = getAPIKey(headers);
    expect(result).toBe('secret-token-123');
  });

  it('should return null if the authorization header is missing', () => {
    const headers: IncomingHttpHeaders = {
      'content-type': 'application/json',
    };

    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  it('should return null if the prefix is not "ApiKey"', () => {
    const headers: IncomingHttpHeaders = {
      authorization: 'Bearer some-jwt-token',
    };

    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  it('should return null if the header format is malformed (no space)', () => {
    const headers: IncomingHttpHeaders = {
      authorization: 'ApiKey',
    };

    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  it('should be case-sensitive for the "ApiKey" prefix', () => {
    // Note: Your current implementation checks for exactly "ApiKey"
    const headers: IncomingHttpHeaders = {
      authorization: 'apikey token123',
    };

    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });
});