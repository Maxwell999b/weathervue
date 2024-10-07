# WeatherVue

WeatherVue is a modern, responsive weather application built with Next.js and React. It provides real-time weather information and forecasts for locations worldwide, with the added feature of automatic geolocation for a personalized experience.

## Features

- Current weather display
- 5-day weather forecast
- Geolocation support for automatic local weather
- Search functionality for any city worldwide
- Responsive design for desktop and mobile devices
- Beautiful UI with a dark theme and weather-appropriate icons

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- OpenWeatherMap API
- Geolocation API

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- An OpenWeatherMap API key

## Installation

1.  Clone the repository:

    ```
    git clone https://github.com/Maxwell999b/weathervue.git
    cd weathervue
    ```

2.  Install the dependencies:

    ```
    npm install
    ```

    or if you use yarn:

    ```
    yarn install
    ```

3.  Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:

    ```
    NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
    ```

## Usage

To run the development server:

```
npm run dev
```

or

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a production build:

```
npm run build
npm start
```

or

```
yarn build
yarn start
```

## Deployment

This app can be easily deployed on Vercel, the platform created by the makers of Next.js. For more information on deploying Next.js apps, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Contributing

Contributions to WeatherVue are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)

## Contact

If you have any questions, feel free to reach out to me or open an issue on GitHub.

Happy weather tracking!
