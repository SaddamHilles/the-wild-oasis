import { FormCabin, QueryKeys } from '../../utils/types.t';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useUpdateCabin() {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: [QueryKeys.cabins] });
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}

export default useUpdateCabin;
