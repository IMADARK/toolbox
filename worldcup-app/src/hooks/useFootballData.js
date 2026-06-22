import { useQuery } from '@tanstack/react-query';
import { footballApi } from '../api/footballApi';

export function useMatches() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: () => footballApi.getMatches(),
    refetchInterval: 30000,
    select: (data) => data.matches || [],
  });
}

export function useStandings() {
  return useQuery({
    queryKey: ['standings'],
    queryFn: () => footballApi.getStandings(),
    refetchInterval: 60000,
    select: (data) => data.standings || [],
  });
}
