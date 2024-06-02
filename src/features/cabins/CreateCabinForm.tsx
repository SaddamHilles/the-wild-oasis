import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import { FileInput } from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import type { CabinType, FormCabin } from '../../utils/types.t';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

// const cabinSchema = yup.object().shape({
//   name: yup
//     .string()
//     .required('Name is required Filed')
//     .min(2, 'At least 2 letters')
//     .max(50, 'at most 250 letters'),
//   maxCapacity: yup.number().required('Max capacity is required Filed'),
//   regularPrice: yup.number().required('Regular price is required Filed'),
//   discount: yup.number().required('discount is required Filed'),
//   description: yup
//     .string()
//     .required('Description is required Filed')
//     .min(10)
//     .max(250),
//   image: yup.mixed().required('Cabin photo is required'),
// });

interface Props {
  cabinToEdit: CabinType;
}

function CreateCabinForm({ cabinToEdit }: Props) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormCabin>({
    // resolver: yupResolver(cabinSchema),
    defaultValues: isEditSession ? editValues : {},
  });

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: FormCabin;
      id: number;
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  const isPending = isEditing || isCreating;

  function onSubmitHandler(data: FormCabin) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image: image });
  }
  return (
    <Form type='modal' onSubmit={handleSubmit(onSubmitHandler)}>
      <FormRow label='Cabin name' error={errors.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required',
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label='Maximum capacity' error={errors.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label='Regular price' error={errors.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label='Discount' error={errors.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value: number) =>
              value <= getValues().regularPrice ||
              'Discount should be less than reqular price',
          })}
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
          {...register('description', {
            required: 'This field is required',
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label='Cabin photo' error={errors.image?.message + ''}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
