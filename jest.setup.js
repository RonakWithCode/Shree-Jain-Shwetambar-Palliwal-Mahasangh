import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.test' });

// Mock TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock fetch
global.fetch = jest.fn();

