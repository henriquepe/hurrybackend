import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import musicstyleRouter from './musicstyle.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/music', musicstyleRouter);

export default routes;
