# Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /express-app

# Copy package files first
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Install pg package for PostgreSQL
RUN npm install pg --save

# Copy the rest of the files
COPY . .

# Expose the server port
EXPOSE 3500

# Run Express with nodemon
CMD ["nodemon", "server.js"]
