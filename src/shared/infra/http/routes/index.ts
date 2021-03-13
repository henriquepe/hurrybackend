import { Router } from 'express';

import appointmentsRouter from '@modules/Appointments/infra/http/routes/appointments.routes';
import drinksRouter from '@modules/Drinks/infra/http/routes/drinks.routes';
import eventTypeRouter from '@modules/EventsType/infra/http/routes/eventType.routes';
import musicstyleRouter from '@modules/MusicsStyle/infra/http/routes/musicstyle.routes';
import sessionsRouter from '@modules/Users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/Users/infra/http/routes/users.routes';
import dashboardUsersRouter from '@modules/DashboardUsers/infra/http/routes/dashboardusers.routes';
import dashboardSessionsRouter from '@modules/DashboardUsers/infra/http/routes/dashboardSessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/music', musicstyleRouter);
routes.use('/eventType', eventTypeRouter);
routes.use('/drinks', drinksRouter);
routes.use('/dashboardUsers', dashboardUsersRouter);
routes.use('/dashboardSessions', dashboardSessionsRouter);

export default routes;
