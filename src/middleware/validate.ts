import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { AnyObject, object, ObjectSchema, string, ValidateOptions } from 'yup';

const validateOptions: ValidateOptions<AnyObject> = {
  stripUnknown: true,
  strict: true,
  abortEarly: false
};

export function validate(schema: ObjectSchema<AnyObject>, handle: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && ['POST', 'PUT'].includes(req.method)) {
      try {
        if (req.method === 'PUT') {
          req.query = await object()
            .shape({
              id: string().trim().required('Id is a required field')
            })
            .validate(req.query, validateOptions);
        }

        req.body = await schema.validate(req.body, validateOptions);
      } catch (error) {
        return res
          .status(400)
          .json(error.errors.lenght > 1 ? { errors: error.errors } : { error: error.errors });
      }
    }
    handle(req, res);
  };
}
