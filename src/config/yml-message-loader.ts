import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { KycMessages } from 'src/common/interfaces/kyc-messages';

const YAML_MESSAGE_CONFIG_FILENAME = 'messages.yaml';

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_MESSAGE_CONFIG_FILENAME), 'utf-8'),
  ) as KycMessages;
};
