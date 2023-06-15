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
