import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";
import { UserAttr } from "@/interfaces/user.interface";
import { AxiosError } from "axios";

export const useGetProfile = ({ userId }: { userId: string }) => {
  const client = useClient();

  const {
    data: profileData,
    isLoading,
    isFetching,
    isError,
  } = useQuery<UserAttr, AxiosError>({
    queryKey: ["profile", userId],
    queryFn: async () =>
      client.get(`/profile/me/${userId}`).then((res) => res.data.data.user),
    enabled: !!userId, // ensures query only runs once when userId is available
    initialData: {} as UserAttr,
  });

  return { profileData, isLoading, isError, isFetching };
};
