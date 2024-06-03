import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';
import { Nullable, QueryKeys, SettingType } from '../../utils/types.t';

function useFetchSettings() {
  const {
    data: settings,
    isPending,
    error,
  } = useQuery<Nullable<SettingType>>({
    queryKey: [QueryKeys.settings],
    queryFn: getSettings,
  });
  return { settings, isPending, error };
}

export default useFetchSettings;
