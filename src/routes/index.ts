import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import drinksRouter from './drinks.routes';
import eventTypeRouter from './eventType.routes';
import musicstyleRouter from './musicstyle.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/music', musicstyleRouter);
routes.use('/eventType', eventTypeRouter);
routes.use('/drinks', drinksRouter);

export default routes;
