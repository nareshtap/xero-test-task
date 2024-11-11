# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install global dependencies
RUN npm install -g ts-node typescript

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app will run on
EXPOSE 5001

# Start the server using ts-node
CMD ["npx", "ts-node", "src/server.ts"]
