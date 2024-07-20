
# Financial Tracker

A modern financial tracker application built with React and Vite. This application allows users to manage their transactions, view charts of their income and expenses, and apply various filters to analyze their financial data.

## Features

- **Add/Edit Transactions**: Manage income and expense transactions with detailed information.
- **Filter Transactions**: Apply filters based on type, category, and amount. Search transactions by title.
- **Charts**: Visualize income and expenses with interactive charts.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Prerequisites

- [Node.js](https://nodejs.org/) (Version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (Package managers)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/bhupesh003/Codolio_Assignment.git
   cd Codolio_Assignment
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Development

To start the development server and run the project locally:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

This will start the Vite development server, and you can view your application at `http://localhost:3000`.

## Building for Production

To create a production build of the application:

```bash
npm run build
```

Or using yarn:

```bash
yarn build
```

This will generate the build files in the `dist` directory, which you can deploy to your server.

## Project Structure

- **`/src`**: Contains all source code for the application.
  - **`/components`**: React components for the application.
  - **`/utils`**: Utility functions, including chart data preparation.
  - **`/styles`**: CSS and styling files.
- **`App.tsx`**: The root component of the application.
- **`main.tsx`**: Entry point for the React application.
- **`vite.config.ts`**: Vite configuration file.

## Configuration

### Environment Variables

The project uses `.env` files for configuration. Create a `.env` file in the root directory if needed for custom environment variables.

### Chart Data Preparation

- **`/utils/chartUtils.ts`**: Contains the `prepareChartData` function used to format data for the charts.

## Testing

The project does not include testing by default. You can add testing libraries such as Jest or React Testing Library based on your requirements.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Submit a pull request.


## Contact

For any questions or issues, please contact [ygbhupesh003@gmail.com](mailto:ygbhupesh003@gmail.com).
