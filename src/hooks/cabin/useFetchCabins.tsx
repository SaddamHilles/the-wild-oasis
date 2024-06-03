import { useQuery } from '@tanstack/react-query';
import { CabinType, Nullable } from '../../utils/types.t';
import { getCabins } from '../../services/apiCabins';

function useFetchCabins() {
  const {
    data: cabins,
    isPending,
    error,
  } = useQuery<Nullable<CabinType[]>>({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { cabins, isPending, error };
}

export default useFetchCabins;
