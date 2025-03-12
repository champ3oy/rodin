# Rodin

An uptime monitoring system for side projects and small teams.

### Technologies
- NestJS
- MongoDB
- Resend

### Installation
```bash
# Clone repository
git clone https://github.com/champ3oy/rodin.git


# Set up environment variables (create .env file)
MONGODB_URI=mongodb_uri
PORT=3005
NODE_ENV=development
JWT_SECRET=secret
JWT_EXPIRE=24h
RESEND_APIKEY=re_api_key

# Install dependendies
yarn install

# Run the application
yarn start:dev
```


### Systems overview

![Rodin Logo](./assets/overview.png)

### Notification system overvew

![Rodin Logo](./assets/notification.png)
