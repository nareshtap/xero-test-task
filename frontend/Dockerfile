# Use Node 18 or another suitable version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 and set the command to run the app in development mode
EXPOSE 3001
CMD ["npm", "run", "start"]