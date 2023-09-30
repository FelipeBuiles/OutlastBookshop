import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useUserId from "./useUserId";

export const fetchFavorites = async (id: string) => {
  if (process.env.NEXT_PUBLIC_FAVORITES_SERVICE_URL) {
    if (!id) {
      return [];
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FAVORITES_SERVICE_URL}/${id}`,
      );
      const favorites = await res.json();
      return favorites ?? [];
    }
  }
};

export const setFavorites = async (userId: string, books: number[]) => {
  if (process.env.NEXT_PUBLIC_FAVORITES_SERVICE_URL) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FAVORITES_SERVICE_URL}/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ books }),
      },
    );
    return res.json();
  }
};

export const useFavorites = () => {
  const { userId } = useUserId();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => fetchFavorites(userId),
    initialData: [],
  });
  const { mutate } = useMutation({
    mutationFn: (books: number[]) => setFavorites(userId, books),
    onMutate: async (books: number[]) => {
      await queryClient.cancelQueries(["favorites", userId]);
      const previousFavorites = queryClient.getQueryData(["favorites", userId]);
      queryClient.setQueryData(["favorites", userId], books);
      return { previousFavorites };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });

  const isFavorite = (id: number) => {
    return data?.includes(id);
  };

  const toggleFavorite = (id: number) => {
    if (isFavorite(id)) {
      mutate(data.filter((i: number) => i !== id));
    } else {
      mutate([...data, id]);
    }
  };

  return { isFavorite, toggleFavorite, favorites: data?.favorites ?? [] };
};
