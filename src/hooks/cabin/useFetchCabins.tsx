import { useQuery } from '@tanstack/react-query';
import { CabinType, Nullable, QueryKeys } from '../../utils/types.t';
import { getCabins } from '../../services/apiCabins';

function useFetchCabins() {
  const {
    data: cabins,
    isPending,
    error,
  } = useQuery<Nullable<CabinType[]>>({
    queryKey: [QueryKeys.cabins],
    queryFn: getCabins,
  });

  return { cabins, isPending, error };
}

export default useFetchCabins;
