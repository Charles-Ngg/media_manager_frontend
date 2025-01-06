# **Media Management System (Frontend) with React**

This project is the **Frontend** of the Media Management System, built using **React.js**. The frontend provides an interactive user interface for managing a large and diverse collection of media files. Users can view media lists, access detailed media and actor pages, perform searches, and interact with media items by rating, tagging, and liking them.

---

## **Table of Contents**

- [**Media Management System (Frontend) with React**](#media-management-system-frontend-with-react)
  - [**Table of Contents**](#table-of-contents)
  - [**Project Features**](#project-features)
  - [**Tech Stack**](#tech-stack)
  - [**Development Environment Setup**](#development-environment-setup)
  - [**Docker Setup**](#docker-setup)
  - [**Project Structure**](#project-structure)
  - [**Running the Project**](#running-the-project)
  - [**Environment Variables**](#environment-variables)
  - [**API Integration**](#api-integration)
  - [**Available Scripts**](#available-scripts)
  - [**Future Enhancements**](#future-enhancements)
  - [**Conclusion**](#conclusion)
  - [**License**](#license)
  - [**Contributors**](#contributors)
  - [**Media List Sorting**](#media-list-sorting)
    - [Sorting Media by Total Size](#sorting-media-by-total-size)
      - [**Sorting Controls**](#sorting-controls)
      - [**Usage**](#usage)
      - [**Example**](#example)
      - [**API Interaction**](#api-interaction)
    - [Additional Considerations](#additional-considerations)

---

## **Project Features**

- **Media List and Search:**  
  - Browse through a list of media items with search functionality.
  
- **Detailed Media and Actor Pages:**  
  - View detailed information about media and associated actors.
  
- **User Interactions:**  
  - Rate, tag, and like media items and actors.

- **Add New Media:**  
  - Submit new media entries through the interface.

- **Navigation and Routing:**  
  - Seamless navigation using React Router.

---

## **Tech Stack**

- **Frontend Framework:** React.js  
- **Routing:** React Router  
- **HTTP Client:** Axios  
- **UI Library (Optional):** Material-UI, Ant Design, or Bootstrap  
- **Package Management:** npm or Yarn  
- **Containerization:** Docker

---

## **Development Environment Setup**

1. **Clone the repository:**

    ```bash
    git clone <your-frontend-repository-url>
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure API Endpoint:**

    Create a `.env` file in the root directory:

    ```bash
    REACT_APP_API_URL=http://192.168.1.100:8000/api  # Replace with your backend IP
    ```

---

## **Docker Setup**

The project includes Docker configuration for easy deployment and consistent environments.

1. **Prerequisites:**
   - Docker
   - Docker Compose

2. **Build and Run with Docker:**

    ```bash
    # Build and start the container
    docker-compose up -d

    # Stop the container
    docker-compose down
    ```

3. **Access the Application:**
   
   The application will be available at:
   ```
   http://localhost:3000
   ```

4. **Environment Configuration:**
   
   The Docker setup uses environment variables from the `.env` file. Make sure to configure:
   ```
   REACT_APP_API_URL=http://your-backend-api-url
   ```

5. **Docker Files:**
   - `Dockerfile`: Multi-stage build configuration for production-ready image
   - `docker-compose.yml`: Service orchestration with environment variables and port mapping

---

## **Project Structure**

```
frontend/
├── public/         # Public assets and index.html
├── src/
│   ├── components/ # Reusable React components
│   ├── pages/      # Page-level components
│   ├── services/   # API service functions
│   ├── styles/     # CSS and styling files (optional)
│   ├── App.js      # Main application component
│   ├── index.js    # Application entry point
├── .env            # Environment variables
├── package.json    # Project dependencies and scripts
└── README.md       # Project documentation
```

---

## **Running the Project**

1. **Start the React development server:**

    ```bash
    npm start
    ```

2. **Access the application:**

    Open your browser and navigate to:

    ```
    http://localhost:3000
    ```

3. **Testing on another device:**

    If the backend is accessible externally, replace `localhost` with the IP address of your development machine:

    ```
    http://192.168.1.100:3000
    ```

---

## **Environment Variables**

Use environment variables to store API endpoints and other configuration values.

Create a `.env` file in the project root:

```bash
REACT_APP_API_URL=http://192.168.1.100:8000/api  # Backend API URL
```

---

## **API Integration**

This project interacts with the backend using Axios. All API calls are defined in `src/services/api.js`.

**Example API Call:**

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getMediaList = async () => {
  try {
    const response = await axios.get(`${API_URL}/media/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching media list:', error);
    throw error;
  }
};
```

---

## **Available Scripts**

In the project directory, you can run:

- **`npm start`**:  
  Runs the app in development mode at `http://localhost:3000`.

- **`npm build`**:  
  Builds the app for production.

- **`npm test`**:  
  Launches the test runner in interactive mode.

---

## **Future Enhancements**

- **Authentication:** Implement user login and registration.  
- **Pagination and Filtering:** Add pagination to the media list for better performance.  
- **File Uploads:** Enable media file uploads via the interface.  
- **Advanced Search:** Provide more filtering options for media items.  
- **Deployment:** Prepare for deployment using Docker or a cloud provider.

---

## **Conclusion**

This frontend provides a user-friendly interface for managing media files. It integrates seamlessly with the backend API to offer features like browsing, searching, and interacting with media items. 

If you encounter any issues or need further assistance, feel free to reach out!

---

## **License**

This project is licensed under the MIT License.

---

## **Contributors**

- **Your Name**: Frontend Developer & Maintainer  
- **OpenAI**: Assistant for project planning and guidance  

---

## **Media List Sorting**

### Sorting Media by Total Size

Users can now sort the media list based on the total size of all files within each media item. The sorting can be done in ascending or descending order.

#### **Sorting Controls**

On the **Media List** page, a dropdown is available to select the desired sorting order:

- **Descending:** Sorts media from largest to smallest total size.
- **Ascending:** Sorts media from smallest to largest total size.

#### **Usage**

1. **Navigate to the Media List Page:**
   
   Open the frontend application and go to the **Media List** section.

2. **Select Sorting Order:**
   
   Use the **Sort by Total Size** dropdown to choose either **Ascending** or **Descending**.

3. **View Sorted Media:**
   
   The media list will automatically refresh and display the media items sorted based on the selected order.

#### **Example**

- **Sort Media by Total Size in Descending Order (Default):**

  ![Default Sorting](./assets/default-sorting.png)

- **Sort Media by Total Size in Ascending Order:**

  ![Ascending Sorting](./assets/ascending-sorting.png)

#### **API Interaction**

When a user selects a sorting order, the frontend sends a GET request to the backend API with the `sort` query parameter:

- **Descending Order (Default):**

  ```
  GET /api/media/?sort=desc
  ```

- **Ascending Order:**

  ```
  GET /api/media/?sort=asc
  ```

The backend responds with the media list sorted by the combined `total_size` of all associated files.

---

By implementing these changes, users can effortlessly sort the media list based on the total size of media files, enhancing the usability and functionality of your Media Management System.

---

### Additional Considerations

- **Loading States:** 
  - Implement loading indicators to improve user experience while data is being fetched.

- **Error Handling:**
  - Display user-friendly error messages if the API request fails or returns an error.

- **Responsive Design:**
  - Ensure that the sorting controls are accessible and properly styled across different devices and screen sizes.

- **Caching:**
  - Consider caching sorted results if performance becomes an issue with large datasets.

---

Feel free to further customize the sorting controls and integrate additional features as needed!
