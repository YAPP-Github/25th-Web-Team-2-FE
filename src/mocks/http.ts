import express from 'express';
import { createMiddleware } from '@mswjs/http-middleware';
import { handlers } from './handlers';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(createMiddleware(...handlers));

app.listen(PORT, () => console.log(`Mock server is running on port: ${PORT}`));
