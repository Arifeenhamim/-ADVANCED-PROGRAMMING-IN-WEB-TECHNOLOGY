This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker deployment

The frontend runs as a production Next.js standalone container on port `3000`. It joins the shared `aiub-infrastructure` Docker network and reaches the backend using `http://api:5001`.

1. Start the backend stack and make sure the shared `aiub-infrastructure` Docker network exists.
2. Copy `.env.docker.example` to `.env.docker`. Set `NEXT_PUBLIC_API_BASE_URL` to the backend URL visitors can reach in their browser; this value is baked into the frontend image for profile image links. Keep `API_BASE_URL=http://api:5001` for server-to-server calls on Docker. `AUTH_COOKIE_SECURE=false` is needed while users access the app over plain HTTP; switch it to `true` when using HTTPS.
3. Build and start the frontend:

   ```sh
   docker compose --env-file .env.docker up --build -d
   ```

4. Open `http://<VM-public-IP>:3000`. Allow inbound TCP port `3000` in the Azure network security group and the VM firewall.

Check the container with `docker compose --env-file .env.docker ps` and `docker compose --env-file .env.docker logs -f web`. To stop it, run `docker compose --env-file .env.docker down`.
