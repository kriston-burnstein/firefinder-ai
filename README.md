# F I R E F I N D E R<img src="https://res.cloudinary.com/dogooderdev/image/upload/c_crop,g_north,h_192,w_192,y_85/f_png/firefinder/1684350340085_wpij41.jpg" width="32"/><br>AI Fire Detection

### Discover the Power of AI in Fire Detection
<img width="1278" alt="firefinder-landing" src="https://res.cloudinary.com/dogooderdev/image/upload/v1685303542/FireFinder/firefinder.herokuapp.com__j6ykns.png">

### An Interactive Artificial Intelligence Fire Detection App powered by Azure's Computer Vision.

Discover the power of AI in Fire Detection! Upload an image to see the AI in action, learn how this cutting-edge technology works, and explore real world companies around the globe that are using AI to recognize heat, smoke, and fires in real time to detect, suppress, and prevent fires and save lives.

Features include integrated real-time AI image analysis, dynamic reporting, and an innovative signature 'FireFacts' feature, providing on-demand, industry-specific insights about real world AI applications in fire safety. The result is an interactive, multi-faceted learning tool designed specifically to engage and educate both fire safety and AI enthusiasts. A fully responsive interface, paired with web accessibility optimizations, ensures a seamless experience across devices for all users.

### Visit the deployed site:
https://firefinder.herokuapp.com/

---

### Tech used:
- **Frontend:** JavaScript, EJS, CSS
- **Backend:** Node.js, Express.js
- **Image Processing:** Multer
- **Media Handling:** Cloudinary
- **Azure AI Services:** Computer Vision SDK
- **Environment & Configuration:** dotenv
- **Deployment Platform:** Heroku
  
### Future enhancements:
Potential features and improvements being considered for future releases:
- **MVC Refactor:** Transitioning to a full Model-View-Controller (MVC) structure for enhanced code organization.
- **Database Integration:** Potential MongoDB integration for the existing 'FireFacts' feature, to allow for more dynamic data handling.
- **Frontend Overhaul:** Exploring a migration to a React.js frontend for a more interactive user experience.
- **User Notifications:** Implementation of express-flash notifications to guide users during the image upload process.
- **AI-Powered Image Enhancement:** Augmenting AI capabilities to implement bounding boxes on user images, pinpointing detected fire regions.

---

### To run:

### Install

`npm install`

### Environment setup

- Create a config folder with a `.env` file and add the following as `key=value`
  - PORT=3000 (can be any port example: 4000)
  - CLOUD_NAME=`'your cloudinary cloud name'`
  - CLOUD_API_KEY=`'your cloudinary api key'`
  - CLOUD_API_SECRET=`'your cloudinary api secret'`
  - MS_COMPUTER_VISION_SUBSCRIPTION_KEY=`'your Microsoft Subscription Key'`
  - MS_COMPUTER_VISION_ENDPOINT=`'your Microsoft Computer Vision Endpoint'`
  - MS_FACE_ENDPOINT=`'your Microsoft Face Endpoint'`
  - MS_FACE_SUB_KEY=`'your Microsoft Face Key'`

### Running the application

`npm start`