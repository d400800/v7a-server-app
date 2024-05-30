# Use Node.js 18 as a parent image
FROM node:18

# Create app directory
WORKDIR /home/benjamin/v7a-server-app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

# Bundle app source inside Docker image
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "dist/main" ]