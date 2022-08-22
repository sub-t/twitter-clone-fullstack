import { useQueryClient } from '@tanstack/react-query';
import zod from 'zod';
import { Button } from '@/components/Elements';
import { Form, FormDialog, InputField } from '@/components/Form';
import { useAuth } from '@/features/auth';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useUpdateProfile } from '../api/updateProfile';
import type { UpdateProfileDTO } from '../types';

const schema = zod.object({
  name: zod.string().min(1, 'Required'),
  description: zod.string(),
});

export const EditProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { isOpen, open, close } = useDisclosure();
  const updateProfileMutation = useUpdateProfile({
    config: {
      onSettled: close,
      onSuccess: () => {
        queryClient.invalidateQueries(['users', user?.screenName]);
      },
    },
  });

  return (
    <>
      <Button variant="outline" onClick={open}>
        Edit Profile
      </Button>
      <FormDialog
        isOpen={isOpen}
        close={close}
        title="Edit profile"
        action={
          <Button form="update-profile" type="submit" variant="secondary">
            Save
          </Button>
        }
        className="top-1/2 -translate-y-1/2 sm:h-[90vh] min-h-[400px]"
      >
        <div>
          <div className="h-[33vw] sm:h-[200px] border-white border-2 bg-slate-200"></div>
          <div className="-mt-[45px] ml-[15px]">
            <div className="w-[120px] h-[120px] rounded-full bg-slate-300 border-4 border-white"></div>
          </div>
          <Form<UpdateProfileDTO['data']>
            id="update-profile"
            onSubmit={async (values) => {
              await updateProfileMutation.mutateAsync({
                data: { ...values },
              });
            }}
            schema={schema}
            options={{
              mode: 'onChange',
              defaultValues: {
                name: user?.name,
                description: user?.description,
              },
            }}
            className="flex flex-col gap-3"
          >
            {({ register }) => (
              <div className="px-4 py-3 space-y-6">
                <InputField label="Name" registration={register('name')} />
                {/* TODO Input -> TextArea */}
                <InputField
                  label="description"
                  registration={register('description')}
                />
              </div>
            )}
          </Form>
        </div>
      </FormDialog>
    </>
  );
};
