# Outlast Bookstore

## Server

NestJs based backend that allows storing a list of favorite book ids for a specific user

(under `/server/`)
Install dependencies first:
`npm install`
Start the dev server with:
`npm run start:dev`

## Client

Nextjs based frontend that queries data from <http://gutendex.com/> to display a grid of books, their details, and allows marking them as favorite by consuming the service exposed by the server.

(under `/client/`)
Install dependencies:
`npm install`
Make sure the `NEXT_PUBLIC_FAVORITES_SERVICE_URL` environment variable is defined and points to a running favorite server:
`cp .env.example .env.local`
Start the dev server:
`npm run dev`

The Outlast Bookstore should now be running at <http://localhost:3000/>
