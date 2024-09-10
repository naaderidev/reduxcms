# Education-CMS :calendar: :clipboard:

Persian-language Content Management System (CMS) for educational websites

**React | Redux | TailwindCss | Vite**

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a Persian-language Content Management System (CMS) for educational websites, developed using a modern tech stack. The backend is built with the json-server package, providing a lightweight database.

The frontend utilizes React with Vite, and Redux for state management. The user interface follows a responsive, component-based design, styled with the Tailwind CSS framework. Key features include dynamic forms with validation (using Formik and Yup), customized modals, table filtering, and pagination.

The CMS allows users to easily manage website content and data through an intuitive, visually-appealing interface. However, the current version does not include authentication functionality for user registration and login.

Overall, this project showcases a well-designed, feature-rich CMS tailored for Persian-language educational websites, with a modern technology stack and strong focus on usability and responsiveness.

**This version is deployed here: https://reduxcms.liara.run/**
**jserver folder is used for deployment & you wonn't need it for running on localhost**

## Technologies Used

- ReactJs
- TailwindCSS
- Rect-Redux
- Redux-Toolkit
- React-Router-DOM
- Yup
- Formik
- Rect-Hook-Form

## Features

- Responsive Design
- Modularity and Reusability
- Component-based architecture
- Custom Modals, Pagination and Tabel Filtering

## Installation

If you do not have installed json-server in your system, first install it

```
npm install -g json-server@0.17.4
```

## Usage

**backend directory**

- install moduls in backend directory

```
npm install
```

- then run server with this command

```
json-server -w db.json
```

**frontend directory**

- install moduls in frontend directory

```
npm install
```

- then run project with this command

```
npm run dev
```

## Contributing

This project is **open-source**, and we believe that the more people who contribute, the stronger it will become. So, if you're excited about what we're building and want to be a part of it, please feel free to **fork** the repository and submit your pull requests.

## License

This project is released under the **MIT License**, a flexible and widely-used open-source license that grants you the freedom to use, modify, and distribute the code as you see fit.
