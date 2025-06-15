# Use a lightweight Node.js image
FROM node:alpine AS development

# Set working directory inside the container
WORKDIR /react-app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies, including axios, chart.js, react-router and react-chartjs-2
RUN npm install && npm install axios chart.js react-chartjs-2
RUN npm install react-router-dom

# Copy everything else (your React project)
COPY . .

# Set environment variable for development mode
ENV NODE_ENV development

# Expose the development server port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
