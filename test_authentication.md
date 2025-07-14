# Authentication Test Guide

## Test Values for Parent Sign-Up

### Parent Test Data
- **Email**: `parent@test.com`
- **Password**: `TestPass123!`
- **Parent Name**: `John Smith`
- **Child Name**: `Emma Smith`
- **Class Code**: `class-123` (You'll need to create a teacher account first to get a real class code)

### Teacher Test Data
- **Email**: `teacher@test.com`
- **Password**: `TestPass123!`
- **Teacher Name**: `Ms. Johnson`

## Steps to Test

### 1. Test Teacher Sign-Up (Create this first)
1. Go to your application
2. Select "Teacher" option
3. Click "Sign Up"
4. Fill in:
   - Email: `teacher@test.com`
   - Password: `TestPass123!`
   - Name: `Ms. Johnson`
   - Confirm Password: `TestPass123!`
5. Click "Create Account"
6. Note the class code generated (it will be something like `class-[unique-id]`)

### 2. Test Teacher Sign-In
1. Use the same email and password to sign in
2. Check if teacher name appears in the app

### 3. Test Parent Sign-Up
1. Go to your application
2. Select "Parent" option
3. Click "Sign Up"
4. Fill in:
   - Email: `parent@test.com`
   - Password: `TestPass123!`
   - Parent Name: `John Smith`
   - Child Name: `Emma Smith`
   - Class Code: `[use the class code from teacher sign-up]`
5. Click "Create Account"

### 4. Test Parent Sign-In
1. Use the same email and password to sign in
2. Check if parent name appears in the welcome message
3. Check if child name appears in the profile section

## Expected Results

### Parent App Should Show:
- Welcome message: "Hello, John Smith!" on home page
- Header: "Welcome, John Smith" instead of "Early Education"
- Profile page:
  - Parent name: "John Smith"
  - Child info: "Emma Smith's Parent"
  - Class code display
  - Email from Firebase Auth

### Teacher App Should Show:
- Teacher name in relevant sections
- Class code for sharing with parents

## Troubleshooting Common Issues

### 400 Bad Request Errors:
1. **Invalid Email Format**: Make sure email follows standard format
2. **Password Too Weak**: Firebase requires passwords to be at least 6 characters
3. **Missing Required Fields**: All fields marked as required must be filled
4. **Invalid Class Code**: Make sure the class code exists (teacher must be created first)

### Data Not Displaying:
1. Check Firebase Console to ensure data is being saved
2. Verify the AuthContext is properly fetching user data
3. Check browser console for any JavaScript errors

## Firebase Console Verification

After sign-up, check Firebase Console:

### Collections to Check:
1. **teachers** collection - should have teacher data with teacherName
2. **parents** collection - should have parent data with parentName and kidsName
3. **Authentication** section - should show registered users

### Example Data Structure:

**teachers/{uid}:**
```json
{
  "email": "teacher@test.com",
  "classId": "class-abc123",
  "teacherName": "Ms. Johnson",
  "createdAt": "2025-01-14T08:00:00Z"
}
```

**parents/{uid}:**
```json
{
  "email": "parent@test.com",
  "parentName": "John Smith",
  "kidsName": "Emma Smith",
  "classCode": "class-abc123",
  "teacherId": "teacher-uid",
  "createdAt": "2025-01-14T08:00:00Z"
}
```
