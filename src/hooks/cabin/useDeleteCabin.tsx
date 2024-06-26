import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import { QueryKeys } from '../../utils/types.t';

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success('Cabin successfully deleted');
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.cabins],
      });
    },
    onError: er => toast.error(er.message),
  });

  return { deleteCabin, isDeleting };
}

export default useDeleteCabin;
