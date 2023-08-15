# Netflix Backend Test

The objective of the technical test is to create a RESTful API where you can create movies and give reviews of them.

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment](#environment)
- [Usage](#usage)
- [Routes](#routes)

## Project Description

RESTful API that allows you to create new movies, clone and delete existing movies. In addition, users who visit a specific movie through the Netflix portal can filter all the available reviews of the movie separated on the different platforms on which the movie can be viewed. Users can also leave reviews on all available movies in the online catalog.

## Technologies Used

List the main technologies, libraries, and dependencies used in backend:

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - TypeScript
  - AWS-sdk

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JFernando12/netflix-test.git
```

2. Copy code:

```bash
cd netflix-test
```

3. Install the backend dependencies:

```bash
npm install
```

4. Compile and build the backend:

```bash
npm run build
```

## Environment

1. Create the following variables inside .env in backend folder:

```bash
PORT=3000
MONGO_URI=mongodb://username:password@host:port/database
AWS_ACCESS_KEY_ID='XXXXXXXXXXXXXXXXXX'
AWS_SECRET_KEY='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
AWS_S3_BUCKET='netflix-backend-test'
```

## Usage

1. Start the backend server:

```bash
npm start
```

Access the API in your browser at http://localhost:3000

## Routes

Platform

```bash
POST   - http://localhost:3000/platform         //createPlatform
GET    - http://localhost:3000/platform         //getPlatforms
DELETE - http://localhost:3000/platform/:id     //deletePlatform
```

Movie

```bash
POST   - http://localhost:3000/movie            //createMovie
GET    - http://localhost:3000/movie            //getMovies
DELETE - http://localhost:3000/movie/:id        //deleteMovie
GET    - http://localhost:3000/movie/:id        //getMovieById
PUT    - http://localhost:3000/movie/:id        //updateMovie
POST   - http://localhost:3000/movie/clone/:id  //cloneMovie
```

Review

```bash
POST   - http://localhost:3000/review/:id       //createReview
```
