FROM node:latest

# Create app directory
WORKDIR /usr

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /.

RUN rm -rf node_modules/
# Do a clean install of node_modules
RUN npm ci

# Set production environment
ENV PORT=80
ENV DB_CONNECTION_STRING=mongodb+srv://archit:1GCmzgmitwGASfeG@cluster0.efoowgs.mongodb.net/development-todo?retryWrites=true&w=majority
ENV JWT_SECRET_KEY=TODOAPPSECRETKEY

# Expose the port used
EXPOSE 80

# Start command
RUN npm install
COPY . .
CMD node src/start.js