FROM node:latest

# Create a directory where our app will be placed
RUN mkdir -p /ui/app

# Change directory so that our commands run inside this new directory
WORKDIR /ui/app

# Copy dependency definitions
COPY package*.json ./ 

RUN npm install

# Get all the code needed to run the app
COPY . /ui/app

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD [ "npm", "start" ]