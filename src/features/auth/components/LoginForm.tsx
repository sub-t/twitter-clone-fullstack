import * as z from 'zod';
import { Button, Link } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useAuth } from '../hooks/useAuth';
import { LoginCredentialsDTO } from '../types';

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login } = useAuth();

  return (
    <div>
      <Form<LoginCredentialsDTO>
        onSubmit={async (values) => {
          await login(values);
          onSuccess();
        }}
        schema={schema}
        className="space-y-6"
      >
        {({ register }) => (
          <>
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
              Log in
            </Button>
          </>
        )}
      </Form>

      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            href="../register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
