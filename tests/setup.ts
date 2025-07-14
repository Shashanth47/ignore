import { testAuth, testDb, testStorage } from './firebase-test-config.js';

// Test data generators
export const generateTestData = {
  teacher: {
    email: () => `teacher_${Date.now()}@test.com`,
    password: 'testPassword123',
    name: () => `Test Teacher ${Date.now()}`
  },
  parent: {
    email: () => `parent_${Date.now()}@test.com`,
    password: 'testPassword123',
    name: () => `Test Parent ${Date.now()}`,
    kidsName: () => `Test Kid ${Date.now()}`
  },
  post: {
    content: () => `Test post content ${Date.now()}`,
    tags: ['homework', 'announcement'],
    studentIds: ['student1', 'student2']
  },
  message: {
    content: () => `Test message ${Date.now()}`
  }
};

// Test utilities
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const cleanup = {
  async all() {
    // Cleanup function to remove test data
    console.log('Cleaning up test data...');
  }
};
