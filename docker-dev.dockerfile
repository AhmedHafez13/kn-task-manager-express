FROM node:20-alpine

# Set working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project source code
COPY . .

# Expose the port on which the application listens
EXPOSE 3000

# Command to run the application
CMD [ "npm", "run", "dev" ]
