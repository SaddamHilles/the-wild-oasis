import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import { QueryKeys } from '../../utils/types.t';

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting successfully edited');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.settings] });
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { updateSetting, isUpdating };
}

export default useUpdateSetting;
