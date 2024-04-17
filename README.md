# next-libsql-rsc-data-issue

Currently, when using the libsql client and when passing data loaded from inside a server component down to a client component, you'll get the following warning:
> Warning: Only plain objects can be passed to Client Components from Server Components. Classes or other objects with methods are not supported.

## Reproduction
1. Make sure you have a turso db with a "user" table with an "id" column.
2. Copy the contents of the `.env.example` file into a newly created `.env` file
3. Fill in the two secrets
4. Start the server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
5. Open [http://localhost:3000](http://localhost:3000) with your browser
6. Check the terminal and notice the warning
7. Also notice the logged prototype of the data

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Explanation & question
There is an issue open in the Next.js repo [here](https://github.com/vercel/next.js/issues/47447), but it has nothing to do with Next.js.

The reason this is happening is React is trying to make sure you're not passing instances of classes down to client components, as methods cannot be serialized.
However, their implementation for that check doesn't take into account objects that have been created with a `null` prototype (i.e. using `Object.create(null, ..)`.
I wasn't able to pinpoint where exactly this is being done in the libsql client, but running `Object.getPrototypeOf(..)` on it yields "[Object: null prototype]", so it or something similar must be happening somewhere in the client code.

I realize this isn't your problem, but I haven't been able to find other issues in libsql/tursodatabase regarding this, which is odd to me as passing down data from a server component to a client component using data from a db call should be a widespread pattern.
Granted, only Next.js app router users will face this issue.

People are suggesting using `JSON.parse(JSON.stringify(data))` or `structuredClone(data)`, but for large data that adds so much overhead that it seems silly to me, considering it shouldn't be necessary.

Have others faced this issue, and how does one deal with this?
