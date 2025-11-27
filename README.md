# Security Alerts

## Task details

Fetch API data for security alerts and display them in a table, that will be easy for security analysts to use to quickly find actionable alerts.

### Installation and running instructions

Set up the API details by making a copy of .env.sample and adding your values.

```bash
cp .env.sample .env
vi .env // or your preferred editor
```

Install dependencies.

```bash
pnpm install
```

Serve with hot reload at <http://localhost:5173>.

```bash
pnpm run dev
```

### Lint

```bash
pnpm run lint
```

### Typecheck

```bash
pnpm run typecheck
```

### Build

```bash
pnpm run build
```

### Test

```bash
pnpm run test
```

## Implementation details

I chose a Vite community template to give a complete development environment including Prettier. Vite is a more modern and faster environment than create-react-app, also Vitest is faster than Jest, and has nice features such as the browser test result viewer, which are nicer to work with.

I have committed the code in a fairly granular way, to show my working and how I approached the problem in an iterative and test-driven way.

First of all, I inspected the data returned from Postman, and built the TypeScript types to represent this. I originally set the enumeration type values of severity, category, and resolution to string unions, but changed my mind, as there may be other values returned by the API in the future which would break the typing, for example a 'critical' severity.

I chose a simple fetch api approach to API access, covering loading and errors. Vitest's mocking made this easy to test without making API calls. For development purposes I added props to use mock data and a mocked loading delay.

I chose the Radix UI library for simple to use UI components without heavy styling, and with Tailwind for CSS overrides where needed. It also gave a dark theme basically for free.

Before starting developing the layout, I thought about who would be using the application, and what they would want. In a real world situation, I would want to talk to the users before starting out on the design to find out their actual needs, not my assumptions. But in this case, I thought being able to identify high severity detections which have not yet been acknowledged or resolved would be the main aim, and tried to enable this.

One small idea was that could often be experts who have been woken up in the middle of the night and need to use the app to find the crucial data, so I enabled dark mode by default, which is easier on the eyes at 3am!

I had to decide which of the data items are most relevant, and you can see those I chose. Showing them all may well be unnecessary, and again of course this data would come from talking to the users. I chose to show whether each detection had been acknowledged and resolved with simple yes/no values, and with a popover for any 'yes' values to show when and by whom. This saved some table width.

I used testing first as much as possible, at the component level, with Testing Library, to mirror what actual users do, rather than unit testing the implementation details. Although to be honest I just unit tested the data fetching, as this was the first part I wrote. I would be tempted to add end-to-end testing using PlayWright to a production environment to ensure code releases do not break the system.

I considered security, of course, in that I used a .env file approach to store the API base URL and authorisation header, so they are not checked into source code. I realise this is not the place for secrets, as they are loaded into the browser. Any such secrets should be held on the server, or in a proxy where they can be added to the request and not ever seen by the browser.
I also only show the user a generic message when there is an API error, instead of revealing the full code and message. And the data returned is basically checked to see that it matches what we are expecting.

# Future developments

I did not have time to complete the task to what I would consider a production level grade. These are things I would add, given more time:

- Pagination. The obvious lacking feature here. This would be simple to add, as the API allows the page number and size to be passed. To do this very well, however, would require filtering and sorting logic to be implemented on the server side, as you could only sort the current page you have in the client, rather than the full set of data. Likewise, filtering would restrict the number of rows you see from the current page, rather than searching all the data. For a critical application like this could be, this would be a vital consideration.
- Virtual scrolling. If there are many thousands of rows shown, using a window around results would help make this more performant.
- Debounced search. Performance improvement for large data sets.
- Configurable column display. I had to choose a limited number of columns for display. But pehaps some users want to see other API data. It would be great if they could configure this and have it stored, and also what their preferred default sort order is. This data should be safe enough to keep in localStorage so they would not need to change it every time they use the app.
- Keyboard shortcuts, for power users to save time.

## License

This project is licensed under the MIT License.
