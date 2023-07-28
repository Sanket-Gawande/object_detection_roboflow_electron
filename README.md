## Development environment

- [Electron](https://www.electronjs.org)
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [mongodb](https://www.mongodb.com)
- [Python](https://www.python.org/)

## Getting started

- Clone the repository, Contails both client and server

```bash
git clone git@github.com:Sanket-Gawande/object_detection_roboflow_electron.git
```

### Client

- Navigate to client folder

```bash
cd client
```

- Install dependencies

```bash
npm install
```

- Start the development server

```bash
npm run dev
```

- Build the app

```bash
npm run build
```

- Start the app

```bash
npm run start
```

### Server

- Navigate to server folder

```bash
cd server
```

- Install dependencies

```bash
npm install
```

- Start the development server

```bash
npm run dev
```

#### Both client and server should be running for the app to work

## Object Detection

- [Roboflow](https://roboflow.com) is used for object detection
- [YOLOv8](https://pjreddie.com/darknet/yolo/) Model
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) is used api to analyze the image and return the result
- [Python](https://www.python.org) Requierd for flask

## Steps to train the model

- Collect the images (Cotton and Tobacco for this project)
- Upload the images to [Roboflow](https://roboflow.com) for annotation thing
- Select the model (YOLOv8)
- Train the model
- Download the model in format of .pt
- Create the api using flask
- Creating api endpoint /predict to predict the image

  <br>

## Work flow

- Farmer login or sign-up
- Profile can be updated
- Select image to upload
- Select the crop type
- Start the detection
- View the report
- Also farmer can save the report
- Farmer can view or delete the saved reports in the profile

### Contributers

<!-- contributers -->

- [Gopal Jawle](https://github.com/Akshad16)
- [Sanket Gawande](https://github.com/sanket-gawande)
- [Akshad Malegaonkar](https://github.com/Akshad16)
- [Jay Wankhade](https://github.com/jay-wankhade)

</hr>

### Login Sign-up flow
<hr/>

### Sign-up

- Enter basic details, verify otp from email, account creted

### Login

- Login with credentials (email and password)

### Forgot password

- Enter email, enter and verify otp sent to email, update password

### Update Profile

- Profile page, change details, updates profile

