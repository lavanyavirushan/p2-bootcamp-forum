# Bootcamp Forum

<p align="center">
<img src="https://user-images.githubusercontent.com/114792819/216424896-e9d9ed50-955e-4149-a952-ccc6aa4ca8cf.png" />
</p>

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![github][github-shield]][github-url]

## Description

This application is a platform for past and present bootcamp students to connect, ask questions, mentor, and network with others going through the same experience. Unlike some other forums, even ones specifically for software development, this application is exclusively\* for students in coding bootcamp programs, allowing users to have a much more personalized experience.

A key benefit to having this large, yet personalized application, is that if students are stuck on a weekly challenge or project, they can search by category to find a post with relevant information to their problem; if they don't see a solution already listed, they can create a post, specify the category and have a member from the community help them out. Having this information available to other users (rather than just in a direct message) will help future students who also face the same question. We envision these categories will not only include various coding languages, libraries, and projects, but also interview tips, job postings, & updates from within the coding community.

This application uses Node.js and a MySQL database, which is hosted & deployed on Heroku.

\*Employers can also create profiles to find excellent job candidates, list job/internship postings, etc.

## Table of Contents

- [Demo](#demo)
- [Description](#description)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Demo

[Deployed Heroku app](https://p2-bootcamp-forum.herokuapp.com/)
[Swagger API Documentation](http://p2-bootcamp-forum.herokuapp.com/docs)

## Usage

Users can get the most out of this app if they are registered with an account, however unregistered users are still able to browse the homepage, categories & posts. Once users have registered and/or logged into their account, they can interact with others by writing their own posts, as well as liking & commenting on other users' posts.

## Getting Started

##### Prerequisites

- Install NodeJs and npm https://nodejs.org/en/download/
- Install Mysql server on local or on cloud

##### Installation

- Clone the repo
  ```sh
  git clone git@github.com:lavanyavirushan/p2-bootcamp-forum.git
  ```
- Install dependencies
  ```sh
  npm install
  ```
- Rename .env.SAMPLE file to .env
  ```sh
  cp .env.SAMPLE .env
  ```
- Replace all ENV varible values with yours:

  ```sh
    JAWSDB_URL=""
    DB_HOST="localhost"
    DB_PORT="3306"
    DB_NAME='sample_db'
    DB_USER='root'
    DB_PASSWORD=''
    HOST="p2-bootcamp-forum.herokuapp.com"
    PORT="80"
  ```

- Make sure you have created the database:

  ```sh
    DROP DATABASE IF EXISTS forum_db;
    CREATE DATABASE forum_db;
  ```

- Seed table to the database:

  ```sh
    npm run seed
  ```

- API dosumentation build:

  ```sh
    npm run build-swagger
  ```

- Start the app:
  ```sh
    npm start
  ```

## Usage

Users can get the most out of this app if they are registered with an account, however unregistered users are still able to browse the homepage, categories & posts. Once users have registered and/or logged into their account, they can interact with others by writing their own posts, as well as liking & commenting on other users' posts. Click the video link below to see the app's functionality:

## Credits

- https://getbootstrap.com/docs/5.0/
- https://mdbootstrap.com/
- https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
- https://www.w3docs.com/snippets/html/how-to-add-an-image-in-the-title-bar.html
- Photo by <a href="https://unsplash.com/ko/@altumcode?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">AltumCode</a> on <a href="https://unsplash.com/s/photos/coding-bootcamp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## License

This project is covered by MIT licensing.
https://opensource.org/licenses/MIT

## Questions

Lavanya Raveendrarajah:
email: lavanya.virushan@gmail.com
github profile: https://github.com/lavanyavirushan

Madeline Lowes:
email: madeline.lowes@gmail.com
github profile: https://github.com/MadelineLowes

Philip V K:
email: philipkurianv@gmail.com
github profile: https://github.com/PhilipVKurian

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/lavanyavirushan/p2-bootcamp-forum.svg?style=for-the-badge
[contributors-url]: https://github.com/lavanyavirushan/p2-bootcamp-forum/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/lavanyavirushan/project-1-fitness-lind.svg?style=for-the-badge
[issues-url]: https://github.com/lavanyavirushan/project-1-fitness-lind/issues
[license-shield]: https://img.shields.io/github/license/lavanyavirushan/project-1-fitness-lind.svg?style=for-the-badge
[license-url]: https://github.com/lavanyavirushan/project-1-fitness-lind/blob/main/LICENSE
[github-shield]: https://img.shields.io/badge/-github-black.svg?style=for-the-badge&logo=github&colorB=555
[github-url]: https://github.com/lavanyavirushan/project-1-fitness-lind
[product-screenshot]: https://user-images.githubusercontent.com/63548697/204180902-6db65c02-85e2-4dd2-96c9-a5aa6fbf1c83.png
[product-screenshot-bmi]: https://user-images.githubusercontent.com/63548697/204181285-a4e3df78-cea2-4824-83d0-5845a55c2e37.png
[product-screenshot-workouts]: https://user-images.githubusercontent.com/63548697/204181506-b39d7a89-64a2-4c97-84a1-435c8e3d72c5.png
[product-screenshot-workout-video]: https://user-images.githubusercontent.com/63548697/204182036-1013c6ad-c526-48ed-b62a-cf5e2ffb7be0.png
[product-screenshot-mealplans]: https://user-images.githubusercontent.com/63548697/204182335-bdc68f3b-bbb0-4e81-95b8-3ea8161050d6.png
[product-screenshot-about]: https://user-images.githubusercontent.com/63548697/204182458-ce898edf-8756-40e3-a973-44e7ccd192d9.png
[tailwindcss.com]: https://img.shields.io/badge/Tailwindcss-F0F0F0?style=for-the-badge&logo=tailwindcss&logoColor=light-blue
[tailwindcss-url]: https://tailwindcss.com/
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
