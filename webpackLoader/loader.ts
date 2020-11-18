import {getOptions} from 'loader-utils';
import {validate} from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
} as const


export default function (source: string) {
  const options = getOptions(this);

  validate(schema, options);

  console.log('source', source)

  return source;

};

