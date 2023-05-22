## Login Sign-up flow

### Sign-up

- Enter basic details, verify otp from email, account creted

### Login

- Login with credentials (email and password)

### Forgot password

- Enter email, enter and verify otp sent to email, update password

### Update Profile

- Profile page, change details, updates profile

### farmer api

- /farmer

  - @post --> creates farmer
  - @body -->

    ```
    {
      payload {
         "name",
          "email",
          "password",
          "survey_no",
          "area",
          "phone"
      }
    }

    ```

  - @get --> get all farmers
  - /farmer_id
    - @get --> get farmer by id
  - /delete/farmer_id -->
    - @post delete farmer profile

/report

- @post --> create and saves report in user's profile
- @body
  ```
  {
    count,
    label,
    farmer_id
  }
  ```
- /farmer_id
  - @get --> return all reports for a specific farmer
  - @delete --> delete specific report from user's profile(databse)
