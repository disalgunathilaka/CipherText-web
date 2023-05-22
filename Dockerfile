# Use the official Node.js 14 LTS image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY * ./

# Install project dependencies
RUN npm install -g nx
RUN yarn install
RUN yarn add bcrypt

# Copy the entire project to the working directory
COPY . .

# Build the application
RUN nx build api

# Expose the port on which the API will run
EXPOSE 3333

CMD ["node", "dist/apps/api/main.js"]
