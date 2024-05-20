# Next.js Project - CS Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

![Preview](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzZreTl4OGpqa3p1OHllcms1OXk3MWJodDgxMTBicGJoMG0zYWFrMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U0VbwlASgtELEE9BBq/giphy.gif)

## Overview

This project is a frontend application built with Next.js, utilizing technologies like NextAuth for session management with JWT, React Hooks, and following SOLID principles. The frontend consumes the API hosted in [CS Backend Repository](https://github.com/ObedMz/CS-BACKEND).

The page handles features such as pagination, effects, forms, filters, etc.

## Live Preview

You can view the live version of this project [here](https://cs-front-sandy.vercel.app).

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. **Clone the repository**:
```bash
git clone https://github.com/ObedMz/CS-FRONT.git
```

2. **Install dependencies**:
```bash
cd cs-frontend
npm install
```

3. **Set up environment variables**:
- Create a `.env.local` file in the root of your project.
- Define the necessary environment variables in this file. For example:
 ```yaml
BACKEND_URL=http://localhost:80
NEXTAUTH_SECRET=ABCD-NEXT-AUTH-SECRET-EXAMPLE
FACEBOOK_URL=https://www.facebook.com/user
INSTAGRAM_URL=https://www.instagram.com/user
TWITTER_URL=https://www.x.com/user
TETHER_URL=https://www.tether.com/
BINANCE_URL=https://www.binance.com/
DEFAULT_BANK_URL=https://www.google.com/
WHATSAPP_URL://wa.me/
```

4. **Run the development server**:
```bash
npm run dev
```

5. **Access the application**:
Open [http://localhost:3000](http://localhost:3000) in your browser to view the result.

## Build

To build the project for production, run:
```bash
npm run build
```

## Deploy

To deploy the project, you can use platforms like Vercel. Ensure that you have set up the necessary environment variables in your deployment environment.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues. Your feedback and contributions are highly appreciated!


