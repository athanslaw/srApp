import {dev} from './environment/dev.config';
import {production} from './environment/prod.config';

let environment = process.env.NODE_ENV;

const env = () => {
  if (environment === 'production') {
    return production;
  } else {
    return dev;
  }
};

export default env;
