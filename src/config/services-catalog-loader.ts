import { readFileSync} from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import ServicesCatalog  from 'src/common/interfaces/services-catalog';
import { parseStringToBoolean } from '../common/util/functions.util'


export default () => {

    let fileName = 'services-no-eureka.yaml';

    if(parseStringToBoolean(process.env.ENABLE_EUREKA)){
        fileName = 'services.yaml';
    }

    return yaml.load(readFileSync(join(__dirname,fileName),'utf-8')) as ServicesCatalog
}