import { join } from 'path';
export default {
    type: 'mysql',
    host: '192.168.3.25',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'testdb',
    entities: [join(__dirname,'../','**/**.entity{.ts,.js}')],
    synchronize: true,
};