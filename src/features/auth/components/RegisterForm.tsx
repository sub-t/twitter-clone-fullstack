import * as z from 'zod';
import { Button, Link } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useAuth } from '../hooks/useAuth';
import type { RegisterCredentialsDTO } from '../types';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
  screenName: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register } = useAuth();

  return (
    <div>
      <Form<RegisterCredentialsDTO>
        onSubmit={async (values) => {
          await register(values);
          onSuccess();
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
        className="space-y-6"
      >
        {({ register }) => (
          <>
            <InputField
              type="text"
              label="Name"
              registration={register('name')}
            />
            <InputField
              type="text"
              label="Username"
              registration={register('screenName')}
            />
            <InputField
              type="email"
              label="Email Address"
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
              registration={register('password')}
            />
            <Button type="submit" size="lg" className="w-full">
              Register
            </Button>
          </>
        )}
      </Form>

      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            href="../login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
