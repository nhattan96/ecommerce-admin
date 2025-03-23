This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Create app

<!-- . Mean to current folder -->

yarn create next-app .

<!-- auth -->

yarn add next-auth --save

<!-- mongodb -->

yarn add @auth/mongodb-adapter mongodb --save

<!-- axios -->

yarn add axios mongodb --save

<!-- mongoose -->

yarn add mongoose mongodb --save

<!-- multiparty -->
<!-- Parse http requests with content-type multipart/form-data, also known as file uploads. -->

yarn add multiparty --save

<!-- google storage -->

yarn add googleapis --save

<!-- fs -->
<!-- support stream file -->

yarn add fs --save

<!-- spinner -->

yarn add react-spinners --save

<!-- sortable -->

yarn add sortablejs --save
yarn add react-sortablejs --save

<!-- alert popup -->

yarn add sweetalert2 sweetalert2-react-content --save

# Google Login / Config on google console.cloud

For development:
http://localhost:3000/api/auth/callback/google

For production:
https://{YOUR_DOMAIN}/api/auth/callback/google

Hi
