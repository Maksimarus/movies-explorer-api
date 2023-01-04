const corsOptions = {
  origin: [
    'http://localhost:3002',
    'http://bestfilm.maksimar.nomoredomains.club',
    'http://api.bestfilm.maksimar.nomoredomains.club',
    'https://bestfilm.maksimar.nomoredomains.club',
    'https://api.bestfilm.maksimar.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'credentials'],
  credentials: true,
};

export default corsOptions;
