import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import { FileInput } from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FormCabin } from '../../utils/types.t';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

const cabinSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required Filed')
    .min(2, 'At least 2 letters')
    .max(50, 'at most 250 letters'),
  maxCapacity: yup.number().required('Max capacity is required Filed'),
  regularPrice: yup.number().required('Regular price is required Filed'),
  discount: yup.number().required('discount is required Filed'),
  description: yup
    .string()
    .required('Description is required Filed')
    .min(10)
    .max(250),
  image: yup.mixed().required('Cabin photo is required'),
});

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCabin>({
    resolver: yupResolver(cabinSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  function onSubmitHandler(data: FormCabin) {
    console.log(data.image[0].name);
    mutate({ ...data, image: data.image[0] });
  }
  return (
    <Form type='modal' onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRow label='Cabin name' error={errors.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name')}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label='Maximum capacity' error={errors.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity')}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label='Regular price' error={errors.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice')}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label='Discount' error={errors.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount')}
          disabled={isPending}
        />
      </FormRow>
      <FormRow
        label='Description for website'
        error={errors.description?.message}
      >
        <Textarea
          id='description'
          defaultValue=''
          {...register('description')}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label='Cabin photo' error={errors.image?.message + 'SDM'}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image')}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isPending ? 'Creating...' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
